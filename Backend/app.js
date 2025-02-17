require('dotenv').config();  // To load environment variables

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes'); // Import routes

const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/BookStore", 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error: Failed to connect MongoDB', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files

// Routes
app.use(bookRoutes);  // Use routes for books

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
