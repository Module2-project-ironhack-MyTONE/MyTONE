/* copia del código de Ale */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Instrument = require('../models/Instrument');
const isLoggedIn = require('../middlewares');

/* GET users listing. */
router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = req.session.currentUser;
  try {
    const instruments = await Instrument.find({owner:user._id});
    res.render('profile', {user, instruments});;
  } catch (error) {
    next(error)
  }
});

/* GET users listing. */
router.get('/profile/edit', isLoggedIn, function (req, res, next) {
  const user = req.session.currentUser;
  res.render('profileEdit', {user});
});

router.post('/profile/edit', isLoggedIn, async function (req, res, next) {
  const { username, image } = req.body;
  //if (!username) {
  //send error
  //}
  const user = req.session.currentUser;
  try {
    const userInDB = await User.findByIdAndUpdate(user._id, { username, image }, { new: true });
    req.session.currentUser = userInDB;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});



module.exports = router;