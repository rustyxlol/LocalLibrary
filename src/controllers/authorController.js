const Author = require('../models/author');
const Book = require('../models/book');
const async = require('async');

const author_create_get = (req, res) => {
  res.render('./forms/author_form', { title: 'Create Author' });
};

const author_create_post = (req, res, next) => {
  const author = new Author(req.body);
  if (
    author.firstName.trim().length <= 1 &&
    author.lastName.trim().length <= 1
  ) {
    res.render('./forms/author_form', {
      title: 'Create Author',
      author: author,
      error: 'Error Occured',
    });
    return;
  }

  Author.findOne({
    firstName: author.firstName,
    lastName: author.lastName,
  }).exec(function (err, result) {
    if (result) {
      res.redirect('/catalog/author/' + result._id);
      return;
    } else {
      author.save(function (err) {
        if (err) return next(err);
        res.redirect(author.url);
      });
    }
  });
};

const author_delete_get = (req, res, next) => {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id).exec(callback);
      },

      book: function (callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.render('./forms/author_delete', {
        title: results.author.name,
        author: results.author,
        book: results.book,
      });
    }
  );
};

const author_delete_post = (req, res, next) => {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.body.authorid).exec(callback);
      },

      book: function (callback) {
        Book.find({ author: req.body.authorid }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.book.length > 0) {
        res.render('author_delete', {
          title: 'Delete author',
          book: results.book,
          author: results.author,
        });
        return;
      } else {
        Author.findByIdAndDelete(req.body.authorid, function (err, results) {
          if (err) return next(err);
          res.redirect('/catalog/authors');
        });
      }
    }
  );
};

const author_update_get = (req, res) => {
  res.render('./forms/author_form', { title: 'Update Author' });
};

const author_update_post = (req, res) => {
  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death,
    _id: req.params.id,
  });

  Author.findByIdAndUpdate(req.params.id, author)
    .then((results) => {
      res.redirect('/catalog/author/' + results._id);
    })
    .catch((err) => console.log(err));
};

const author_detail = (req, res, next) => {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id).exec(callback);
      },

      book: function (callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      res.render('./displays/author_detail', {
        title: results.author.name,
        author: results.author,
        book: results.book,
      });
    }
  );
};

const author_list = (req, res, next) => {
  Author.find()
    .sort({ lastName: 1 })
    .exec(function (err, list_authors) {
      if (err) return next(err);
      res.render('./displays/author_list', {
        title: 'All Authors',
        author_list: list_authors,
      });
    });
};

module.exports = {
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post,
  author_detail,
  author_list,
};
