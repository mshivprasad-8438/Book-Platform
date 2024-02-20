const express = require('express');
const router = express.Router();
const User = require('../model/usersModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const fetchuser = require('../middleware/users');
// const authenticate=require('../middleware/users')
const bookModel = require('../model/itemsModel');
const mongoose = require('mongoose');


router.get("/userdetails", async (req,res,next)=>{
    await User.find().then((data)=>{
        // console.log(data);
        res.render("admin",{list:data})
      })
})


router.post("/deluser",async (req,res)=>{
    console.log("user is ",req.body._uid)
    idsToDelete=await User.find({_id:req.body._uid})
    const newArr = idsToDelete[0].posts.map((data)=>{
        return data.toString();
    })
    console.log(newArr);
    console.log(idsToDelete[0].posts[0].toString())
    
})
module.exports=router;