const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  //   _id: {
  //     type: Number,
  //     required: true,
  //   },
  title: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  thumbnailUrl: {
    type: String,

  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PUBLISH', 'DRAFT', 'INACTIVE'], // Adjust status values as needed
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  img:
  {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'users',
    required: true
  },
});

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;
