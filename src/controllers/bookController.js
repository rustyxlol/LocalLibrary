const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');
const Author = require('../models/author');
const Genre = require('../models/genre');
const async = require('async');

const index = (req, res) => {
  async.parallel(
    {
      book_count: function (callback) {
        Book.countDocuments({}, callback); // pass this down to match copies with this book
      },

      book_instance_count: function (callback) {
        BookInstance.countDocuments({}, callback);
      },

      book_instance_available: function (callback) {
        BookInstance.countDocuments({ status: 'Available' }, callback);
      },

      author_count: function (callback) {
        Author.countDocuments({}, callback);
      },

      genre_count: function (callback) {
        Genre.countDocuments({}, callback);
      },
    },
    function (err, results, next) {
      if (err) next(err);
      res.render('./displays/index', {
        title: 'Home',
        data: results,
      });
    }
  );
};

const book_create_get = (req, res) => {
  async.parallel(
    {
      authors: function (callback) {
        Author.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results, next) {
      if (err) return next(err);
      res.render('./forms/book_form', {
        title: 'Create Book',
        authors: results.authors,
        genres: results.genres,
      });
    }
  );
};

const book_create_post = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre,
  });

  Book.findOne({
    isbn: book.isbn,
  }).exec(function (err, result, next) {
    if (result) {
      res.redirect('/catalog/book/' + result._id);
    } else {
      book.save(function (err) {
        if (err) {
          next(err);
        }
        res.redirect('/catalog/books');
      });
    }
  });
};

const book_delete_get = (req, res) => {
  async.parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(callback);
      },
      book_instance: function (callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results, next) {
      if (err) next(err);
      res.render('./forms/book_delete', {
        title: results.book.title,
        book: results.book,
        book_instance: results.book_instance,
      });
    }
  );
};

const book_delete_post = (req, res) => {
  async.parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(callback);
      },
      book_instance: function (callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results, next) {
      if (err) next(err);
      if (results.book_instance.length > 0) {
        res.render('book_delete', {
          title: 'Delete Book',
          book: results.book,
          book_instance: results.book_instance,
        });
      } else {
        Book.findByIdAndDelete(req.body.bookid, function (err, results) {
          if (err) return next(err);
          console.log(results);
          res.redirect('/catalog/books');
        });
      }
    }
  );
};

const book_update_get = (req, res) => {
  async.parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(callback);
      },
      authors: function (callback) {
        Author.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results, next) {
      if (err) {
        return next(err);
      }
      if (results.book == null) {
        return next(err);
      }
      res.render('./forms/book_form', {
        title: 'Update Book',
        authors: results.authors,
        genres: results.genres,
        book: results.book,
      });
    }
  );
};
const book_update_post = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre,
    _id: req.params.id,
  });

  Book.findByIdAndUpdate(req.params.id, book)
    .then((results) => {
      res.redirect('/catalog/books/' + results._id);
    })
    .catch((err) => console.log(err));
};

const book_detail = (req, res) => {
  async.parallel(
    {
      book: function (callback) {
        Book.findById(req.params.id)
          .populate('author')
          .populate('genre')
          .exec(callback);
      },
      book_instance: function (callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    function (err, results, next) {
      if (err) next(err);
      res.render('./displays/book_detail', {
        title: results.book.title,
        book: results.book,
        book_instance: results.book_instance,
      });
    }
  );
};
const book_list = (req, res, next) => {
  Book.find({}, 'title author')
    .sort({ title: 1 })
    .populate('author')
    .exec(function (err, list_books) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render('./displays/book_list', {
        title: 'Books we provide',
        book_list: list_books,
      });
    });
};

module.exports = {
  index,
  book_create_get,
  book_create_post,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post,
  book_detail,
  book_list,
};
