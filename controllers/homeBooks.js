const bookModel = require('../model/itemsModel')
const jwt = require('jsonwebtoken');
const mongoose = require('mongodb');



const homeBooks = async (req, res, next) => {
  var data, data2;
  const token = req.cookies['authtoken'];

  if (!token) {
    [data, data2] = await Promise.all([await bookModel.find(), await bookModel.find({ availability: false })]);
    // return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  else {
    try {
      const dt = jwt.verify(token, process.env.JWT_PRIVATEKEY);
      const obId = new mongoose.ObjectId(dt.user.id);
      [data, data2] = await Promise.all([await bookModel.find(), await bookModel.find({ owner: obId, availability: false })]);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token.' });
    }
  }

  res.render("home", { list: data, bks: data2 })
}


const bookFind = async (req, res) => {
  try {
    const searchTerm = req.body.search;
    // const regexPattern = new RegExp(`.*${searchTerm}.*`, 'i');
    
    const searchQuery = {

      index: "searchingIndex",
      text: {
        query: searchTerm,
        path: {
          wildcard: "*"
        }
      }

    }
    if(searchTerm==""){
      var data={}
    }
    // Perform the search using your searchQuery
    else{
        var data = await bookModel.aggregate([
        { $search: searchQuery }]);
    }
    // res.render("home", { list: data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  var data2;
  const token = req.cookies['authtoken'];

  if (!token) {
    [data2] = await Promise.all([await bookModel.find({ availability: false })]);
    // return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  else {
    try {
      const dt = jwt.verify(token, process.env.JWT_PRIVATEKEY);
      const obId = new mongoose.ObjectId(dt.user.id);
      [data2] = await Promise.all([await bookModel.find({ availability: false, owner: obId })]);

    } catch (error) {
      
        return res.status(401).json({ error: 'Invalid token.' });
      
    }
  }


  res.render("home", { list: data, bks: data2 })
}

const removedBook = async (req, res, next) => {
  
  try {
    const [data, data2] = await Promise.all([await bookModel.find()], [await bookModel.find({ availability: false, owner: req.body._uid })]);
    res.render("home", { list: data, bks: data2 })
    }
  catch(err) {
    res.send("Internal Server Error")
  }
}
module.exports = { bookFind, homeBooks, removedBook }