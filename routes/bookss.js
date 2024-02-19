var express = require('express');
var router = express.Router();
const bookModel = require('../model/itemsModel');
const cont = require('../controllers/bookss');
var upload=require('../middleware/storage_upload');


router.get("/bookssdisplay",async(req,res,next)=>{
  await bookModel.find().then((data)=>{
    // console.log(data);
    res.render("index",{list:data})
  })
})

router.post('/revoke',cont.revBook)

router.post("/delete",cont.delBook)

router.post("/addbook",  upload.single('image'),cont.adBook);

router.post("/request",cont.reqBook);

module.exports=router