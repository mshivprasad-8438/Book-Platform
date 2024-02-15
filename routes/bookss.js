var express = require('express');
var router = express.Router();
const User = require('../model/usersModel');
const bookModel = require('../model/itemsModel');
const multer = require('multer');
const uploadFileToS3=require('../controllers/uploads3')
const path=require('path');
const sendMail=require('../notifications/emails')
// const upload = multer();
var mailbody;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
 
const upload = multer({ storage: storage });

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get("/bookssdisplay",async(req,res,next)=>{
  await bookModel.find().then((data)=>{
    // console.log(data);
    res.render("index",{list:data})
  })
})

router.post("/delete",async function(req,res){
  console.log("delete is called",req.body);
  // let bowner=await User.find({ _id: req.body._bid },{owner:1});
  email=await User.find({ _id: req.body.owner_id },{email:1});
  book=await bookModel.findOne({_id:req.body._bid})
   const reply= await User.updateOne({_id:req.body.owner_id},{$pull:{posts:{$in:[req.body._bid]}}});  
   if(reply.modifiedCount==1){
    console.log("the post is also updated");
   }
  const result = await bookModel.deleteOne({ _id: req.body._bid });

  if (result.deletedCount == 1) {
      console.log('Document deleted successfully');
      // res.json({val:true});
      // var data=
      mailbody=`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
      <img src="${book.img}" alt="error"><br>
      <p>"${book.title}"</p><br>
      <p>Deletion successful</p>
      </body>
      </html>`;
      sendMail(email,mailbody,"Book deletion");
      return res.json({val:'Document deleted successfully'});
      // Handle the success case
  } else {
      console.log('Document not found or not deleted');
      mailbody="Book removal failed ";
      sendMail(email,mailbody,"Book deletion");
      return res.json({val:'Document not found or not deleted'});
      // Handle the case where the document was not found or not deleted
  } 
})

router.post("/addbook", upload.single('image'), async function (req, res) {
  const url = await uploadFileToS3(process.env.BUCKET_NAME, req.file);
  req.body.img = url;
delete req.body.image;
  const newdoc = new bookModel(req.body);
  
  // Handle image upload
  if (req.file) {
      newdoc.img.data = req.file.buffer;
      newdoc.img.contentType = req.file.mimetype;
  }

  try {
      const savedDoc = await newdoc.save();
      await User.updateOne({ _id: req.body.owner }, { $push: { posts: savedDoc._id } });
      email=await User.find({ _id: req.body.owner },{email:1});
      book=await bookModel.findOne({_id:savedDoc._id});
      mailbody=`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
      <img src="${book.img}" alt="error"><br>
      <p>"${book.title}"</p><br>
      <p>Posted successfully</p>
      </body>
      </html>`;
      sendMail(email,mailbody,"Uploading book");
      res.json({ val: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ val: false, error: "Internal Server Error" });
  }
});

// router.post("/addbook",async function(req,res){
//     const newdoc=new bookModel(req.body);
//     console.log(req.body)

//     try {
//       const savedDoc = await newdoc.save();
//       await User.updateOne({ _id: req.body.owner }, { $push: { posts: savedDoc._id } });

//       res.json({ val: true });
//   } catch (error) {
//       console.error(error);
//       // res.status(500).json({ val: false, error: "Internal Server Error" });
//   }


//   // try{
//   //   await newdoc.save().then((data)=>{
//   //     const upres=User.updateOne({_id:req.body.owner},{$push:{posts:data._id}});
//   //     res.json({val:true});
//   //   })
//   // }
//   // catch(err){
//   //     console.error(err)
//   // }
// })

module.exports=router