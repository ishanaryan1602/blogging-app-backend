const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
    res.send('hello this is from the test route')
});

module.exports = router;