const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const {ObjectId} = require('mongodb');



function checkParams(label, data, type) {
    if(!data) throw `Please enter ${label}`;
    if(typeof(data) !== type) throw `${label} is not of type ${type}`;
    if(type === 'string') data = data.trim();
    if(data == '') throw `Please enter ${label}`;
    
}



async function create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
    //Cuisine Validation
    if (!cuisines || cuisines.length === 0) throw "You must provide at least one cuisine.";
    if (!Array.isArray(cuisines)) throw "Cuisines must be an array.";
    if (cuisines.some(e => {typeof(e) !== 'string' || e == undefined || e.trim().length == 0})) throw "Please enter a valid string in cuisine.";
    
    checkParams("Name", name, 'string');
    checkParams("Location", location, 'string');
    checkParams("Phone Number", phoneNumber, 'string');
    checkParams("Website", website, 'string');
    checkParams("Price Range", priceRange, 'string');
    checkParams("Service Options", serviceOptions, 'object');

    name = name.trim();
    location = location.trim();
    phoneNumber = phoneNumber.trim();
    website = website.trim();
    priceRange = priceRange.trim();
    
    
    //Phone Number Validation
    let re = /(\d{3})[-]?(\d{3})[-]?(\d{4})$/;
    if(!phoneNumber.match(re)) throw `${phoneNumber} is not a valid number`;

    //Website Validation
    let wbArr = website.split('.');
    let re2 = /^\w+$/;
    if(wbArr[0] !== "http://www" || (wbArr[1].length < 5 || !wbArr[1].match(re2)) || wbArr[2] !== "com") throw `${website} is not a valid website.`;

    //Price Range Validation
    if(priceRange.length > 4 || !priceRange.split('').every(e => e == "$")) throw `${priceRange} is invalid.`;

    //Service Options Validation
    let keyArr = Object.keys(serviceOptions);
    if(keyArr.length != 3 || !keyArr.includes("dineIn") || !keyArr.includes("takeOut") || !keyArr.includes("delivery")) throw "Please recheck the keys/length of the serviceOptions object.";
    if(typeof(serviceOptions.dineIn) != 'boolean' || typeof(serviceOptions.takeOut) != 'boolean' || typeof(serviceOptions.delivery) != 'boolean') throw "The values of ServiceOptions must be of boolean type.";

    const restaurantCollection = await restaurants();

    let newRestaurant = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: [...new Set(cuisines)],
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews: []
    };

    const insertInfo = await restaurantCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0) throw 'Restaurant could not be added.';

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
        if (restaurant === null) throw 'There is no restaurant with that ID.';
        restaurant["_id"] = restaurant["_id"].toString();
        restaurant.reviews.forEach(e=> {
            e._id = e._id.toString();
        })
        return restaurant;
    } else throw `${id} is not a valid ID`;
  }



  async function getAll() {
    const restaurantCollection = await restaurants();
    const restList = await restaurantCollection.find({ }).project({name: 1}).toArray();
    restList.forEach(e => {
        e._id = e._id.toString();
    });
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
                throw `The restaurant with ID ${id} could not be removed.`;
            } else {
                let resString = {"restaurantId": objId, "deleted": true};
                return resString;
            }
        } else throw `Restaurant with the ID ${id} does not exist in the database.`;
        
    } else throw `${id} is not a valid ID`;
  }

  async function update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
    

    //Cuisine Validation
    if (!cuisines || cuisines.length === 0) throw "You must provide at least one cuisine.";
    if (!Array.isArray(cuisines)) throw "Cuisines must be an array.";
    if (cuisines.some(e => {typeof(e) !== 'string' || e == undefined || e.trim().length == 0})) throw "Please enter a valid string in cuisine.";
    
    checkParams("ID", id, 'string');
    checkParams("Name", name, 'string');
    checkParams("Location", location, 'string');
    checkParams("Phone Number", phoneNumber, 'string');
    checkParams("Website", website, 'string');
    checkParams("Price Range", priceRange, 'string');
    checkParams("Service Options", serviceOptions, 'object');

    id = id.trim();
    name = name.trim();
    location = location.trim();
    phoneNumber = phoneNumber.trim();
    website = website.trim();
    priceRange = priceRange.trim();
    
    
    //Phone Number Validation
    let re = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if(!phoneNumber.match(re)) throw `${phoneNumber} is not a valid number`;

    //Website Validation
    let wbArr = website.split('.');
    let re2 = /^\w+$/;
    if(wbArr[0] !== "http://www" || (wbArr[1].length < 5 || !wbArr[1].match(re2)) || wbArr[2] !== "com") throw `${website} is not a valid website.`;

    //Price Range Validation
    if(priceRange.length > 4 || !priceRange.split('').every(e => e == "$")) throw `${priceRange} is invalid.`;

    //Service Options Validation
    let keyArr = Object.keys(serviceOptions);
    if(keyArr.length != 3 || !keyArr.includes("dineIn") || !keyArr.includes("takeOut") || !keyArr.includes("delivery")) throw "Please recheck the keys/length of the serviceOptions object.";
    if(typeof(serviceOptions.dineIn) != 'boolean' || typeof(serviceOptions.takeOut) != 'boolean' || typeof(serviceOptions.delivery) != 'boolean') throw "The values of ServiceOptions must be of boolean type.";


    if(ObjectId.isValid(id)){
        let objId = new ObjectId(id);
        const restaurantCollection = await restaurants();
        let restaurant = await get(id);
        if(restaurant){

            let existingCuisines = restaurant.cuisines;
            let cuisineEqual = (cuisines, existingCuisines) => {
                if (cuisines.length === existingCuisines.length) return false;
                let val = new Set([...cuisines, ...existingCuisines]);
                let cLen = 0, ecLen = 0;
                for (let v of val) {
                    cLen = cuisines.filter(e => e === v).length;
                    ecLen = existingCuisines.filter(e => e === v).length;
                    
                }
                if (cLen === ecLen) return false;
                else return true;
            }

            let eServiceOptions = restaurant.serviceOptions;
            let soEqual = (serviceOptions, eServiceOptions) => {
                if(serviceOptions.dineIn != eServiceOptions.dineIn || serviceOptions.takeOut != eServiceOptions.takeOut || serviceOptions.delivery != eServiceOptions.delivery) {
                    return true;
                } else return false;
            }

            restaurant.reviews.forEach(e => {
                e._id = new ObjectId(e._id);
            })

            if(restaurant.name != name || restaurant.location != location || restaurant.phoneNumber != phoneNumber
                || restaurant.website != website || restaurant.priceRange != priceRange || cuisineEqual(cuisines, existingCuisines) || soEqual(serviceOptions, eServiceOptions)) {
                    
                    let updatedRestaurant = {
                        name: name,
                        location: location,
                        phoneNumber: phoneNumber,
                        website: website,
                        priceRange: priceRange,
                        overallRating: restaurant.overallRating,
                        cuisines: [...new Set(cuisines)],
                        serviceOptions: serviceOptions,
                        reviews: restaurant.reviews
                    }
        
                    const restaurantUpdate = await restaurantCollection.replaceOne({ _id: objId }, updatedRestaurant);
                    
                    if (restaurantUpdate.modifiedCount === 0) {
                        throw `The restaurant with ID ${id} could not be removed.`;
                    } else {
                        const rest = await this.get(objId.toString());
                        return rest;
                    }
                } else throw "There is nothing to update.";
            
        } else throw `Restaurant with the ID ${id} does not exist in the database.`;
    } else throw `${id} is not a valid ID`;
  }

  module.exports = {
    create,
    get,
    getAll,
    remove,
    update
}

