function checkParams(valArr) {
    if(valArr == undefined) throw "Please enter a value.";
    if(!Array.isArray(valArr)) throw "This is not an array";
}

function checkIfNumber (val) {
    if(typeof(val) !== "number") throw `${val || 'Required variable'} must be of data type number`;
}

function checkLength (val) {
    if(val.length == 0) throw "Input must not be an empty array.";
}

function numCmp(a,b){
    if(a > b){
        return 1;
    } else {
        return -1
    }
}

function average(arrOfArray) {
    let finArr = [];
    let res1 = 0;
    checkParams(arrOfArray);
    checkLength(arrOfArray);
    arrOfArray.forEach((element,i) => {
        if(!Array.isArray(element)) throw `Element (${element}) must be an array`;
        if(element.length == 0) throw `Array ${i+1} is an empty array.`;
        finArr = finArr.concat(element);
    });
    
    if(finArr.length > 0){
        res1 = finArr.reduce((prevVal, currVal) => prevVal + currVal,0);
        res1 = Math.round(res1/finArr.length);

    } else throw "Invalid Array";

    return res1;
}


function modeSquared(arr){
    checkParams(arr);
    if(arr.length == 0) throw "Input must not be an empty array.";
    let count = 1, temp = 0, res2 = 0;
    let mode = [];

    let sortArr = arr.sort();
    sortArr.forEach((e, i) => {
        checkIfNumber(e);
        if(i == 0){
            mode.push(e);
            temp = temp + 1;
        } else {
            if(e == sortArr[i-1]){
                temp = temp + 1;
            } else {
                count = temp;
                temp = 1;
            }

            if (temp > count){
                mode = [];
                mode.push(e);
            }

            if(count != 1 && temp == count){
                mode.push(e);
            }
        }
    })
    if(count > 1){
        mode.forEach(el => {
            res2 = res2 + Math.pow(el,2);
        })    
    } else res2 = 0;
    
    return res2;
    
}

function medianElement(arr) {
    checkParams(arr);
    checkLength(arr);

    let res3 = {};
    let sortArr = arr.slice().sort();
    let median = 0, arrLength = sortArr.length;
    
    if(arrLength % 2 == 0){
        sortArr.forEach((e,i) => {
            checkIfNumber(e);
            if(i == (arrLength/2 - 1)){
                median = (e + sortArr[i+1]) / 2;
                res3[median] = arr.indexOf(sortArr[i+1]);
            }
        })
    } else {
        sortArr.forEach((e,i) => {
            checkIfNumber(e);
            if(i == Math.floor(arrLength/2)){
                median = e;
                res3[median] = arr.indexOf(median);
            }
        })
    }

    return res3;
}

function merge(arr1, arr2){
    
    if(arr1 == "" || arr1 == undefined || arr2 == "" || arr2 == undefined) throw "Please enter valid parameters.";
    checkParams(arr1);
    checkParams(arr2);
    checkLength(arr1);
    checkLength(arr2);

    let numArr = [], lowerCaseArr = [], upperCaseArr = [], charArr = [], finalArr = [], mergeArr = [];

    mergeArr = arr1.concat(arr2);
    mergeArr.forEach(e => {
        if (typeof(e) === "string" && e.split('').length == 1){
            if(e.charCodeAt() > 64 && e.charCodeAt() < 91){
                upperCaseArr.push(e);
            } else if (e.charCodeAt() > 96 && e.charCodeAt() < 123) {
                lowerCaseArr.push(e); 
            }else throw "It is not an alphabet."
        }
        else if(typeof(e) === "number"){
            numArr.push(e);
        } else {
            throw `"${e}" is not a valid data type`;
        }
    })
    lowerCaseArr = lowerCaseArr.sort(numCmp);
    upperCaseArr = upperCaseArr.sort(numCmp);
    numArr = numArr.sort(numCmp);
    charArr = lowerCaseArr.concat(upperCaseArr);
    finalArr = charArr.concat(numArr); 
    return finalArr;
}

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
}