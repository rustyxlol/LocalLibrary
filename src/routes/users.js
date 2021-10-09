const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send("you're in users.js");
});

router.get('/create', function (req, res) {
  res.send("you're in users create");
});

module.exports = router;
