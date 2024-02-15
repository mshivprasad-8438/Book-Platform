var express = require('express');
var router = express.Router();
var User = require("../model/usersModel")
const bookModel = require('../model/itemsModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

router.get("/loginpage",(req,res)=>{
    res.render("login");
})

router.get("/signuppage",(req,res)=>{
    res.render("signup");
})

router.get("/orders", async (req, res) => {
    try {
        console.log(req.query)
        const user = await User.findById(req.query.userId);
        if (!user) {
            throw new Error('User not found');
        }

        let orderl = user.orders;
        console.log("orderl is, ", orderl)
        console.log("order list" ,orderl)
        const books = await bookModel.find({ _id: { $in: orderl } });
        console.log(books)
        res.render("orders", { order: books });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/myadds", async (req, res) => {
    try {
        console.log(req.query)
        const user = await User.findById(req.query.userId);
        if (!user) {
            throw new Error('User not found');
        }

        let postl = user.posts;
        console.log("orderl is, ", postl)
        const books = await bookModel.find({ _id: { $in: postl } });
        console.log(books)
        res.render("myadds", { post: books });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.get("/requests", async (req, res) => {
    try {
        console.log(req.query)
        const user = await User.findById(req.query.userId);
        if (!user) {
            throw new Error('User not found');
        }
console.log(user)
console.log(user.requests)
        // let rbl = user.requests.book;
        // let rul = user.requests.user;
        
        const rbl = await user.requests.map(req => req.book);
        const rul = await user.requests.map(req => req.user);
        // console.log("orderl is, ", orderl)
        console.log("books ids are for requsted",rbl)
        // console.log("order list" ,orderl)
        const books = await bookModel.find({ _id: { $in: rbl } });
        const users = await User.find({ _id: { $in: rul } });
        
        console.log(books)
        res.render("requests", { bks: books,urs:users });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;


