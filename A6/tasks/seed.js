const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const restaurants = data.restaurants;
const reviews = data.reviews;

async function main() {
    let dbObj = await dbConnection();
    await dbObj["_db"].dropDatabase();

    let rest1 = await restaurants.create("The Copper Chimney", "Dar-Es-Salaam, Tanzania", "188-556-2900", "http://www.tcchimney.com", "$$", ["Indian", "English"], {dineIn: true, takeOut: true, delivery: false});
    let rest2 = await restaurants.create("The Inn","Leicestershire, Britain","456-789-0123","http://www.inngb.com","$$",["Bar", "Scottish" ],{dineIn: true, takeOut: false, delivery: false} );
    let rest3 = await restaurants.create("Taiyo to Tsuki", "New York City, New York", "966-643-8012", "http://www.sunandmoon.com", "$", ["Japanese"], {dineIn: true, takeOut: true, delivery: true});

    let today = new Date(Date.now()).toLocaleString().split(',')[0];
    await reviews.create(rest1._id, "This place was great!", "scaredycat", 4, today.toString(), "The food is delicious, but the management can do more.");
    await reviews.create(rest3._id, "Garbage delivery!", "superdog", 1, today.toString(), "The delivery was garbage.");
    await reviews.create(rest3._id, "Hype Max!", "honestyisthebestpolicy", 3, today.toString(), "The food was not bad, but the place was hyped up too much.");
    await reviews.create(rest1._id, "Great Management!", "powerrangersblueranger", 5, today.toString(), "The management is very courteous.");

    console.log('Done seeding database');
    await dbObj["_connection"].close();
}

main();