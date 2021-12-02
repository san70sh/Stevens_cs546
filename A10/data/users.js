const mongoCollections = require('../config/mongoCollections');
const usrs = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;

function CustomError (status, message) {
    this.status = status;
    this.message = message;
}

async function createUser(username, password) {
    //Username validation
    let re = /^[a-z0-9]*$/im
    if(username == "" || username == undefined) throw new CustomError(400,"Please enter your username.");
    if(username.length < 4) throw new CustomError(400,"The username is too short.");
    if(!re.test(username)) throw new CustomError(400,`${username} is not a valid username.`);
    
    username = username.toLowerCase();

    //password validation
    let re2 = /\s/i
    if(!password) throw `Please enter your password`;
    if(re2.test(password)) throw new CustomError(400,"Spaces are not allowed in passwords.");
    if(password.length < 6) throw new CustomError(400,"Password is too short.");

    const usrCollection = await usrs();
    let dupUser = await usrCollection.findOne({"username": username})
    if(dupUser == null){
        let newUser = {
            username: username,
            password: await bcrypt.hash(password, saltRounds)
        }

        const insertInfo = await usrCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) {
            throw new CustomError(500,'Internal Server Error');
        } else {
            let returnObj = {"userInserted": true};
            return returnObj;
        }
    } else {
        throw new CustomError(400,`Username with ${username} already exists in the database.`);
    } 

}

async function checkUser(username, password) {
    //Username validation
    let re = /^[a-z0-9]*$/im
    if(username == "" || username == undefined) throw new CustomError(400,"Please enter your username.");
    if(username.length < 4) throw new CustomError(400,"The username is too short.");
    if(!re.test(username)) throw new CustomError(400,`${username} is not a valid username.`);
    username = username.toLowerCase();

    //password validation
    let re2 = /\s/i
    if(!password) throw new CustomError(400, `Please enter your password`);
    if(re2.test(password)) throw new CustomError(400,"Spaces are not allowed in passwords.");
    if(password.length < 6) throw new CustomError(400,"Password is too short.");

    const usrCollection = await usrs();
    let validateUser = await usrCollection.findOne({"username": username})
    if(validateUser == null) throw new CustomError(400,"Either the username or password is invalid");
    else {
        if(await bcrypt.compare(password, validateUser.password)){
            let returnObj = {"authenticated": true};
            return returnObj;
        } else throw new CustomError(400,"Either the username or password is invalid");
    }
}
module.exports = {
    createUser,
    checkUser
}