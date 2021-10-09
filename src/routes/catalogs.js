const express = require('express');
const router = express.Router();

/**
 * Import all controller modules
 */

const bookController = require('../controllers/bookController');
const bookInstanceController = require('../controllers/bookInstanceController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');

/**
 * Create all BOOK Routes - CRUD
 */

// Home page
router.get('/', bookController.index);

// Create a book REQUEST PAGE - GET
router.get('/book/create', bookController.book_create_get);

// Create a book RESPONSE - POST
router.post('/book/create', bookController.book_create_post);

// Delete a book - get
router.get('/book/:id/delete', bookController.book_delete_get);

// Delete a book - post
router.post('/book/:id/delete', bookController.book_delete_post);

// Update a book - get
router.get('/book/:id/update', bookController.book_update_get);

// Update a book - post
router.post('/book/:id/update', bookController.book_update_post);

// Get a book - get
router.get('/book/:id', bookController.book_detail);

// Get list of books - get
router.get('/books', bookController.book_list);

/**
 * Create all AUTHOR Routes - CRUD
 */

// Create a author REQUEST PAGE - GET
router.get('/author/create', authorController.author_create_get);

// Create a author RESPONSE - POST
router.post('/author/create', authorController.author_create_post);

// Delete a author - get
router.get('/author/:id/delete', authorController.author_delete_get);

// Delete a author - post
router.post('/author/:id/delete', authorController.author_delete_post);

// Update a author - get
router.get('/author/:id/update', authorController.author_update_get);

// Update a author - post
router.post('/author/:id/update', authorController.author_update_post);

// Get a author - get
router.get('/author/:id', authorController.author_detail);

// Get list of authors - get
router.get('/authors', authorController.author_list);

/**
 * Create all GENRE Routes - CRUD
 */

router.get('/genre/create', genreController.genre_create_get);

// Create a genre RESPONSE - POST
router.post('/genre/create', genreController.genre_create_post);

// Delete a genre - get
router.get('/genre/:id/delete', genreController.genre_delete_get);

// Delete a genre - post
router.post('/genre/:id/delete', genreController.genre_delete_post);

// Update a genre - get
router.get('/genre/:id/update', genreController.genre_update_get);

// Update a genre - post
router.post('/genre/:id/update', genreController.genre_update_post);

// Get a genre - get
router.get('/genre/:id', genreController.genre_detail);

// Get list of genres - get
router.get('/genres', genreController.genre_list);

/**
 * Create all BOOK INSTANCE Routes - CRUD
 */

router.get(
  '/bookInstance/create',
  bookInstanceController.bookInstance_create_get
);

// Create a bookInstance RESPONSE - POST
router.post(
  '/bookInstance/create',
  bookInstanceController.bookInstance_create_post
);

// Delete a bookInstance - get
router.get(
  '/bookInstance/:id/delete',
  bookInstanceController.bookInstance_delete_get
);

// Delete a bookInstance - post
router.post(
  '/bookInstance/:id/delete',
  bookInstanceController.bookInstance_delete_post
);

// Update a bookInstance - get
router.get(
  '/bookInstance/:id/update',
  bookInstanceController.bookInstance_update_get
);

// Update a bookInstance - post
router.post(
  '/bookInstance/:id/update',
  bookInstanceController.bookInstance_update_post
);

// Get a bookInstance - get
router.get('/bookInstance/:id', bookInstanceController.bookInstance_detail);

// Get list of bookInstances - get
router.get('/bookInstances', bookInstanceController.bookInstance_list);

module.exports = router;
