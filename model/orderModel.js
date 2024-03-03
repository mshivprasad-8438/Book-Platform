const mongoose = require('mongoose')
const { Schema } = mongoose;

const orderSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required: true
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required: true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,ref:'books',
        required:true
    },
    timestamp:{
        type : Date,
        default : Date.now 
    },
    status: {
      type: String,
      enum: ['Order processing', 'Delivered','Cancelled','Shipped'], // Adjust status values as needed
      required: true,
    },
  });

module.exports = mongoose.model('order', orderSchema)