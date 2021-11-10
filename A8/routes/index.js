const characterRoute = require('./characters');

const conMethod = (app) => {
    app.use('/', characterRoute);
    app.use('*', (req, res) => {
    res.status(404).render('layouts/mainErr', {title: "404 Error"});;
  });
};

module.exports = {
    conMethod
};