const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const restMethods = require('./restaurants');
const {ObjectId} = require('mongodb');



function checkParams(label, data, type) {
    if(!data) throw `Please enter ${label}`
    if(typeof(data) !== type) throw `${label} is not of type ${type}`;
    if(type === 'string') data = data.trim();
    if(data == '') throw `Please enter ${label}`;
}

async function updateRating(restId) {
    const restCol = await restaurants();
    let restaurant = await restMethods.get(restId);
    let oRat = 0, avgRat = 0, revLen = restaurant.reviews.length;
    if(revLen == 0) avgRat = 0;
    else {
        restaurant.reviews.forEach(e => {oRat = oRat + e.rating});
        avgRat = oRat/revLen;

        if(!Number.isInteger(avgRat)) avgRat = parseFloat(+avgRat.toFixed(2));
    }
    let id = new ObjectId(restaurant._id);
    restaurant.overallRating = avgRat;
    let res = await restCol.updateOne({ _id: id }, { $set: { overallRating: avgRat } });

    
}

async function create(restaurantId, title, reviewer, rating, dateOfReview, review) {

    checkParams("Restaurant ID", restaurantId, 'string');
    checkParams("Title", title, 'string');
    checkParams("Reviewer", reviewer, 'string');
    checkParams("Date of Review", dateOfReview, 'string');
    checkParams("Review", review, 'string');
    //Rating Validation
    if(rating < 1 || rating > 5){
        throw "Rating should be between 1 and 5";
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
        if (parseInt(revDate[0]) < 1 || parseInt(revDate[0]) > 12) throw "Enter a valid month from 1 to 12.";
        if (parseInt(revDate[0]) == 2 && (parseInt(revDate[1]) < 1 || parseInt(revDate[1]) > 28)) throw "February only has 28 days.";
        if (even_months.includes(parseInt(revDate[0])) && (parseInt(revDate[1]) < 1 || parseInt(revDate[1]) > 30)) throw "Apr (04), Jun (06), Sep (09) and Nov (11) have 30 days only.";
        if (odd_months.includes(parseInt(revDate[0])) && (parseInt(revDate[1]) < 1 || parseInt(revDate[1]) > 31)) throw "Jan (01), Mar (03), May (05), Jul (07), Aug (08), Oct (10) and Dec (12) have 31 days only.";
        let today = new Date();
        let [month, day, year] = [today.getMonth(), today.getDate(), today.getFullYear()];
        if(month + 1 != revDate[0] || day != revDate[1] || year != revDate[2]) {
            throw "Please enter today's date.";
            return;
        }
    } else {
        throw "Please enter a valid date.";
        return;
    }

    let newReview = {
        _id: new ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review

    };
    if(ObjectId.isValid(restaurantId)) {
        const restCol = await restaurants();
        let restaurant = await restMethods.get(restaurantId);
        if(restaurant){
            restaurantId = new ObjectId(restaurantId);
            const restaurantUpdate = await restCol.updateOne({ _id: restaurantId }, { $push: { reviews: newReview } });
            if (restaurantUpdate.modifiedCount === 0) {
                throw `The restaurant with ID ${restaurantId} could not be updated.`;
            } else {
                await updateRating(restaurantId.toString());
                const rest = await restMethods.get(restaurantId.toString());
                rest.reviews.forEach(e => {
                    e["_id"] = e["_id"].toString();
                });
                return rest;
            }
        } else throw `Restaurant with the ID ${id} does not exist in the database.`;
        
    } else throw `${id} is not a valid ID`;
}

async function get(reviewId){
    checkParams("Review ID", reviewId, 'string');

    if(ObjectId.isValid(reviewId)) {
        let restCol = await restaurants();
        let revId = new ObjectId(reviewId);
        let rest = await restCol.find({ "reviews._id" : revId } ).project({_id: 0, reviews: 1}).toArray();
        if(rest.length != 0){
            let revw = rest[0].reviews.find(e => e._id.equals(revId));
            return revw;
        } else throw `The review with the ID ${reviewId} is not present in the database.`;
        
    }
}

async function getAll(restaurantId){
    checkParams("Restaurant ID", restaurantId, 'string');
    if(ObjectId.isValid(restaurantId)) {
        let restaurant = await restMethods.get(restaurantId);
        if(restaurant) {
            return restaurant.reviews;
        } else throw `Restaurant with the ID ${id} does not exist in the database.`; 
    }else throw `${id} is not a valid ID`;
}

async function remove(reviewId) {
    checkParams("Review ID", reviewId, 'string');

    if(ObjectId.isValid(reviewId)) {
        const restCol = await restaurants();
        let revId = new ObjectId(reviewId);
        let restaurant = await restCol.find({ 'reviews._id' : { $eq:revId } }).project().toArray();
        const rest = await restCol.updateMany({ }, {$pull: { reviews: {_id: revId } } } )

        await updateRating(restaurant[0]._id.toString());
        if(rest.modifiedCount === 0){
            throw `The review with ID ${reviewId} could not be removed.`;
            return;
        } else {
            let rev = {"reviewId" : reviewId.toString(), "deleted": true};
            return rev; 
        }

    }

}

module.exports = {
    create,
    get,
    getAll,
    remove
}