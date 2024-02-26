var User = require("../model/usersModel")
const bookModel = require('../model/itemsModel');
const mongoose = require('mongoose');

exports.postBook=async (req, res) => {
    try {
      const userIDn = req.user.id;
    const usern = await User.findById(userIDn).select("-password");
    console.log(usern)
    if (!usern) {
      res.redirect('/userauth/home');
      }
        const user = await User.findById(req.query.userId);
        if (!user) {
            throw new Error('User not found');
        }

        let postl = user.posts;
        const processedData = [];
        // Asynchronously process each request in the array
        for (const request of postl) {
        const book = await bookModel.findOne({_id:request},{title:1});
          if (book) {
            processedData.push({
              title:book.title
            });
          }
        }
        res.render("myadds", { post: processedData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

exports.requestsBooks=async (req,res)=>{
    try {
      const userIDn = req.user.id;
    const usern = await User.findById(userIDn).select("-password");

    console.log(usern)
    if (!usern) {
      res.redirect('/userauth/home');
      }
        const user = await User.findById(req.query.userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Retrieve the requests array from the request body
        const requests = user.requests;
    
        // Create an empty array to store the processed data
        const processedData = [];
    
        // Asynchronously process each request in the array
        for (const request of requests) {
          // Use await or Promise.all to ensure data is fetched before proceeding
          const [user, book] = await Promise.all([
            User.findOne({_id:request.user}),
            bookModel.findOne({_id:request.book}),
          ]);
    
          // Handle cases where user or book is not found
          if (!user || !book) {
            // processedData.push({ error: 'User or book not found' });
            continue;
          }
    
          // Add processed data to the array
          processedData.push({
            user: user, // Assuming `name` is the desired field
            book: book.title, // Assuming `title` is the desired field
          });
        }
        res.render("requests", { data: processedData });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}


exports.myOrders=async (req, res) => {
    try {
      const userIDn = req.user.id;
    const usern = await User.findById(userIDn).select("-password");

    console.log(usern)
    if (!usern) {
      res.redirect('/userauth/home');
      }
        const user = await User.findById(req.query.userId);
        if (!user) {
            throw new Error('User not found');
        }

        let orderl = user.orders;
        const processedData = [];
    
        for (const request of orderl) {
        const book = await bookModel.findOne({_id:request},{title:1});
          if (book) {
            processedData.push({
              title:book.title,
              bid:book._id
            });
          }
        }
        res.render("orders", { order: processedData });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

// module.exports={myOrders,postBook,requestsBooks}