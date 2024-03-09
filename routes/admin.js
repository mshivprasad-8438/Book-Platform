const express = require('express');
const router = express.Router();
const User = require('../model/usersModel');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/users');
const bookModel = require('../model/itemsModel');
const orderModel=require('../model/orderModel')

function formatDate(dateString) {
    if(!dateString){
        return "10:52:56 on 23/02/24";
    }
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear().toString().substring(2); // Extract last two digits of year
  
    return `${hours}:${minutes}:${seconds} on ${day}/${month}/${year}`;
  }

router.get("/userdetails", fetchuser, async (req, res) => {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    if (user.tag == "admin") {
        const usersList=await User.find({ tag: 'user' }).then(async (data) => {

            // Create an empty array to store the processed data
            const processedData = [];

            // Asynchronously process each request in the array
            for (const request of data) {
                // Use await or Promise.all to ensure data is fetched before proceeding
                const formattedDate = formatDate(request.timestamp);
                const [posts,orders,requests] = await Promise.all([
                    bookModel.find({owner:request._id}),
                    orderModel.find({customer:request._id}),
                    orderModel.find({owner:request._id})
                ]);
                // Add processed data to the array
                processedData.push({
                    posts:posts,
                    orders:orders,
                    requests:requests,
                    time: formattedDate,
                    user: request, // Assuming `name` is the desired field
                    // book: book, // Assuming `title` is the desired field
                });
            }


            res.render("admin", { list: processedData })
        })
    }
    else {
        res.redirect('/userauth/home');
    }

})


router.post("/deluser", async (req, res) => {
    console.log("user is ", req.body._uid)
    idsToDelete = await User.find({ _id: req.body._uid })
    const newArr = idsToDelete[0].posts.map((data) => {
        return data.toString();
    })
    console.log(newArr);
    console.log(idsToDelete[0].posts[0].toString())

})
module.exports = router;