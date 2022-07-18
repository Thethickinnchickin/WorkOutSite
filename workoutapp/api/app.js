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
const cors = require('cors')
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
const exerciseRoutes = require('./routes/exercise');
const setRoutes = require('./routes/set');
if(process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();        
}





const dbUrl = process.env.DB_URL 

//Creating mongo store with session
const store = new MongoStore ({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SECRET 
    }
})

//adding cors for the nuxtjs aplication
app.use(cors());

//Using session and mongodb to store session data
app.use(session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

//Connecting to mongoose database
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

//Using body parser to send json data to and from server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Location of static folder
app.use(express.static(path.join(__dirname,"public")));

//Adding passport to express and authenticating user
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Adding routes to express
app.use('/api/workout', workoutRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/set', setRoutes);

//starting up app
const port = process.env.API_PORT || 7000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

module.exports = app;