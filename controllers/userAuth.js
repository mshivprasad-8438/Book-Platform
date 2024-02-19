const sendMail = require('../notifications/emails');
const { body, validationResult } = require('express-validator');
const uploadFileToS3 = require('../middleware/uploads3')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const JWT_PRIVATEKEY = "Nani@shiv0101";
const User=require('../model/usersModel')

var currentdate = new Date();
var datetime = "Last login: " + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();


const logOut = async (req, res) => {
    try {
        // Clear the authtoken cookie
        const userID = req.user.id;
        const user=await User.findOne({_id:userID});// const user = await User.findById(userID).select("-password");
        email = user.email;
        res.clearCookie('authtoken', { httpOnly: true, secure: true }); // Ensure same flags as when set
        sendMail(email, "Logout success", "Logout");
        res.redirect('/userauth/home'); // Redirect to the home page or wherever you want after logout
        
    } catch (error) {
        sendMail(email, "Logout failed", "Logout");
        res.status(500).json({ message: 'An error occurred while logging out' });
    }
}

const signUp = async (req, res) => {
    [
        body('name', 'name must contain atleast 3 characters').isLength({ min: 3 }),
        body('phoneno', 'Enter a valid phoneNumber').isLength({ min: 10, max: 10 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
    ]
    var pic =
        "https://user--profile.s3.ap-south-1.amazonaws.com/download.jpeg";
    if (req.file) {
        pic = await uploadFileToS3(process.env.profile_BUCKET_NAME, req.file);
        }
    // req.body.images=pic;
    delete req.body.image;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        //encrypting the password using salt and generating the hash of given password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //creating a data <type-object> for sending it user's id to JWT--jsonWebToken for generating a token used for validation i.e. secure communication b/w client and server
        //here we are using id because user_id retrieve's the data in a much quicker way compared to other values
        const { email, phoneno } = req.body;
        let user1 = await User.findOne({ $or: [{ phoneno }, { email }] });
        if (user1) {
            sendMail(email, "Sorry a user with this phone/ email already exists", "Signin failed");
            return res.status(400).send({ success, error: "Sorry a user with this phone/ email already exists" })
        }
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phoneno: req.body.phoneno,
            images: pic,
            password: secPass,
            tag: "user"
        })
        sendMail(email, "Signin Successful ", "Signin");
        // Creating a data object for sending the user's id to JWT
        const data = {
            user: {
                id: user.id,
            }
        };

        const authtoken = jwt.sign(data, process.env.JWT_PRIVATEKEY);

        // Set a cookie with the JWT token
        res.cookie('authtoken', authtoken, { httpOnly: true, maxAge: 3600000 }); // Set expiration time as needed

        success = true;
        res.redirect("/userauth/home")
        // return res.send({ success, authtoken });
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error code
            return res.status(400).json({ success, error: "User with this email or phone number already exists." });
        }
        return res.status(400).send({ success, error: err });
    }
}

const logIn = async (req, res) => {
    let success = false;
    // checking for errors in body params, if any errors, then send a response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // using destructuring concept to easily post/fetch the data
    const { infoType, selecedInfoType,email, phoneno, password } = req.body;
    try {
        let user;

        if (infoType === 'email') {
            user = await User.findOne({ email });
        } else if (infoType === 'phone') {
            user = await User.findOne({ phoneno });
        }

        if (!user) {
            sendMail(email, "Tried to login but wrong credetials", "Login failed");
            return res.status(400).json({ success, error: "Please Enter Correct Credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            sendMail(email, "Tried to login but wrong credetials", "Login failed");
            return res.status(400).json({ success, error: "Please Enter Correct Credentials" });
        }

        const payload = {
            user: {
                id: user.id,
            }
        };

        const authtoken = jwt.sign(payload, process.env.JWT_PRIVATEKEY, { expiresIn: '24hrs' });

        res.cookie('authtoken', authtoken, { httpOnly: true, maxAge: 3600000 * 24 }); // Set expiration time as needed

        success = true;
        sendMail(email, `Successfully loggedin at ${datetime}`, "Login");
        res.redirect("/userauth/home");
    } catch (err) {
        return res.status(500).send({ success, error: err.message });
    }
}

module.exports = { signUp, logIn, logOut }