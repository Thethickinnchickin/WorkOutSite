const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const react = require('./routes/react');
const userRoutes = require('./routes/user');

const dbUrl = "mongodb+srv://workout-user:OaklandA's54@cluster0.vnc1b.mongodb.net/?retryWrites=true&w=majority";

//Creating mongo store with session
const store = new MongoStore ({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'super super secret'
    }
})

app.use(session({
    store,
    secret: 'super super secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
app.use(mongoSanitize({
    replaceWith: '_'
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"public")));

//Adding passport to express and authenticating user
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/express_backend', react);
app.use('/user', userRoutes);

//starting up app
const port = 4000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})