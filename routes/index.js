const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/userauth/home')
})

module.exports = router