const pplMethods = require('./people');
const stkMethods = require('./stocks');

async function main(){
    /*
    try{
        let res = await pplMethods.getPersonById('c6af2484-2868-4170-82da-c752527d67a8');
        console.log(res);
    } catch(e){
        console.log(e);
    }


    try{
        let res = await pplMethods.sameStreet("Sutherland", "Point");
        console.dir(res, {depth: null});
    } catch(e){
        console.log(e);
    }

*/
    try{
        let res = await pplMethods.manipulateSsn();
        console.dir(res, {depth: null});
    } catch(e){
        console.log(e);
    }
/*
    try{
        let res = await pplMethods.sameBirthday('01','030');
        console.log(res);
    } catch(e){
        console.log(e);
    }

    try{
        let res = await pplMethods.sameBirthday("6","9");
        console.log(res);
    } catch(e){
        console.log(e);
    }
 

    try{
        let res = await stkMethods.listShareholders('7283e5d6-7481-41cb-83b3-5a4a2da34717');
        console.dir(res, {depth: null});
    } catch(e){
        console.log(e);
    }

    try{
        let res = await stkMethods.topShareholder();
        console.dir(res, {depth: null});
    } catch(e){
        console.log(e);
    }
    

    try{
        let res = await stkMethods.listStocks("Grenville", "Pawelke");
        console.dir(res, {depth: null});
    } catch(e){
        console.log(e);
    }

    try{
        let res = await stkMethods.getStockById("7989fa5e-5617-43f7-a931-46036f9dbcff");
        console.dir(res, {depth: null});
    } catch(e){
        console.log(e);
    }
    */
}

main();