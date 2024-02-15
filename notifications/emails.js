var nodemailer = require('nodemailer');
require("dotenv").config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  }
});

function sendMail(email,text,sub){
    var mailOptions = {
        from: process.env.Email,
        to: email,
        subject:sub,
        html: text,
      };
      console.log(mailOptions);
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports=sendMail;