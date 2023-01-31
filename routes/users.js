/* copia del código de Ale */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isLoggedIn = require('../middlewares');

/* GET users listing. */
router.get('/auth/profile', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('profile', user);
});

/* GET users listing. */
router.get('/auth/profile/edit', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('profileEdit', user);
});

router.post('/auth/profile/edit', isLoggedIn, async function (req, res, next) {
  const { username } = req.body;
  //if (!username) {
  //send error
  //}
  const user = req.session.currentUser;
  try {
    const userInDB = await User.findByIdAndUpdate(user._id, { username }, { new: true });
    req.session.currentUser = userInDB;
    res.redirect('/auth/profile');
  } catch (error) {
    next(error);
  }
});



module.exports = router;