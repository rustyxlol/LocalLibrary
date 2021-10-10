const Genre = require('../models/genre');
const Book = require('../models/book');

const async = require('async');

const genre_create_get = (req, res) => {
  res.render('./forms/genre_form', { title: 'Create Genre', error: '' });
};

const genre_create_post = (req, res, next) => {
  const genre = new Genre(req.body);
  if (genre.name.trim().length <= 1) {
    res.render('./forms/genre_form', {
      title: 'Create Genre',
      genre: genre,
      error: 'Error Occured',
    });
    return next();
  }

  Genre.findOne({ name: genre.name }).exec(function (err, result) {
    if (result) {
      res.redirect('/catalog/genre/' + result._id);
      return;
    } else {
      genre.save(function (err) {
        if (err) return next(err);
        res.redirect(genre.url);
      });
    }
  });
};

const genre_delete_get = (req, res) => {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function (callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    function (err, results, next) {
      if (err) return next(err);
      res.render('./forms/genre_delete', {
        title: 'Delete Genre',
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

const genre_delete_post = (req, res) => {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function (callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    function (err, results, next) {
      if (err) return next(err);
      if (results.genre_books.length > 0) {
        res.render('genre_delete', {
          title: 'Delete genre',
          genre: results.genre,
          genre_books: results.genre_books,
        });
        return;
      } else {
        Genre.findByIdAndDelete(req.body.genreid, function (err, results) {
          if (err) return next(err);
          res.redirect('/catalog/genres');
        });
      }
    }
  );
};

const genre_update_get = (req, res) => {
  const genre = Genre.findById(req.params.id, function (err, genre) {
    res.render('./forms/genre_form', {
      title: 'Update Genre: ' + genre.name,
      error: '',
    });
  });
};
const genre_update_post = (req, res) => {
  const genre = new Genre({
    name: req.body.name,
    _id: req.params.id,
  });

  Genre.findByIdAndUpdate(req.params.id, genre)
    .then((results) => {
      res.redirect('/catalog/genre/' + results._id);
    })
    .catch((err) => console.log(err));
};

const genre_detail = (req, res) => {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results, next) {
      if (err) next(err);
      if (results.genre === null) {
        const error = new Error('Genre not found');
        error.status = 404;
        return next(error);
      }
      res.render('./displays/genre_detail', {
        title: 'Genre Details',
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};
const genre_list = (req, res, next) => {
  Genre.find()
    .sort({ name: 1 })
    .exec(function (err, genre_list) {
      if (err) return next(err);
      res.render('./displays/genre_list', {
        title: 'All Genres',
        genre_list: genre_list,
      });
    });
};

module.exports = {
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post,
  genre_detail,
  genre_list,
};
