const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const {ObjectId} = require('mongodb');



function checkParams(label, data, type) {
    if(!data) throw new Error(`Please enter ${label}`)
    if(type === 'string') data = data.trim();
    if(data == '') throw new Error(`Please enter ${label}`);
    if(typeof(data) !== type) throw new Error(`${label} is not of type ${type}`);
}



async function create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions) {
    
    //Cuisine Validation
    if (!cuisines || cuisines.length === 0) throw new Error("You must provide at least one cuisine.");
    if (!Array.isArray(cuisines)) throw new Error("Cuisines must be an array.");
    if (cuisines.some(e => {typeof(e) !== 'string' || e == undefined || e.trim().length == 0})) throw new Error("Please enter a valid string in cuisine.");
    
    checkParams("Name", name, 'string');
    checkParams("Location", location, 'string');
    checkParams("Phone Number", phoneNumber, 'string');
    checkParams("Website", website, 'string');
    checkParams("Price Range", priceRange, 'string');
    checkParams("Overall Rating", overallRating, 'number');
    checkParams("Service Options", serviceOptions, 'object');

    name = name.trim();
    location = location.trim();
    phoneNumber = phoneNumber.trim();
    website = website.trim();
    priceRange = priceRange.trim();
    
    
    //Phone Number Validation
    let re = /(\d{3})[-]?(\d{3})[-]?(\d{4})$/;
    if(!phoneNumber.match(re)) throw new Error(`${phoneNumber} is not a valid number`);

    //Website Validation
    let wbArr = website.split('.');
    let re2 = /^\w+$/;
    if(wbArr[0] !== "http://www" || (wbArr[1].length < 5 || !wbArr[1].match(re2)) || wbArr[2] !== "com") throw new Error(`${website} is not a valid website.`);

    //Price Range Validation
    if(priceRange.length > 4 || !priceRange.split('').every(e => e == "$")) throw new Error(`${priceRange} is invalid.`);

    //Service Options Validation
    let keyArr = Object.keys(serviceOptions);
    if(keyArr.length != 3 || !keyArr.includes("dineIn") || !keyArr.includes("takeOut") || !keyArr.includes("delivery")) throw new Error("Please recheck the keys/length of the serviceOptions object.");
    if(typeof(serviceOptions.dineIn) != 'boolean' || typeof(serviceOptions.takeOut) != 'boolean' || typeof(serviceOptions.delivery) != 'boolean') throw new Error("The values of ServiceOptions must be of boolean type.");

    //Overall Rating Validation
    if(overallRating < 1 || overallRating > 5) throw new Error("Please enter a rating from 1 to 5.");

    const restaurantCollection = await restaurants();

    let newRestaurant = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: overallRating,
        serviceOptions: serviceOptions
    };

    const insertInfo = await restaurantCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0) throw new Error('Restaurant could not be added.');

    const newId = insertInfo.insertedId;
    const rest = await this.get(newId.toString());
    return rest;
  }



  async function get(id) {
    checkParams("ID", id, 'string');
    id = id.trim();
    

    if(ObjectId.isValid(id)){
        let objId = new ObjectId(id);
        const restaurantCollection = await restaurants();
        const restaurant = await restaurantCollection.findOne({ _id: objId });
        if (restaurant === null) throw new Error('There is no restaurant with that ID.');
        restaurant["_id"] = restaurant["_id"].toString()
        return restaurant;
    } else throw new Error(`${id} is not a valid ID`);
  }



  async function getAll() {
    const restaurantCollection = await restaurants();
    const restList = await restaurantCollection.find({}).toArray();
    restList.forEach(e => {e._id = e._id.toString()});
    return restList;
  }



  async function remove(id) {
    checkParams("ID", id, 'string');
    id = id.trim();
    
    if(ObjectId.isValid(id)){
        let objId = new ObjectId(id);
        const restaurantCollection = await restaurants();
        let restaurant = await get(id);
        if(restaurant){
            const restaurantDeletion = await restaurantCollection.deleteOne({ _id: objId });
            if (restaurantDeletion.deletedCount === 0) {
                throw new Error(`The restaurant with ID ${id} could not be removed.`);
            } else {
                let resString = `${restaurant.name || "Restaurant"} has been successfully deleted.`;
                return resString;
            }
        } else throw new Error(`Restaurant with the ID ${id} does not exist.`);
        
    } else throw new Error(`${id} is not a valid ID`);
  }


  async function rename(id, newWebsite) {
    checkParams("ID", id, 'string');
    checkParams("The new website", newWebsite, 'string');

    id = id.trim();
    newWebsite = newWebsite.trim();
    
    //Website Validation
    let wbArr = newWebsite.split('.');
    let re2 = /^\w+$/;
    if(wbArr[0] !== "http://www" || (wbArr[1].length < 5 || !wbArr[1].match(re2)) || wbArr[2] !== "com") throw new Error(`${newWebsite} is not a valid website.`);

    const restaurantCollection = await restaurants();
    let restaurant = await get(id);
    if(restaurant){
        if(restaurant.website === newWebsite) throw new Error("You are entering the same website.");
        
        const updatedRest = {
            website: newWebsite
        };
    
        const updatedInfo = await restaurantCollection.updateOne({ name: restaurant.name },{ $set: updatedRest });

        if (updatedInfo.modifiedCount === 0) {
            throw new Error('The restaurant couuld not be updated successfully');
        }
    } else throw new Error(`Restaurant with the ID ${id} does not exist.`);

    return await this.get(id);
  }

  module.exports = {
      create,
      get,
      getAll,
      remove,
      rename
  }