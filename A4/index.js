const restaurants = require('./data/restaurants');
const connection = require('./config/mongoConnection');

async function main() {
 /*
    try {
        let copperChimney = await restaurants.create("The Copper Chimney", "Dar-Es-Salaam, Tanzania", "188-556-2900", "http://www.tcchimney.com", "$$", ["Indian", "English"], 3, {dineIn: true, takeOut: true, delivery: false});
        console.log("First restaurant is: ");
        console.log(copperChimney);
    } catch(e) {
        console.log(e.message);
    }

    try {
        let inn = await restaurants.create("The Inn","Leicestershire, Britain","456-789-0123","http://www.inngb.com","$$",["Bar", "Scottish" ],4,{dineIn: true, takeOut: false, delivery: false} );
        console.log("Second restaurant is:");
        console.log(inn);
    } catch(e) {
        console.log(e.message);
    }

    try {
        let restList = await restaurants.getAll();
        console.log("List of all restaurants:")
        console.log(restList);
    } catch(e) {
        console.log(e.message);
    }

    try {
        let sunMoon = await restaurants.create("Taiyo to Tsuki", "New York City, New York", "966-643-8012", "http://www.sunandmoon.com", "$", ["Japanese"], 5, {dineIn: true, takeOut: true, delivery: true});
        console.log("Third restaurant is: ");
        console.log(sunMoon);
    } catch(e) {
        console.log(e.message);
    }

    try{
        let restList = await restaurants.getAll();
        let tcc = await restaurants.rename(restList[0]["_id"].toString(), "http://www.thecopperchimney.com"); 
        console.log("First restaurant renamed: ");
        console.log(tcc); 
    } catch(e) {
        console.log(e.message);
    }  

    try{
        let restList = await restaurants.getAll();
        let innRem = await restaurants.remove(restList[1]["_id"].toString()); 
        console.log(innRem); 
    } catch(e) {
        console.log(e.message);
    }  

    try {
        let restList2 = await restaurants.getAll();
        console.log("List of all restaurants:")
        console.log(restList2);
    } catch(e) {
        console.log(e.message);
    }

    try {
        let sunMoon = await restaurants.create("Taiyo to Tsuki", "New York City, New York", "966-643-8012", "http://www.sunandmoon.com", 5, "$", {dineIn: true, takeOut: true, delivery: true});
        console.log("Third restaurant is: ");
        console.log(sunMoon);
    } catch(e) {
        console.log(e.message);
    }

    try{
        let innRem = await restaurants.remove("15ccfd220c28cc3748b264e4"); 
        console.log(innRem); 
    } catch(e) {
        console.log(e.message);
    }  

    try{
        let tcc = await restaurants.rename("15ccfd220c28cc3748b", "http://www.thecopperchimney.com"); 
        console.log(tcc); 
    } catch(e) {
        console.log(e.message);
    }  

    try{
        let restList = await restaurants.getAll();
        let tcc = await restaurants.rename(restList[1]["_id"].toString(), "http://www.thecopperchimney.org"); 
        console.log(tcc); 
    } catch(e) {
        console.log(e.message);
    }  

    try{
        let tcc = await restaurants.get("15ccfd220c28cc3748b264e4"); 
        console.log(tcc); 
    } catch(e) {
        console.log(e.message);
    }  

    let dbObj = await connection();
    dbObj["_connection"].close();
*/

    try {
        let restList2 = await restaurants.getAll();
        console.log("List of all restaurants:")
        console.log(restList2);
    } catch(e) {
        console.log(e.message);
    }

    let dbObj = await connection();
    dbObj["_connection"].close();
}

main();
