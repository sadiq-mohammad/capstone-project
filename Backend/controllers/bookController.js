const Store = require('../models/book');

exports.getAllBooks = async (req, res) => {
  try {
    const allBooks = await Store.find({});
    res.json(allBooks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const reqBook = await Store.findById(req.params.id);
    if (!reqBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(reqBook);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

exports.createBook = async (req, res) => {
  const { title, author, price } = req.body;
  try {
    const book = new Store({ title, author, price });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: "Failed to create book" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    await Store.findByIdAndUpdate(req.params.id, { ...req.body });
    res.json({ msg: "Successfully book updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.json({ msg: "Successfully book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};

