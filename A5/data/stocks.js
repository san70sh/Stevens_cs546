const axios = require('axios');

async function getStock(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data;
}

async function getStockById(id) {
    let stkDat = await getStock();
    let stk = stkDat.find(e => e.id === id)
    if(stk == undefined) throw new Error("There is no stock with this ID.");
    else return stk;
}

module.exports = {
    getStock,
    getStockById
}