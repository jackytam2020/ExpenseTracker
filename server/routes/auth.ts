import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/login', (req, res) => {
  // this will render login.ejs file
  res.render('login');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/redirect/google',
  passport.authenticate('google', {
    failureRedirect: `http://localhost:3000/`,
  }),
  (_req, res) => {
    // Successful authentication, redirect to client-side application
    res.redirect('http://localhost:3000/home');
  }
);

router.get('/profile', (req, res) => {
  // Passport stores authenticated user information on `req.user` object.
  // Comes from done function of `deserializeUser`
  // If `req.user` isn't found send back a 401 Unauthorized response
  if (req.user === undefined)
    return res.status(401).json({ message: 'Unauthorized' });

  // If user is currently authenticated, send back user info
  res.status(200).json(req.user);
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(`http://localhost:3000/`);
  });
});

export default router;
