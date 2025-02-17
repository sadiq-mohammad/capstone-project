const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true }
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('Books', bookSchema);
