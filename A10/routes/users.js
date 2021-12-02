const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  return res.render('partials/private', {title: "Welcome Page",message: `Hello ${req.session.user}`, auth: true});
});

module.exports = router;