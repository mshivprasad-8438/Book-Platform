var express = require('express');
var router = express.Router();
const cont=require('../controllers/users')

router.get("/loginpage", (req, res) => {
    res.render("login");
})

router.get("/signuppage", (req, res) => {
    res.render("signup");
})

router.get("/orders", cont.myOrders);

router.get("/myadds", cont.postBook);

router.get("/requests", cont.requestsBooks);

module.exports = router;


