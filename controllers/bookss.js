const User = require('../model/usersModel');
const orderModel=require('../model/orderModel');
const bookModel = require('../model/itemsModel');
const sendMail = require('../notifications/emails');
const s3functions = require('../middleware/uploads3')
var mailbody;


exports.delBook = async function (req, res) {
  try {
    const bookId = req.body._bid;
    const newAvailability = false;

    email = await User.find({ _id: req.body.owner_id }, { email: 1 });
    book = await bookModel.findOne({ _id: req.body._bid })
    const reply = await User.updateOne({ _id: req.body.owner_id }, { $pull: { posts: { $in: [req.body._bid] } } });
    //  const result = await booksModel.findByIdAndUpdate(bookId, { availability: newAvailability }, { new: true });

    var result = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: { availability: newAvailability } },
      { new: true }
    );

    if (result) {
      mailbody = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
        <img src="${book.img}" alt="error" style="width:250px;height: 300px;"><br>
        <h5>"${book.title}"</h5><br>
        <h5>Deletion successful</h5>
        </body>
        </html>`;
      sendMail(email, mailbody, "Book deletion");
      return res.json({ val: 'Document deleted successfully' });
      // Handle the success case
    } else {
      mailbody = "Book removal failed ";
      sendMail(email, mailbody, "Book deletion");
      return res.json({ val: 'Document not found or not deleted' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}



exports.adBook = async function (req, res) {
  try {
    const url = await s3functions.uploadFileToS3(process.env.book_BUCKET_NAME, req.file);
    req.body.img = url;
    req.body.availability = true;
    delete req.body.image;
    const newdoc = new bookModel(req.body);
    const savedDoc = await newdoc.save();
    await User.updateOne({ _id: req.body.owner }, { $push: { posts: savedDoc._id } });
    email = await User.find({ _id: req.body.owner }, { email: 1 });
    book = await bookModel.findOne({ _id: savedDoc._id });
    mailbody = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
        <img src="${book.img}" alt="error" style="width:250px;height: 300px;"><br>
        <h5 font-size: 20px>"${book.title}"</h5><br>
        <p style="font-size: 20px">Posted successfully</p>
        </body>
        </html>`;
    sendMail(email, mailbody, "Uploading book");
    res.json({ val: true });
  } catch (error) {
    console.error(error);
    // Handle Mongoose validation errors

    res.status(500).json({ val: false, error: "Internal Server Error" });
  }
}

exports.revBook = async function (req, res) {
  try {
    const bookId = req.body._bid;
    const newAvailability = true;
    book = await bookModel.findOne({ _id: req.body._bid })
    email = await User.find({ _id: book.owner }, { email: 1 });
    const reply = await User.updateOne({ _id: book.owner }, { $push: { posts: req.body._bid } });
    if (reply.modifiedCount == 1) {

    }
    //  const result = await booksModel.findByIdAndUpdate(bookId, { availability: newAvailability }, { new: true });
    var result = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $set: { availability: newAvailability } },
      { new: true }
    );


    if (result) {
      mailbody = `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
          <img src="${book.img}" alt="error" style="width:250px;height: 300px;"><br>
          <h5>"${book.title}"</h5><br>
          <h5>Revert successful</h5>
          </body>
          </html>`;
      sendMail(email, mailbody, "Book Revertion");
      return res.json({ val: 'Document reverted successfully' });
    } else {
      mailbody = "Book Revertion failed ";
      sendMail(email, mailbody, "Book revokation");
      return res.json({ val: 'Document not found or not revoked' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.reqBook = async function (req, res) {
  const data = {
    owner: req.body._oid,
    customer: req.body._uid,
    book: req.body._bid,
    status: 'Order processing'
  }

  async function success() {
    try {
      btitle = await bookModel.find({ _id: req.body._bid }, { title: 1 });
      cust = await User.find({ _id: req.body._uid }, { email: 1, name: 1 });
      sendMail(cust[0].email, `Order for book ${btitle[0].title} is success`, "Order");
      email = await User.find({ _id: req.body._oid }, { email: 1 });
      sendMail(email[0].email, `${btitle[0].title} book is ordered by ${cust[0].name} is id is ${req.body._uid}`, "Book deletion");
      res.json({ val: "Book is requested" });
    } catch (error) {
      console.error('Error:', error);
      res.json({ val: "Requesting book is failed" });
    }
  }

  try {
    const createdDocument = await orderModel.create(data);
    success();
    console.log('Document inserted successfully:', createdDocument);
  } catch (err) {
    console.error('Error creating document:', err);
    res.json({ val: "Requesting book is failed" });
  }
}


// module.exports={delBook,adBook,reqBook}