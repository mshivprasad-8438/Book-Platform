// var nodemailer = require('nodemailer');
// require("dotenv").config();

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.Email,
//     pass: process.env.Password,
//   }
// });

// function isValidEmail(email) {
//   // Regular expression for a simple email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }


// function sendMail(email,text,sub){
//   if (!isValidEmail(email)) {
//     throw new Error('Invalid email format');
//   }
//   return new Promise((resolve, reject) => {
//     var mailOptions = {
//         from: process.env.Email,
//         to: email,
//         subject:sub,
//         html: text,
//       };
//       console.log(mailOptions);
//       transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//           console.log(error);
//           reject(error)
//         } else {
//           console.log('Email sent: ' + info.response);
//           resolve("sent")
//         }
//       });
//   })
// }

// module.exports=sendMail;

const nodemailer = require('nodemailer');
require('dotenv').config();
 
function sendMail(email, text,sub) {
 
  const mailOptions = {
    from: process.env.Email,
    to: email,
    subject: sub,
    html: text,
  };
  console.log(mailOptions);
  // Create a nodemailer transporter
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.Password,
    },
  });
 
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
  });
  
}
 
module.exports = sendMail;