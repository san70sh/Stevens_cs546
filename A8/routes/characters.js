const express = require('express');
const router = express.Router();
const data = require('../data');
const characterDat = data.characters;

router.get('/', async (req, res) => {
    res.render('characters/finder', {title: "Character Finder"});
  });
  

router.post('/search', async (req, res) => {
    try {
      let term = req.body.searchTerm;
      if(term.trim().length == 0 || term == null || term == undefined) {
        let errMsg = "Seriously?";
        res.status(400).render('layouts/error', {title: "404 Error", message: errMsg, noTerm: true});
        return;
      }
      let charList = await characterDat.getPersonBySearchTerm(term);
      if(charList.err){
        res.status(404).render('layouts/error', {message: charList.err, charNotFound: true});
      } else {
        res.render('characters/search', {title: "Characters Found", characters: charList, searchTerm: term});
      }
      
    } catch (e) {
        console.log(e);
    }
  });

router.get('/characters/:id', async (req, res) => {
    try {
        reqId = req.params.id.trim();
        let character = await characterDat.getPersonById(reqId);
        if(character.err){
          res.status(404).render('layouts/error', {message: character.err, charNotFound: true});
        } else {
          res.render('characters/character', {title: character.name, character});
        }
    } catch (e) {
        console.log(e);
    }
  });

  module.exports = router;