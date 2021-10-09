const BookInstance = require('../models/bookInstance');
const Book = require('../models/book');
const async = require('async');

const bookInstance_create_get = (req, res, next) => {
  Book.find({}, function (err, books) {
    if (err) return next(err);
    res.render('./forms/bookInstance_form', {
      title: 'Create a Copy',
      books: books,
    });
  });
};

const bookInstance_create_post = (req, res, next) => {
  const bookInstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back,
  });

  bookInstance.save(function (err) {
    if (err) return next(err);
    res.redirect('/catalog/bookInstance/' + bookInstance._id);
  });
};

const bookInstance_delete_get = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookInstance) {
      if (err) return next(err);
      res.render('./forms/bookInstance_delete', {
        title: 'Delete copy of ' + bookInstance.book.title,
        bookInstance: bookInstance,
      });
    });
};

const bookInstance_delete_post = (req, res, next) => {
  BookInstance.findByIdAndDelete(req.params.id, function (err) {
    if (err) return next(err);
    res.redirect('/catalog/bookInstances');
  });
};

const bookInstance_update_get = (req, res) => {
  async.parallel(
    {
      book_instance: function (callback) {
        BookInstance.findById(req.params.id).populate('book').exec(callback);
      },
      books: function (callback) {
        Book.find().exec(callback);
      },
    },
    function (err, results) {
      res.render('./forms/bookInstance_form', {
        title: 'Update copy of ' + results.book_instance.book.title,
        bookInstance: results.bookInstance,
        books: results.books,
      });
    }
  );
};

const bookInstance_update_post = (req, res) => {
  const bookInstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back,
    _id: req.params.id,
  });

  BookInstance.findByIdAndUpdate(req.params.id, bookInstance)
    .then((results) => {
      res.redirect('/catalog/bookInstance/' + results._id);
    })
    .catch((err) => console.log(err));
};
const bookInstance_detail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookInstance) {
      if (err) return next(err);
      res.render('./displays/bookinstance_detail', {
        title: 'Copy of ' + bookInstance.book.title,
        bookInstance: bookInstance,
      });
    });
};
const bookInstance_list = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      // Use this instead of callback
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render('./displays/bookinstance_list', {
        title: 'All Books',
        bookinstance_list: list_bookinstances,
      });
    });
};

module.exports = {
  bookInstance_create_get,
  bookInstance_create_post,
  bookInstance_delete_get,
  bookInstance_delete_post,
  bookInstance_update_get,
  bookInstance_update_post,
  bookInstance_detail,
  bookInstance_list,
};
