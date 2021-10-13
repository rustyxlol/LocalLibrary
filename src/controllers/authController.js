const User = require('../models/User');
const jwt = require('jsonwebtoken');

function handleErrors(err) {
  const errors = {
    email: '',
    password: '',
  };

  // incorrect login credentials
  if (err.message === 'Incorrect Email') {
    errors.email = 'Invalid Email';
  }
  if (err.message === 'Incorrect Password') {
    errors.password = 'Invalid Password';
  }

  if (err.code === 11000) {
    errors.email = 'That email is already in use';
  }
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
}

const maxAge = 30 * 24 * 60 * 60;

function createToken(id) {
  return jwt.sign({ id }, 'some secret key here', { expiresIn: maxAge });
}

module.exports.login_get = (req, res) => {
  res.render('login', { title: 'login' });
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send({ user: user._id });
  } catch (err) {
    const error = handleErrors(err);
    console.log(error);
    res.status(401).send({ error });
  }
  res.render('login', { title: 'login' });
};

module.exports.signup_get = (req, res) => {
  res.render('signup', { title: 'signup' });
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send({ user: user._id });
  } catch (err) {
    const error = handleErrors(err);
    console.log(error);
    res.status(401).send({ error });
  }
  res.render('signup', { title: 'signup' });
};

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
