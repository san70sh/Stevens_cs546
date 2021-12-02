const express = require('express');
const router = express.Router();
const usrDat = require('../data/users');

router.get('/', async (req, res) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        return res.render('partials/signupForm', {title: "Sign-up Page"});
    }
})

router.post('/', async (req, res) => {
    try{
        //Username validation
        let {username, password} = req.body;
        let re = /^[a-z0-9]*$/im
        if(username == undefined || username.trim().length == 0 ) {
            return res.status(400).render('partials/signupForm', {title: "Sign-up Page", message: "Please enter a username.", err: true});
        }
        if(username.length < 4) {
            return res.status(400).render('partials/signupForm', {title: "Sign-up Page", message: "The username is too short.", err: true});
        }
        if(!re.test(username)) {
            return res.status(400).render('partials/signupForm', {title: "Sign-up Page", message: `${username} is not a valid username.`, err: true});
        } 
        username = username.toLowerCase();

        //password validation
        let re2 = /\s/i
        if(password == undefined || password.length == 0 ) {
            return res.status(400).render('partials/signupForm', {title: "Sign-up Page", message: "Please enter a password.", err: true});
        }
        if(re2.test(password)) {
            return res.status(400).render('partials/signupForm', {title: "Sign-up Page", message: "Spaces are not allowed in passwords.", err: true});
        } 
        if(password.length < 6) {
            return res.status(400).render('partials/signupForm', {title: "Sign-up Page", message: "Password is too short.", err: true});
        } 
    
        let output = await usrDat.createUser(username, password);
        if(output){
            if(output.userInserted) {
                return res.redirect('/');
            }
        }
    } catch (e) {
        return res.status(e.status).render('partials/signupForm', {title: "Sign-up Page", message: e.message, err: true});
    }
    
});

module.exports = router;