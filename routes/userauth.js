const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../model/usersModel');
const fetchuser = require('../middleware/users');
const upload = require('../middleware/storage_upload');
const { bookFind, homeBooks, removedBook } = require('../controllers/homeBooks');
const { signUp, logIn, logOut } = require('../controllers/userAuth');
const obj = { fName: "shiv", lName: "prasad" }


router.get("/", (req, res) => {
  res.render("display", { data: obj })
})

router.get("/home", homeBooks)

router.post('/home/removed',removedBook)

router.get("/home/find", (req, res) => {
  res.redirect('/userauth/home');
});

router.post("/home/find", bookFind);

router.post('/createuser', upload.single('image'), signUp);


router.post('/login', [
  body('infoType', 'Choose a valid information type').isIn(['email', 'phone']),
  body('email').if(body('infoType').equals('email')).notEmpty().isEmail(),
  body('phoneNumber').if(body('infoType').equals('phone')).notEmpty().isLength({ min: 10, max: 10 }),
  body('password', 'Enter a valid password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
], logIn);



router.get('/getuser',fetchuser,async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");

    console.log("getuser is called")
    if (!user) {
      res.json({ isAuthenticated: false });
      return res.json({ isAuthenticated: false, userdata: null });
    }
    console.log(user)
    return res.json({ isAuthenticated: true, userdata: user });
    // res.send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get('/logout', fetchuser, logOut);




// router.post("/update",async function(req,res){
//   const upres=await user.updateOne({_id:req.body.id},{$push:{posted:req.body.bid}})
// })


module.exports = router