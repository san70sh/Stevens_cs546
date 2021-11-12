function checkObj(obj) {
    if(typeof(obj) !== "object") throw ` ${obj} must be an object.`;
}

function computeObjects(objArr, func){

    if(!Array.isArray(objArr)) throw `${objArr} is not of type Array.`;
    if(objArr.length == 0) throw "The array needs to have atleast 1 object.";
    if(func == '' || func == undefined) throw "Please enter a function.";
    if(! func instanceof Function) throw `The second parameter: ${func} is not of type Function`;
    let valArr = [], keyArr = [];
    let finalObj = {};

    objArr.forEach((e, i) => {
        checkObj(e);
        if(Object.keys(e).length == 0) throw `Element at Index ${i} is an empty object.`;
        keyArr = Object.keys(e);
        valArr = Object.values(e);
        valArr.forEach((val, idx) => {
            if(typeof(val) !== "number") throw `The value ${JSON.stringify(val)} is not of type number.`;
            let res = func(val);
            if(Object.keys(finalObj).includes(keyArr[idx])){
                finalObj[keyArr[idx]] = finalObj[keyArr[idx]] + res;
            } else {
                finalObj[keyArr[idx]] = res;
            }
        });
    })

    return finalObj;
}


function commonKeys(obj1, obj2){
    if(obj1 == '' || obj1 == undefined) throw "Please enter the first object.";
    if(obj2 == '' || obj2 == undefined) throw "Please enter the second object.";
    checkObj(obj1);
    checkObj(obj2);
    
    let finalObj = {}, innerObj = {}, count = 0; keyVal = 0;

    for(let p in obj1){
        for (let prop in obj2){
            if(p === prop) {
                let val_obj1 = obj1[p];
                let val_obj2 = obj2[p];
                if(val_obj2 instanceof Object && val_obj1 instanceof Object){
                    innerObj = commonKeys(val_obj1,val_obj2);
                    count = count+1;
                }
                
                if(count == 0) {
                    if(val_obj1 === val_obj2 && !Object.keys(finalObj).includes(p)){
                        finalObj[p] = val_obj1;
                        keyVal = keyVal + 1;

                    } 
                } else {
                    finalObj[p] = innerObj;
                }
                
            }
        }
    }
    if(keyVal == 0) finalObj = {};
    
    return finalObj;
}

function flipObject(obj){
    checkObj(obj);
    if(obj == '' || obj == undefined) throw "Please enter an object.";
    
    let swapObj = {};

    for (let prop in obj) {
        if(typeof(obj[prop]) == undefined || obj[prop] == "") throw "Null values are not allowed."
        if(typeof(obj[prop]) !== "object") {
            swapObj[obj[prop]] = prop;
        }
        if(Array.isArray(obj[prop])){
            let flipArr = obj[prop];
            if(flipArr.length == 0) throw "Empty arrays are invalid."
            else {
                flipArr.forEach(e => {
                    swapObj[e] = prop;
                })
            }
        }

        if(typeof obj[prop] == "object" && !Array.isArray(obj[prop])){
            let innerFlipObj = flipObject(obj[prop]);
            swapObj[prop] = innerFlipObj;
        }

    }

    return swapObj;
}

module.exports = {
    computeObjects,
    commonKeys,
    flipObject
}