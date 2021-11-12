const axios = require('axios');
const pplMethods = require('./people');

async function getStock(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}


function checkParams(str, vbl) {
    if(str == undefined || str == '') throw "Please enter a value.";
    if(typeof(str) !== 'string') throw `${vbl|| 'Given input'} is not of type string.`;
    if(str.trim().length == 0) throw "Given input must not be empty.";
    
}


async function listShareholders() {
    let stkDat = await getStock();
    let pplDat = await pplMethods.getPeople();
    
    stkDat.forEach(el => {
        el.shareholders.forEach(ele => {
            usr = pplDat.find(i => i.id == ele.userId);
            ele["first_name"] = usr.first_name;
            ele["last_name"] = usr.last_name;
            delete ele.userId;
            
        });
    });

    return stkDat;
}

async function topShareholder (stkName) {
    let stkDat = await getStock();
    let pplDat = await pplMethods.getPeople();

    checkParams(stkName);
    stk = stkDat.find(i => i.stock_name == stkName);
    if(stk == undefined) throw `There is no stock associated with the company ${stkName}`;
    if(stk.shareholders.length > 0){
        stk.shareholders = stk.shareholders.sort((a,b) => b.number_of_shares - a.number_of_shares);
        stk.shareholders.forEach(ele => {
            usr = pplDat.find(i => i.id == ele.userId);
            ele["first_name"] = usr.first_name;
            ele["last_name"] = usr.last_name;
        });

        let resString = `With ${stk.shareholders[0].number_of_shares} shares in ${stkName}, ${stk.shareholders[0].first_name} ${stk.shareholders[0].last_name} is the top shareholder.`
        return resString;
    }   else return `${stkName} currently has no shareholders.`;
    
}


async function listStocks(firstName, lastName) {
    
    if(firstName == undefined || lastName == undefined) throw "Please enter both first name and last name.";
    checkParams(firstName);
    checkParams(lastName);
    
    let pplDat = await pplMethods.getPeople();
    let person = pplDat.find(e => e.first_name === firstName && e.last_name === lastName);
    if(person == undefined) throw `${firstName} ${lastName} is not present in the people.json file.`;

    let stkDat = await listShareholders();
    let stkArr = [];
    stkDat.forEach(e => {
        let tempObj = {};
        e.shareholders.forEach(el => {
            if(el.first_name === firstName && el.last_name === lastName) {
                tempObj["number_of_shares"] = el.number_of_shares;
                tempObj["stock_name"] = e.stock_name;
            }
        })
        if(Object.entries(tempObj).length > 0) stkArr.push(tempObj);
    })
    if(stkArr.length == 0) throw `${firstName} ${lastName} does not own any stock.`;
    return stkArr;
}

async function getStockById(id) {
    checkParams(id);
    let stkDat = await getStock();
    let stk = stkDat.find(e => e.id === id)
    if(stk == undefined) throw "There is no stock with this ID.";
    else return stk;
}

module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}