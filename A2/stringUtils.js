function checkParams(str) {
    if(str == undefined) throw "Please enter a value.";
    if(typeof(str) !== "string") throw "This is not a string";
}

function checkLength (val) {
    if(val.length == 0) throw "Input must not be an empty string.";
}

function cmp(a,b){
    if(a > b){
        return 1;
    } else {
        return -1
    }
}

function sortString(str) {
    checkParams(str);
    checkLength(str.trim());
    let lowerCaseArr = [], upperCaseArr = [], num = [], spChar = [], blank = [];

    str.split('').forEach(e => {
        if(e.charCodeAt() == 32) blank.push(e);
        else if(e.charCodeAt() > 64 && e.charCodeAt() < 90) upperCaseArr.push(e);
        else if(e.charCodeAt() > 96 && e.charCodeAt() < 122) lowerCaseArr.push(e);
        else if(e.charCodeAt() > 47 && e.charCodeAt() < 57) num.push(e);
        else spChar.push(e);
    })

    upperCaseArr = upperCaseArr.sort(cmp);
    lowerCaseArr = lowerCaseArr.sort(cmp);
    num = num.sort(cmp);

    let res1 = upperCaseArr.join('').concat(lowerCaseArr.join(''),spChar.join(''),num.join(''),blank.join(''));
    return res1;
}

function replaceChar(str, idx){
    checkParams(str);
    checkLength(str.trim());
    if(typeof(idx) !== "number") throw "Index Input must be a number.";
    if(idx > str.length) throw "Index is out of range.";
    if(str.length < 3) throw "Please enter a string of atleast three characters.";
    if(idx <= 0 || idx > str.length - 2) throw "Index must not be the first or last values of the string.";

    let strArray = str.split('');
    let b_idx = strArray[idx-1];
    let a_idx = strArray[idx+1];
    let count = 1;
    
    strArray.forEach((e, i) => {
        if(e === strArray[idx] && i != idx){
            if(count % 2 != 0) {
                strArray[i] = b_idx;
                count = count + 1;
            } else {
                strArray[i] = a_idx;
                count = count + 1;
            } 
        }
    })

    if(count == 1) throw `There is no other character like ${strArray[idx]} in the array.`

    let res2 = strArray.join('');
    return res2;
}

function mashUp(str1, str2, char){
    checkParams(str1);
    checkLength(str1.trim());
    checkParams(str2);
    checkLength(str2.trim());
    if(typeof(char) !== "string" || char.trim().length != 1) throw `${char} is an invalid input.`;

    let charCount = 0, strArray = [], ct = 0; 
    if(str1.length != str2.length){
        if(str1.length > str2.length){
            charCount = str1.length - str2.length;
            str2 = str2.concat(char.repeat(charCount));
        } else {
            charCount = str2.length - str1.length;
            str1 = str1.concat(char.repeat(charCount));
        }
    }
    
    while (ct < str1.length){
        strArray.push(str1[ct]);
        strArray.push(str2[ct]);
        ct = ct + 1;
    }

    return strArray.join('');

}

module.exports = {
    sortString,
    replaceChar,
    mashUp
}