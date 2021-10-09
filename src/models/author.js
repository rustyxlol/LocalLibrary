const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');
const authorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

authorSchema.virtual('name').get(function () {
  return this.lastName + ', ' + this.firstName;
});

authorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

authorSchema.virtual('dateBirth').get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_HUGE)
    : 'not specified';
});

authorSchema.virtual('dateDeath').get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_HUGE)
    : ' ';
});

module.exports = mongoose.model('Author', authorSchema);
