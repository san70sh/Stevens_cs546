const peopleRoute = require('./people');
const stockRoute = require('./stocks');

const conMethod = (app) => {
  app.use('/people', peopleRoute);
  app.use('/stocks', stockRoute);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = {
    conMethod
};