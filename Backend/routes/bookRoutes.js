const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Routes related to books
router.get('/api/books', bookController.getAllBooks);
router.get('/api/books/:id', bookController.getBookById);
router.post('/api/books', bookController.createBook);
router.patch('/api/books/:id', bookController.updateBook);
router.delete('/api/books/:id', bookController.deleteBook);

module.exports = router;
