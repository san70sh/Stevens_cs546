const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleDat = data.people;

router.get('/', async (req, res) => {
  try {
    const peopleList = await peopleDat.getPeople();
    res.json(peopleList);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
    try {
      reqId = req.params.id.trim();
      let re = /^[a-zA-Z0-9-]+$/;
      if(re.test(reqId)){
        const person = await peopleDat.getPersonById(reqId);
        res.json(person);
      } else {
        res.status(404).json({message: 'Please enter a valid ID'})
      }
    } catch (e) {
      res.status(404).json({ message: 'The person with this ID is not present in the list.' });
    }
  });
  
router.post('/', async (req, res) => {
  res.status(501).send();
});

router.delete('/', async (req, res) => {
  res.status(501).send();
});

module.exports = router;
