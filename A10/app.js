const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let logger = (req, res, next) => {
  let currentTS = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  let user = '';
  if(req.session.user) {
    user = "Authenticated User";
  } else {
    user = "Non-Authenticated User";
  }
  let log = `[${currentTS}]: ${method} ${route} ${user}`;
  console.log(log);
  next();
}
app.use(
  session({
    name: 'AuthCookie',
    secret: "scaredycat",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 100000 }
  })
);

app.use(logger);
app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('partials/private', {title: "Invalid Page", message: "Please login to access this page.", auth: false});
  } else {
    next();
  }
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes.conMethod(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
