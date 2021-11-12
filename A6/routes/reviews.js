const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewDat = data.reviews;
const restMethods = data.restaurants;

function checkParams(label, data, type, res) {
  if(!data) {
    res.status(400).json({message: `Please enter ${label}`});
    return true;
  }

  if(typeof(data) !== type){
    res.status(400).json({message: `${label} is not of type ${type}`});
    return true;
  } 
  
  if(type === 'string') data = data.trim();
  if(data == '') {
    res.status(400).json({message: `Please enter ${label}`});
    return true;
  }

  
}


router.get('/:id', async (req, res) => {
  try {
    reqId = req.params.id.trim();
    if(ObjectId.isValid(reqId)){
      let reviews = await reviewDat.getAll(reqId);
      if(reviews.length == 0) {
        res.status(404).json({message: 'There are no reviews for this restaurant.'});
        return;
      }
      res.json(reviews);
    } else {
      res.status(400).json({message: 'Please enter a valid ID'})
      return;
    }
  } catch (e) {
    res.status(404).json({ message: `Restaurant with the ID ${reqId} does not exist in the database.`});
    return;
  }
});

router.get('/review/:id', async (req, res) => {
  try {
    reqId = req.params.id.trim();
    if(ObjectId.isValid(reqId)){
      let review = await reviewDat.get(reqId);
      res.json(review);
    } else {
      res.status(400).json({message: 'Please enter a valid ID'});
      return;
    }
  } catch (e) {
    res.status(404).json({ message: `The review with the ID ${reqId} is not present in the database.` });
    return;
  }
});

router.post('/:id', async (req, res) => {
  try {
    reqId = req.params.id.trim();
      if(ObjectId.isValid(reqId)){
        let {title, reviewer, rating, dateOfReview, review} = req.body;
        if(checkParams("Title", title, 'string', res)) return;
        if(checkParams("Reviewer", reviewer, 'string', res)) return;
        if(checkParams("Date of Review", dateOfReview, 'string', res)) return;
        if(checkParams("Review", review, 'string', res)) return;
        //Rating Validation
        if(rating < 1 || rating > 5){
          res.status(400).json({message: "Rating should be between 1 and 5"});
          return;
        } 

        if(!Number.isInteger(rating)) {
          res.status(400).json({message: "Rating should be an integer"});
          return;
        }
        //Date Validation
        let re = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
        if(re.test(dateOfReview)){
            let revDate = dateOfReview.split("/");
            let odd_months = [1,3,5,7,8,10,12];
            let even_months = [4,6,9,11];
            if (parseInt(revDate[0]) < 1 || parseInt(revDate[0]) > 12){
              res.status(400).json({message: "Enter a valid month from 1 to 12."});
              return;
            } 
            if(parseInt(revDate[0]) == 2 && (parseInt(revDate[1]) < 1 || parseInt(revDate[1]) > 28)){
              res.status(400).json({message: "February only has 28 days."});
              return;
            }
            if( even_months.includes(parseInt(revDate[0])) && (parseInt(revDate[1]) < 1 || parseInt(revDate[1]) > 30)) {
              res.status(400).json({message: "Apr (04), Jun (06), Sep (09) and Nov (11) have 30 days only."});
              return;
            }
            if (odd_months.includes(parseInt(revDate[0])) && (parseInt(revDate[1]) < 1 || parseInt(revDate[1]) > 31)) {
              res.status(400).json({message: "Jan (01), Mar (03), May (05), Jul (07), Aug (08), Oct (10) and Dec (12) have 31 days only."});
              return;
            }

            let today = new Date();
            let [month, day, year] = [today.getMonth(), today.getDate(), today.getFullYear()];
            if(month + 1 != revDate[0] || day != revDate[1] || year != revDate[2]) {
              res.status(400).json({message: "Please enter today's date."});
              return;
            }
        } else {
          res.status(400).json({message: "Please enter a valid date."});
          return;
        }
        
        let restaurant = await restMethods.get(reqId);
        if(restaurant){
          let restaurant = await reviewDat.create(reqId, title, reviewer, rating, dateOfReview, review);
          res.json(restaurant);
        } else {
          res.status(400).json({ message: `Restaurant with the ID ${reqId} does not exist in the database.` });
          return;
        }
      } else {
          res.status(400).json({message: 'Please enter a valid ID'})
          return;
      }
  } catch (e) {
    res.status(404).send({message: e});
  }
});

router.delete('/review/:id', async (req, res) => {
  try {
    reqId = req.params.id.trim();
    if(ObjectId.isValid(reqId)){
      let review = await reviewDat.remove(reqId);
      res.json(review);
    } else {
      res.status(404).json({message: 'Please enter a valid ID'});
      return;
    }
  } catch (e) {
    res.status(404).json({ message: `The review with the ID ${reqId} is not present in the database.` });
  }
});

module.exports = router;