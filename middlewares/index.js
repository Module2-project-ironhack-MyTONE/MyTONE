/* copia del código de Ale */

module.exports = isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      res.redirect('/auth/login')
    } else {
      next()
    }
  };
  
  // module.exports = isAdmin = (req, res, next) => {
  //   if (req.session.currentUser.role === 'admin') {
  //     next()
  //   } else {
  //     res.redirect('/auth/login')
  //   }
  // };