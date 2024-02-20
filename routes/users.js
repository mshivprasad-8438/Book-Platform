var express = require('express');
var router = express.Router();
const cont=require('../controllers/users')
const fetchuser = require('../middleware/users');

router.get("/loginpage", (req, res) => {
    res.render("login");
})

router.get("/signuppage", (req, res) => {
    res.render("signup");
})

router.get("/orders",fetchuser, cont.myOrders);

router.get("/myadds",fetchuser, cont.postBook);

router.get("/requests",fetchuser, cont.requestsBooks);

module.exports = router;


