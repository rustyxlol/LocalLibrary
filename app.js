const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const routes = require('./src/routes/users');
const mongoose = require('mongoose');
const mongoDB = `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_password}@cluster0.fsthn.mongodb.net/${process.env.mongo_user}?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * Import Routes
 */
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const catalogRouter = require('./src/routes/catalogs');

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

app.use('/', (req, res) => {
  res.render('./displays/404', { title: '404 Not Found' });
});

app.listen(3000, 'localhost', () => {
  console.log('listening on port 3000');
});
