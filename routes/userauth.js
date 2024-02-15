const express = require('express');
const sendMail=require('../notifications/emails');
const path=require('path');
const router = express.Router();
const User = require('../model/usersModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const multer = require('multer');
const uploadFileToS3=require('../controllers/uploads3')
const fetchuser = require('../middleware/users');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const bookModel = require('../model/itemsModel');
const upload = multer({ storage: storage });
const JWT_PRIVATEKEY = "Nani@shiv0101";
const obj={fName:"shiv",lName:"prasad"}

var currentdate = new Date(); 
var datetime = "Last login: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

router.get("/",(req,res)=>{
    res.render("display",{data:obj})
})

router.get("/home",async(req,res,next)=>{
  // console.log(jwt.verify(req.cookie.token))
  await bookModel.find().then((data)=>{
    // console.log(data);
    res.render("home",{list:data})
  })
})

router.post("/home/find",async(req,res)=>{
  try {
    console.log(req.body);
    const searchTerm = req.body.search;

    const searchQuery ={
        
          index: "searchingIndex",
          text: {
            query: searchTerm,
            path: {
              wildcard: "*"
            }
          }
        
      }
    // Perform the search using your searchQuery
    const data = await bookModel.aggregate([
      { $search: searchQuery }]);
    console.log("Search Query:", searchQuery);
    console.log("Search Result:", data);

    res.render("home", { list: data });
  }catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/createuser', upload.single('image'), async (req, res) => {
  [
    body('name', 'name must contain atleast 3 characters').isLength({ min: 3 }),
      body('phoneno', 'Enter a valid phoneNumber').isLength({ min: 10, max: 10 }),
      body('email', 'Enter a valid email').isEmail(),
      body('password', 'Enter a valid password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
    ]
    var pic =
      "https://user--profile.s3.ap-south-1.amazonaws.com/download.jpeg";
    if (req.file) {
      const bucketName = "user--profile";
      console.log("entered for aws");
      pic = await uploadFileToS3(bucketName, req.file);
      console.log("the url you got is ",pic);
    }
    // req.body.images=pic;
    delete req.body.image;
    let  success = false;
      console.log("hello create details are submitted")
      //checking for errors in body params if any sends response
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("77")
        return res.status(400).json({ success, errors: errors.array() });
      }
  try {
    //encrypting the password using salt and generating the hash of given password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //creating a data <type-object> for sending it user's id to JWT--jsonWebToken for generating a token used for validation i.e. secure communication b/w client and server
    //here we are using id because user_id retrieve's the data in a much quicker way compared to other values
    const { email, phoneno } = req.body;
    console.log(96);
    let user1 = await User.findOne({ $or: [{ phoneno }, { email }] });
    console.log(user1)
    if (user1) {
      console.log(100);
      // return res.json({ success, error: "Sorry a user with this phone/ email already exists" })
      sendMail(email,"Sorry a user with this phone/ email already exists","Signin failed");
      return res.status(400).send({ success, error: "Sorry a user with this phone/ email already exists" })
    }
console.log(84);
    //creating a user of unique id for phoneno,email
    console.log("befor creation",pic);
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      images:pic,
      password: secPass,
      tag:"user"
    })
    console.log("doc is created")
    sendMail(email,"Signin Successful ","Signin");
    // Creating a data object for sending the user's id to JWT
    const data = {
      user: {
        id: user.id,
      }
    };

    // Sign is used to generate an e-signature for JWT, which is required for validation
    const authtoken = jwt.sign(data, JWT_PRIVATEKEY);

    // Set a cookie with the JWT token
    res.cookie('authtoken', authtoken, { httpOnly: true, maxAge: 3600000 }); // Set expiration time as needed

    success = true;
    res.redirect("/userauth/home")
    // return res.send({ success, authtoken });
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error code
      return res.status(400).json({ success, error: "User with this email or phone number already exists." });
    }
    console.log("122");
    return res.status(400).send({ success, error: err });
  }
});

  
  router.post('/login', [
    body('infoType', 'Choose a valid information type').isIn(['email', 'phone']),
    body('email').if(body('infoType').equals('email')).notEmpty().isEmail(),
    body('phoneNumber').if(body('infoType').equals('phone')).notEmpty().isLength({ min: 10, max: 10 }),
    body('password', 'Enter a valid password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
  ], async (req, res) => {
    console.log("in router");
    let success = false;
    // checking for errors in body params, if any errors, then send a response
    const errors = validationResult(req);
    console.log("in router2");
    if (!errors.isEmpty()) {
      console.log("in router33");
      return res.status(400).json({ success, errors: errors.array() });
    }
    // using destructuring concept to easily post/fetch the data
    const { infoType, email, phoneno, password } = req.body;
  console.log(email,phoneno,infoType,password);
    try {
      let user;
    
        if (infoType === 'email') {
            user = await User.findOne({ email });
        } else if (infoType === 'phone') {
            user = await User.findOne({ phoneno });
        }
    
        if (!user) {
          sendMail(email,"Tried to login but wrong credetials","Login failed");
            return res.status(400).json({ success, error: "Please Enter Correct Credentials" });
        }
    
        const passwordCompare = await bcrypt.compare(password, user.password);
    
        if (!passwordCompare) {
          sendMail(email,"Tried to login but wrong credetials","Login failed");
            return res.status(400).json({ success, error: "Please Enter Correct Credentials" });
        }
  
      // Rest of your authentication logic...
  
      const payload = {
        user: {
          id: user.id,
        }
      };
  
      // Sign is used to generate an e-signature for JWT
      const authtoken = jwt.sign(payload, JWT_PRIVATEKEY, { expiresIn: '24hrs' });
  
      // Set a cookie with the JWT token
      res.cookie('authtoken', authtoken, { httpOnly: true, maxAge: 3600000 * 24 }); // Set expiration time as needed
      
      console.log(authtoken);
      success = true;
      // res.send({ success, authtoken });
      // Redirect to bookssdisplay with user ID in the URL
      // res.redirect(`/bookssdisplay?userId=${user.id}`);
      sendMail(email,`Successfully loggedin at ${datetime}`,"Login");
      res.redirect("/userauth/home");
    } catch (err) {
      return res.status(500).send({ success, error: err.message });
    }
  });
  
  

router.get('/getuser', fetchuser, async (req, res) => {
  try {
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password");

      console.log("getuser is called")
      if (!user) {
        res.json({ isAuthenticated: false });
          return res.json({ isAuthenticated: false ,userdata:null});
      }
      console.log(user)
      return res.json({ isAuthenticated: true ,userdata:user});
      // res.send(user);
  } catch (error) {
      return res.status(500).send({ error: error.message });
  }
});

router.get('/logout', fetchuser,async (req, res) => {

  try {
    // Clear the authtoken cookie
    const userID = req.user.id;
      const user = await User.findById(userID).select("-password");
    email=user.email;
    res.clearCookie('authtoken', { httpOnly: true, secure: true }); // Ensure same flags as when set
    // const token = req.cookies.authtoken;
    // if (token) {
    //   jwt.blacklist(token); // Or similar revocation mechanism
    // }
    sendMail(email,"Logout success","Logout");
    res.redirect('/userauth/home'); // Redirect to the home page or wherever you want after logout
    // res.send("logged out successfully ")
  } catch (error) {
    sendMail(email,"Logout failed","Logout");
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'An error occurred while logging out' });
  }
});

router.post("/request",async function(req,res){
  console.log("request is called ",req.body);
  const ordres=await User.updateOne({_id:req.body._uid},{$push:{orders:req.body._bid}});
  const reqres=await User.updateOne({_id:req.body._oid},{$push:{requests:{$each: [{ book: req.body._bid, user: req.body._uid }]},$position: 0}});
  if((ordres.modifiedCount==1) && (reqres.modifiedCount==1)){
    btitle=await bookModel.find({ _id: req.body._bid },{title:1});
    console.log(btitle,"this is title")
    cust=await User.find({ _id: req.body._uid },{email:1,name:1});
    console.log("customer details are ",cust)
    sendMail(cust[0].email,`Order for book ${btitle[0].title} is success`,"Order");
    email=await User.find({ _id: req.body._oid },{email:1});
    sendMail(email[0].email,`${btitle[0].title} book is ordered by ${cust[0].name} is id is ${req.body._uid}`,"Book deletion");
      res.json({val:"Book is requested"})
  }
});


// router.post("/update",async function(req,res){
//   const upres=await user.updateOne({_id:req.body.id},{$push:{posted:req.body.bid}})
// })


module.exports=router