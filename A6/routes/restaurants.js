const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const data = require('../data');
const restDat = data.restaurants;

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

router.get('/', async (req, res) => {
  try {
    const restList = await restDat.getAll();
    res.json(restList);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
    try {
      let reqId = req.params.id.trim();
      //let re = /^[a-zA-Z0-9-]+$/;
      if(ObjectId.isValid(reqId)){
        let restaurant = await restDat.get(reqId);
        res.json(restaurant);
      } else {
        res.status(400).json({message: 'Please enter a valid ID'})
        return;
      }
    } catch (e) {
      res.status(404).json({ message: `Restaurant with the ID ${reqId} does not exist in the database.` });
    }
  });
  
router.post('/', async (req, res) => {
    try {
     
        let {name, location, phoneNumber, website, priceRange, cuisines, serviceOptions} = req.body;
        if(checkParams("Name", name, 'string', res)) return;
        if(checkParams("Location", location, 'string', res)) return;
        if(checkParams("Phone Number", phoneNumber, 'string', res)) return;
        if(checkParams("Website", website, 'string', res)) return;
        if(checkParams("Price Range", priceRange, 'string', res)) return;
        if(checkParams("Service Options", serviceOptions, 'object', res)) return;

        if (!cuisines || cuisines.length === 0){
          res.status(400).json({message: "You must provide at least one cuisine."});
          return;
        } 

        if (!Array.isArray(cuisines)) {
          res.status(400).json({message: "Cuisines must be an array."});
          return;
        }

        if (cuisines.some(e => {typeof(e) !== 'string' || e == undefined || e.trim().length == 0})) {
          res.status(400).json({message: "Please enter a valid string in cuisine."});
          return;
        }


        name = name.trim();
        location = location.trim();
        phoneNumber = phoneNumber.trim();
        website = website.trim();
        priceRange = priceRange.trim();
        
        
        //Phone Number Validation
        let re = /^\d{3}-\d{3}-\d{4}$/;
        if(!phoneNumber.match(re)){
          res.status(400).json({message: `${phoneNumber} is not a valid number`});
          return;
        } 

        //Website Validation
        let wbArr = website.split('.');
        let re2 = /^\w+$/;
        if(wbArr[0] !== "http://www" || (wbArr[1].length < 5 || !wbArr[1].match(re2)) || wbArr[2] !== "com") {
          res.status(400).json({message: `${website} is not a valid website.`});
          return;
        }

        //Price Range Validation
        if(priceRange.length > 4 || !priceRange.split('').every(e => e == "$")) {
          res.status(400).json({message: `${priceRange} is invalid.`});
          return;
        }

        //Service Options Validation
        let keyArr = Object.keys(serviceOptions);
        if(keyArr.length != 3 || !keyArr.includes("dineIn") || !keyArr.includes("takeOut") || !keyArr.includes("delivery")){
          res.status(400).json({message: "Please recheck the keys/length of the serviceOptions object."});
          return;
        } 
        if(typeof(serviceOptions.dineIn) != 'boolean' || typeof(serviceOptions.takeOut) != 'boolean' || typeof(serviceOptions.delivery) != 'boolean') {
          res.status(400).json({message: "The values of ServiceOptions must be of boolean type."});
          return;
        }
        let restaurant = await restDat.create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.json(restaurant);
      } catch (e) {
        console.log(e);
        res.status(500).send();
      }
});

router.delete('/:id', async (req, res) => {
    try {
        let reqId = req.params.id.trim();
        //let re = /^[a-zA-Z0-9-]+$/;
        if(ObjectId.isValid(reqId)){
          let restaurant = await restDat.remove(reqId);
          res.json(restaurant);
        } else {
          res.status(400).json({message: 'Please enter a valid ID'})
        }
      } catch (e) {
        console.log(e);
        res.status(404).json({ message: `Restaurant with the ID ${reqId} does not exist in the database.` });
      }
});

router.put('/:id', async (req, res) => {
    try {
      let reqId = req.params.id.trim();
      if(ObjectId.isValid(reqId)){
        let restaurant = await restDat.get(reqId);
        if(restaurant){
          let {name, location, phoneNumber, website, priceRange, cuisines, serviceOptions} = req.body;

          if (!cuisines || cuisines.length === 0){
            res.status(400).json({message: "You must provide at least one cuisine."});
            return;
          } 
  
          if (!Array.isArray(cuisines)) {
            res.status(400).json({message: "Cuisines must be an array."});
            return;
          }
  
          if (cuisines.some(e => {typeof(e) !== 'string' || e == undefined || e.trim().length == 0})) {
            res.status(400).json({message: "Please enter a valid string in cuisine."});
            return;
          }


          if(checkParams("Name", name, 'string')) return;
          if(checkParams("Location", location, 'string')) return;
          if(checkParams("Phone Number", phoneNumber, 'string')) return;
          if(checkParams("Website", website, 'string')) return;
          if(checkParams("Price Range", priceRange, 'string')) return;
          if(checkParams("Service Options", serviceOptions, 'object')) return;

          name = name.trim();
          location = location.trim();
          phoneNumber = phoneNumber.trim();
          website = website.trim();
          priceRange = priceRange.trim();

          //Phone Number Validation
        let re = /(\d{3})[-]?(\d{3})[-]?(\d{4})$/;
        if(!phoneNumber.match(re)) {
          res.status(400).json({message: `${phoneNumber} is not a valid number`});
          return;
        }
        //Website Validation
        let wbArr = website.split('.');
        let re2 = /^\w+$/;
        if(wbArr[0] !== "http://www" || (wbArr[1].length < 5 || !wbArr[1].match(re2)) || wbArr[2] !== "com") {
          res.status(400).json({message: `${website} is not a valid website.`});
          return;
        } 

        //Price Range Validation
        if(priceRange.length > 4 || !priceRange.split('').every(e => e == "$")) {
          res.status(400).json({message: `${priceRange} is invalid.`});
          return;
        } 

        //Service Options Validation
        let keyArr = Object.keys(serviceOptions);
        if(keyArr.length != 3 || !keyArr.includes("dineIn") || !keyArr.includes("takeOut") || !keyArr.includes("delivery")){
          res.status(400).json({message: "Please recheck the keys/length of the serviceOptions object."});
          return;
        } 
        if(typeof(serviceOptions.dineIn) != 'boolean' || typeof(serviceOptions.takeOut) != 'boolean' || typeof(serviceOptions.delivery) != 'boolean') {
          res.status(400).json({message: "The values of ServiceOptions must be of boolean type."});
          return;
        }
          let rest = await restDat.update(restaurant._id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
          res.json(rest);
        } else {
          res.status(404).json({message: `Restaurant with the ID ${reqId} does not exist in the database.`})  
          return;
        }
        
      } else {
        res.status(400).json({message: 'Please enter a valid ID'})
        return;
      }
    } catch (e) {
      res.status(404).json({ message: e });
    }
  });

module.exports = router;
