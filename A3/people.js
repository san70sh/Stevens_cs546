const axios = require('axios');

async function getPeople(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data; // this will be the array of people objects
}



function checkParams(str, vbl) {
    if(typeof(str) !== 'string') throw `${vbl|| 'Given input'} is not of type string.`;
    if(str.trim().length == 0) throw "Given input must not be empty.";
}



async function getPersonById(id){
    let dat = await getPeople();
    let count = 0; resObj = {};
    checkParams(id,'Id');
    dat.forEach(element => {
        if(element.id == id){
            count = count + 1;
            resObj = element;
        }
    });
    if(count == 0) throw "There is no person associated with this ID.";
    else return resObj;
}


async function sameStreet(stName, stSuffix) {
let dat = await getPeople();
checkParams(stName,'The Street Name');
checkParams(stSuffix, 'The Street Suffix');
let pplArr = [];

dat.forEach(e => {
    if((e.address.home.street_name.toLowerCase() == stName.toLowerCase() && e.address.home.street_suffix.toLowerCase() == stSuffix.toLowerCase())
        || e.address.work.street_name.toLowerCase() == stName.toLowerCase() && e.address.work.street_suffix.toLowerCase() == stSuffix.toLowerCase()) {
            pplArr.push(e);
        }
})

if(pplArr.length < 2) throw "No two people live/work on the same street name and suffix.";
else return pplArr;
}


  async function manipulateSsn() {
    let dat = await getPeople();
    let ssnArr = [], ssnArrObj = {}, finalObj = {};
    const re = /-/ig;
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    dat.forEach(e => {
        let ssn = e.ssn;
        let tempObj = {};
        tempObj['firstName'] = e.first_name;
        tempObj['lastName'] = e.last_name;
        ssn = parseInt(ssn.replace(re,'').split('').sort().join(''));
        ssnArrObj[ssn] = tempObj;
        ssnArr.push(ssn);
    })
    ssnArr = ssnArr.sort((a,b) => a-b);
    let avg = ssnArr.reduce(reducer)/ssnArr.length;
    finalObj["lowest"] = ssnArrObj[ssnArr[0]];
    finalObj["highest"] = ssnArrObj[ssnArr[ssnArr.length-1]];
    finalObj["average"] = Math.floor(avg);
    return finalObj;
  }


async function sameBirthday(month, day) {
let dat = await getPeople();
let odd_months = [1,3,5,7,8,10,12];
let even_months = [4,6,9,11];
let dob, resArr = [];

if(month == undefined || day == undefined) throw "Please enter both month and date.";
if(typeof(month) === 'string' || typeof(day) === 'string') {
    if(isNaN(parseInt(month))) throw "Month is not a valid number";
    else month = parseInt(month, 10);
    if(isNaN(parseInt(day))) throw "Day is not a valid number";
    else day = parseInt(day, 10);
    console.log(month);
    console.log(day);
}

if (month < 1 || month > 12) throw "Enter a valid month from 1 to 12.";
else {
    if(month == 2 && (day < 1 || day > 28)) throw "February only has 28 days.";
    if(month in even_months && (day < 1 || day > 30)) throw "Apr (04), Jun (06), Sep (09) and Nov (11) have 30 days only.";
    if (month in odd_months && (day < 1 || day > 31)) throw "Jan (01), Mar (03), May (05), Jul (07), Aug (08), Oct (10) and Dec (12) have 31 days only.";
}

dat.forEach(e => {
    dob = e.date_of_birth.split('/');
    if(dob[0] == month && dob[1] == day) {
        resArr.push(`${e.first_name} ${e.last_name} ${dob}`);
    }
})

if(resArr.length == 0) throw "There are no people with this birthday.";
else return resArr;

}
module.exports = {
    getPeople,
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday

}