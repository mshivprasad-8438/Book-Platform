var User = require("../model/usersModel")
const orderModel = require('../model/orderModel')
const bookModel = require('../model/itemsModel');
const mongoose = require('mongoose');


function formatDate(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear().toString().substring(2); // Extract last two digits of year

  return `${hours}:${minutes}:${seconds} on ${day}/${month}/${year}`;
}



exports.postBook = async (req, res) => {
  try {
    const userIDn = req.user.id;
    const usern = await User.findById(userIDn).select("-password");
    console.log(usern)
    if (!usern) {
      res.redirect('/userauth/home');
    }
    let postl = await bookModel.find({ owner: req.query.userId })
    // let postl = user.posts;
    const processedData = [];
    // Asynchronously process each request in the array
    for (const request of postl) {
      processedData.push({
        title: request.title
      });
    }
    res.render("myadds", { post: processedData });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

exports.requestsBooks = async (req, res) => {
  try {
    const userIDn = req.user.id;
    const usern = await User.findById(userIDn).select("-password");

    console.log(usern)
    if (!usern) {
      res.redirect('/userauth/home');
    }
    const ordersForUser = await orderModel.find({ owner: req.query.userId });

    // Create an empty array to store the processed data
    const processedData = [];

    // Asynchronously process each request in the array
    for (const request of ordersForUser) {
      // Use await or Promise.all to ensure data is fetched before proceeding
      const [user, book] = await Promise.all([
        User.findOne({ _id: request.customer }),
        bookModel.findOne({ _id: request.book }),
      ]);

      // Handle cases where user or book is not found
      if (!user || !book) {
        // processedData.push({ error: 'User or book not found' });
        continue;
      }
      const formattedDate = formatDate(request.timestamp);
      // Add processed data to the array
      processedData.push({
        orderId: request._id,
        time: formattedDate,
        status: request.status,
        user: user, // Assuming `name` is the desired field
        book: book, // Assuming `title` is the desired field
      });
    }
    res.render("requests", { data: processedData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


exports.myOrders = async (req, res) => {
  try {
    const userIDn = req.user.id;
    const usern = await User.findById(userIDn).select("-password");

    console.log(usern)
    if (!usern) {
      res.redirect('/userauth/home');
    }

    const ordersOfUser = await orderModel.find({ customer: req.query.userId });
    // const user = await User.findById(req.query.userId);
    // if (!user) {
    //   throw new Error('User not found');
    // }

    // let orderl = user.orders;
    const processedData = [];

    for (const odr of ordersOfUser) {
      const book = await bookModel.findOne({ _id: odr.book });

      if (book) {
        const formattedDate = formatDate(odr.timestamp);
        // console.log(formattedDate);

        processedData.push({
          orderId: odr._id,
          title: book.title,
          bid: book._id,
          time: formattedDate,
          status: odr.status,
          img: book.img,
          authors: book.authors
        });
      }
    }
    res.render("orders", { order: processedData });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

// module.exports={myOrders,postBook,requestsBooks}