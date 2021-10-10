const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const BIController = require('../controllers/bookInstanceController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');

router.get('/', bookController.index);

router.get('/book/:id', bookController.book_detail);
router.get('/books', bookController.book_list);
router.get('/book/create', bookController.book_create_get);
router.get('/book/:id/update', bookController.book_update_get);
router.get('/book/:id/delete', bookController.book_delete_get);

router.get('/bookInstance/:id', BIController.bookInstance_detail);
router.get('/bookInstances', BIController.bookInstance_list);
router.get('/bookInstance/create', BIController.bookInstance_create_get);
router.get('/bookInstance/:id/delete', BIController.bookInstance_delete_get);
router.get('/bookInstance/:id/update', BIController.bookInstance_update_get);

router.get('/author/:id', authorController.author_detail);
router.get('/authors', authorController.author_list);
router.get('/author/create', authorController.author_create_get);
router.get('/author/:id/update', authorController.author_update_get);
router.get('/author/:id/delete', authorController.author_delete_get);

router.get('/genre/:id', genreController.genre_detail);
router.get('/genres', genreController.genre_list);
router.get('/genre/create', genreController.genre_create_get);
router.get('/genre/:id/update', genreController.genre_update_get);
router.get('/genre/:id/delete', genreController.genre_delete_get);

router.post('/book/create', bookController.book_create_post);
router.post('/book/:id/update', bookController.book_update_post);
router.post('/book/:id/delete', bookController.book_delete_post);

router.post('/bookInstance/create', BIController.bookInstance_create_post);
router.post('/bookInstance/:id/update', BIController.bookInstance_update_post);
router.post('/bookInstance/:id/delete', BIController.bookInstance_delete_post);

router.post('/author/create', authorController.author_create_post);
router.post('/author/:id/update', authorController.author_update_post);
router.post('/author/:id/delete', authorController.author_delete_post);

router.post('/genre/create', genreController.genre_create_post);
router.post('/genre/:id/delete', genreController.genre_delete_post);
router.post('/genre/:id/update', genreController.genre_update_post);

module.exports = router;
