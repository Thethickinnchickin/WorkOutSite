const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});

module.exports = router;