const restRoute = require('./restaurants');
const reviewRoute = require('./reviews');

const conMethod = (app) => {
  app.use('/restaurants', restRoute);
  app.use('/reviews', reviewRoute);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = conMethod;