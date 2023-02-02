const express = require('express');
const router = express.Router();

// @desc    App home page
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
