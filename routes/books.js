const express = require('express');
const router = express.Router();
const { verifyTokenIsAdmin } = require('../middlewares/verifyToken');
const { getAllBooks,
        bookByID,
        createBook,
        updateBook,
        deleteBook} = require('../controllers/bookController');


/**
 * description: Get all books
 * @route GET /books
 * access: public
 * @returns {object} 200 - An array of books
 * @returns {Error}  default - Unexpected error
 */

router.get('/books', getAllBooks);


/** 
 * description: Get a single book
 * @route GET /books/:id
 * @param {integer} id.path.required - book id
 * access: public
 * @returns {object} 200 - A single book object
 * @returns {Error}  default - Unexpected error
 */

router.get('/books/:id', bookByID);


/**
 * description: Create a new book
 * @route POST /books
 * @param {string} title.body.required - book title
 * @param {string} author.body.required - book author
 * @param {number} price.body.required - book price
 * access: public
 * @returns {object} 201 - A new book object
 * @returns {Error}  default - Unexpected error
 */

router.post('/books',verifyTokenIsAdmin , createBook);


/**
 * description: Update a book
 * @route PUT /books/:id
 * @param {integer} id.path.required - book id
 * @param {string} title.body.required - book title
 * @param {string} author.body.required - book author
 * @param {number} price.body.required - book price
 * access: public
 * @returns {object} 200 - An updated book object
 * @returns {Error}  default - Unexpected error
 */

router.put('/books/:id',verifyTokenIsAdmin , updateBook);


/**
 * description: Delete a book
 * @route DELETE /books/:id
 * @param {integer} id.path.required - book id
 * access: public
 * @returns {object} 200 - A deleted book object
 * @returns {Error}  default - Unexpected error
 */

router.delete('/books/:id',verifyTokenIsAdmin , deleteBook);


module.exports = router;
