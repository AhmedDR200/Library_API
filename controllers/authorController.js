const {Author,
    validateUpdateAuthor,
    validateAuthor} = require('../models/authors');
const asyncHandler = require('express-async-handler');


// Get all authors
const getAllAuthors = asyncHandler(
    async(req, res) =>{
        const { pageNumber } = req.query;
        const pageSize = 1;
        const skip = (pageNumber - 1) * pageSize

        const authors = await Author.find()
        .skip(skip)
        .limit(pageSize)
        .sort({name: 1})
        .select(" -__v");

        res.status(200).json({
            status: 'success',
            data: {authors}
        });
    }
);


// Get a single author
const getSingleAuthor = asyncHandler(
    async(req, res) =>{
        const author = await Author.findById(req.params.id).select(" -__v");
        if(!author) return res.status(404).send('The author with the given ID was not found');
        res.status(200).json({
            status: 'success',
            data: {author}
        });
    }
);


// Create an author
const createAuthor = asyncHandler(
    async(req, res) =>{
        const {error} = validateAuthor(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
            try{
                const author = new Author({
                name: req.body.name,
                age: req.body.age,
                nationality: req.body.nationality,
                image: req.body.image
            });
            const result = await author.save();
    
            res.status(201).json({
                status: 'success',
                data: {result}
            })}
            catch(err){
                res.status(500).json({
                    status: 'fail',
                    message: err.message
            })}
    }
);


// Update an author
const updateAuthor = asyncHandler(
    async(req, res) =>{
        const {error} = validateUpdateAuthor(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id,{
            $set:{
                name: req.body.name,
                age: req.body.age,
                nationality: req.body.nationality,
                image: req.body.image
            }
        },
        {new: true}).select(" -__v");
    
        res.status(200).json({
            status: 'success',
            data: {updatedAuthor}
        });
    }
);


// Delete an author
const deleteAuthor = asyncHandler(
    async(req, res) =>{
        const author = await Author.findById(req.params.id);
        if(author){
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: 'success',
                message: 'Author deleted'
            });
        }else{
            res.status(404).json({
                status: 'fail',
                message: 'Author not found'
            });
        }
    }
);


module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}