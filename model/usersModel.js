const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type : String,
        required : true,
    },
    phoneno:{
        type : Number,
        required : true,
        // unique : true,
    },
    email:{ 
        type : String,
        required : true,
        // unique : true,
    },
    password:{
        type : String,
        required : true,
    },
    timestamp:{
        type : Date,
        default : Date.now 
    },
    images:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"admin"
    }
  });

module.exports = mongoose.model('user', userSchema)