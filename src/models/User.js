const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [5, 'Minimum length of password is 5'],
  },
});

userSchema.post('save', function (doc, next) {
  console.log('New user has been created');
  next();
});

userSchema.pre('save', async function (next) {
  console.log('Creating a hash for new user');
  const salt = await bcrypt.genSalt();
  // password obtained from the schema while being sent to the database
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// for login purposes
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const authResult = await bcrypt.compare(password, user.password);
    if (authResult) {
      return user;
    }
    throw Error('Incorrect Password');
  }
  throw Error('Incorrect Email');
};

const User = mongoose.model('User', userSchema);
module.exports = User;
