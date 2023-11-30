const express = require('express');
const router = express.Router();
const { Book,
        validateUpdateBook,
        validateBook } = require('../models/books');
const asyncHandler = require('express-async-handler');
const { verifyTokenIsAdmin } = require('../middlewares/verifyToken');



/**
 * description: Get all books
 * @route GET /books
 * access: public
 * @returns {object} 200 - An array of books
 * @returns {Error}  default - Unexpected error
 */

router.get('/books', asyncHandler(
    async(req, res) =>{
        // Comparioson Query Operators
        // eq (equal)
        // ne (not equal)
        // gt (greater than)
        // gte (greater than or equal to)
        // lt (less than)
        // lte (less than or equal to)
        // in  
        // nin (not in)

        const { minPrice , maxPrice } = req.query;
        const { minRate , maxRate } = req.query;

        let books;

        if(minPrice && maxPrice){
            books = await Book
            .find({price: {$gte: minPrice , $lte: maxPrice}})
            .populate("author", ["_id", "name"])
            .sort({title: 1})
            .select(" -__v");
        }
        else if(minRate && maxRate){
            books = await Book
            .find({rating: {$gte: minRate , $lte: maxRate}})
            .populate("author", ["_id", "name"])
            .sort({title: 1})
            .select(" -__v");
        }
        else{
            books = await Book
            .find()
            .populate("author", ["_id", "name"])
            .sort({title: 1})
            .select(" -__v");
        }

        res.status(200).json({
            status: 'success',
            data: {books}
        });
    }
));


/** 
 * description: Get a single book
 * @route GET /books/:id
 * @param {integer} id.path.required - book id
 * access: public
 * @returns {object} 200 - A single book object
 * @returns {Error}  default - Unexpected error
 */

router.get('/books/:id', asyncHandler(
    async(req, res) =>{
        const book = await Book
        .findById(req.params.id)
        .populate("author")
        .select(" -__v");
        
        if(book){
            res.status(200).json({
                status: 'success',
                data: {book}
            });
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Book not found'
            });
        }
    }
));


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

router.post('/books',verifyTokenIsAdmin ,asyncHandler(
    async(req, res) =>{
        const {error} = validateBook(req.body);
    
        if(error){
            return res.status(400).json({
                status: 'fail',
                message: {message: error.details[0].message}
            });
        }
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            rating: req.body.rating,
            cover: req.body.cover
        });
        const result = await newBook.save();
        res.status(201).json({
            status: 'success',
            data: {book: result}
        });
    }
));


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

router.put('/books/:id',verifyTokenIsAdmin ,asyncHandler(
    async(req, res) =>{
        const {error} = validateUpdateBook(req.body);
    
        if(error){
            return res.status(400).json({
                status: 'fail',
                message: {message: error.details[0].message}
            });
        }
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
           $set: { 
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                rating: req.body.rating,
                cover: req.body.cover
           }    
        }, {new: true});

        if(updatedBook){
            res.status(200).json({
                status: 'success',
                data: {book: updatedBook}
            });
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Book not found'
            });
        }
    }
));


/**
 * description: Delete a book
 * @route DELETE /books/:id
 * @param {integer} id.path.required - book id
 * access: public
 * @returns {object} 200 - A deleted book object
 * @returns {Error}  default - Unexpected error
 */

router.delete('/books/:id',verifyTokenIsAdmin ,asyncHandler(
    async(req, res) =>{
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if(deletedBook){
            res.status(200).json({
                status: 'success',
                data: {book: deletedBook}
            });
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Book not found'
            });
        }
    }
));


module.exports = router;
