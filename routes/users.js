var express = require('express');
var router = express.Router();
const orderModel=require('../model/orderModel')
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
router.post('/update',async function(req,res){
    console.log(req.body,req.query)
    console.log(req.body._id,req.body.status)
    await orderModel.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { status:req.body.status } },
        { new: true }
      ); 
})

router.post('/cancel',async function(req,res){
    console.log(req.body)
    await orderModel.findOneAndUpdate(
        { _id: req.body._id },
        { $set: { status:"Cancelled" } },
        { new: true }
      );
})
module.exports = router;


