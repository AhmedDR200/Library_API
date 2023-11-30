const express = require('express');
const router = express.Router();
const { verifyTokenIsAdmin } = require('../middlewares/verifyToken');
const { getAllAuthors,
        getSingleAuthor,
        createAuthor,
        updateAuthor,
        deleteAuthor } = require('../controllers/authorController');

/**
 * description: Get all authors
 * @route GET /authors
 * access: public
 * @returns {object} 200 - An array of authors
 * @returns {Error}  default - Unexpected error
 */

router.get('/authors', getAllAuthors);

/**
 * description: Get a single author
 * @route GET /authors/{id}
 * access: public
 * @param {integer} id.path.required - author id
 * @returns {object} 200 - An array of authors
 * @returns {Error}  default - Unexpected error
 */

router.get('/authors/:id', getSingleAuthor);

/**
 * description: Create a new author
 * @route POST /authors
 * access: public
 * @param {string} name.body.required - author name
 * @param {integer} age.body.required - author age
 * @returns {object} 201 - An array of authors
 * @returns {Error}  default - Unexpected error
 */

router.post('/authors',verifyTokenIsAdmin , createAuthor);

/**
 * description: Update an author
 * @route PUT /authors/{id}
 * access: public
 * @param {integer} id.path.required - author id
 * @param {string} name.body.required - author name
 * @param {integer} age.body.required - author age
 * @returns {object} 200 - An array of authors
 * @returns {Error}  default - Unexpected error
 */

router.put('/authors/:id',verifyTokenIsAdmin , updateAuthor);

/**
 * description: Delete an author
 * @route DELETE /authors/{id}
 * access: public
 * @param {integer} id.path.required - author id
 * @returns {object} 200 - An array of authors
 * @returns {Error}  default - Unexpected error
 */

router.delete('/authors/:id',verifyTokenIsAdmin , deleteAuthor);


module.exports = router;

