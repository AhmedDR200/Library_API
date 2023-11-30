const express = require('express');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const authPath = require('./routes/auth');
const usersRouter = require('./routes/users');
const passwordRouter = require('./routes/password');
const uploadRouter = require('./routes/upload');
const logger = require('./middlewares/logger');
const { error404, error500 } = require('./middlewares/errors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
         .then(() => console.log('Connected to MongoDB'))
         .catch(err => console.log("Can't connect to MongoDB"));


const app = express();
const port = process.env.PORT || 5000;
const hostname = 'localhost';

// JSON Middleware
app.use(express.json());


// Static Middleware
app.use(express.static(path.join(__dirname, 'images')));


// Url Encoded Middleware
app.use(express.urlencoded({ extended: false }));


// Logger Middleware
app.use(logger);


// View Engine
app.set('view engine', 'ejs');


// Routes
app.use('/', booksRouter);
app.use('/', authorsRouter);
app.use('/', authPath);
app.use('/', usersRouter);
app.use('/', passwordRouter);
app.use('/', uploadRouter);

// Error middleware
app.use(error404);
app.use(error500);




// Server
app.listen(port, hostname, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on ${hostname}:${port}`);
});