const userRoute = require('./users');
const loginRoute = require('./login');
const signupRoute = require('./signup');

const conMethod = (app) => {
    app.use('/signup', signupRoute);
    app.use('/login', loginRoute);
    app.use('/private', userRoute);

    app.use('/logout', (req, res, next) => {
      req.session.destroy();
      return res.render('partials/logout', {title: "Logout Page"})
    });
    
    app.get('/', (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/private');
            next();
          } else {
                return res.render('partials/loginform', {title: "Login"});
          }
    });
    
    
    
    app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = {
    conMethod
};