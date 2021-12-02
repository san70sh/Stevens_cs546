const express = require('express');
const router = express.Router();
const usrDat = require('../data/users');

router.post('/', async (req, res) => {
  if (req.session.user) return res.redirect('/private')
  else {
    let {username, password} = req.body;
    let re = /^[a-z0-9]*$/i
    if(username == undefined || username.trim().length == 0 ) {
      return res.status(400).render('partials/loginform', {title: "Login Page", message: "Please enter your username.", err: true});
    }
    if(username.length < 4) {
        return res.status(400).render('partials/loginform', {title: "Login Page", message: "The username is too short.", err: true});
    }
    if(!re.test(username)) {
        return res.status(400).render('partials/loginform', {title: "Login Page", message: `${username} is not a valid username.`, err: true});
    }
    username = username.toLowerCase();
    let re2 = /\s/i
    if(password == undefined || password.length == 0 ) {
      return res.status(400).render('partials/loginform', {title: "Login Page", message: "Please enter your password.", err: true});
    }
    if(re2.test(password)) {
      return res.status(400).render('partials/loginform', {title: "Login Page", message: "Spaces are not allowed in passwords.", err: true});
    } 
    if(password.length < 6) {
        return res.status(400).render('partials/loginform', {title: "Login Page", message: "Password is too short.", err: true});
    } 
    try {
      let output = await usrDat.checkUser(username, password);
      if(output.authenticated) {
        req.session.user = username;
        return res.redirect('/private');
      }
    } catch (e) {
      return res.status(e.status).render('partials/loginform', {title: "Login Page", message: e.message, err: true});
    }
    
  }
});
module.exports = router;