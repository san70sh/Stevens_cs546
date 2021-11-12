const objMethods = require('./objUtils');
const arrMethods = require('./arrayUtils');
const strMethods = require('./stringUtils');


//average() test cases
/*
try{
    let a = [[1,2,3],[2,2,2],[3,3,3],'this'];
    let res = arrMethods.average(a);
    console.log(res);   //Output: Element (this) must be an array
} catch(e){
    console.log(e)
}

try{
    let a = [[1,2,3],[2,2,2],[3,3,3]];
    let res = arrMethods.average(a);
    console.log(res);   //Output: 2
} catch(e){
    console.log(e)
}

try {
    console.log(arrMethods.average());  //Output: Please enter a value.
} catch(err){
    console.log(err);
}

try{
    let a = [[],[2,2,2],[3,3,3]];   //Output: Array 1 is an empty array.
    let res = arrMethods.average(a);
    console.log(res);
} catch(e){
    console.log(e)
}

try{
    let a = ['this','is','fake'];
    let res = arrMethods.average(a);
    console.log(res);   //Output: Element (this) must be an array
} catch(e){
    console.log(e)
}

try {
    console.log(arrMethods.average([[ , ],[ , ]])); //Output: 0
} catch(err){
    console.log(err);
}


//modeSquared test cases:

try{
    //Positive
    let a = [7,7,1];
    let r = arrMethods.modeSquared(a);
    console.log(r); //Output: 50
} catch(e){
    console.log(e);
}

try{
    //Negative
    let a = [];
    let r = arrMethods.modeSquared(a);
    console.log(r); //Output: Input must not be an empty array.
} catch(e){
    console.log(e);
}

try{
    //Negative
    let a = [ ];
    let r = arrMethods.modeSquared(a);
    console.log(r); //Output: Input must not be an empty array.
} catch(e){
    console.log(e);
}

try{
    //No Mode
    let a = [2,1,3];
    let r = arrMethods.modeSquared(a);
    console.log(r); //Output: 0
} catch(e){
    console.log(e);
}

try{
    //Negative
    let a = [1,1,1,2,2,2,'what!',1];
    let r = arrMethods.modeSquared(a);
    console.log(r); //Output: what! must be of data type number
} catch(e){
    console.log(e);
}

try{
    //Positive
    let a = [1,1,2,2,3,3,3];
    let r = arrMethods.modeSquared(a);
    console.log(r); //Output: 9
} catch(e){
    console.log(e);
}
*/

//medianElement test cases:
/*
try{
    //Negative
    let a = [1,1,1,2,2,2,'what!',1];
    let r = arrMethods.medianElement(a);
    console.log(r); //Output: what! must be of data type number
} catch(e){
    console.log(e);
}

try{
    //Positive
    let a = [7,6,5,8,9,4];
    let r = arrMethods.medianElement(a);
    console.log(r); // Output: { '6.5': 0 }
} catch(e){
    console.log(e);
}

try{
    //Negative
    let a = ['#'];
    let r = arrMethods.medianElement(a);
    console.log(r); //Output: # must be of data type number
} catch(e){
    console.log(e);
}

try{
    //Negative
    let r = arrMethods.medianElement(5, 6, 7);
    console.log(r); //Output: This is not an array
} catch(e){
    console.log(e);
}

try{
    //Positive
    let a = [3,20,6,8,9];
    let r = arrMethods.medianElement(a);
    console.log(r); //Output: { '6': 1 }
} catch(e){
    console.log(e);
}

*/
//Merge Test Cases:
/*
try{
    //Positive
    let a = [6,6,6,3,4,'a',11];
    let b = ['a','b','p',1,'M', 'm'];
    let r = arrMethods.merge(a,b);
    console.log(r); //Output: ['a', 'a', 'b', 'm', 'p', 'M',  1,   3,   4,   6,   6,   6,  11]
} catch(e){
    console.log(e);
}

try{
    //Positive
    let a = ['A', 'B', 'a'];
    let b = [1, 2, 'Z','b'];
    let r = arrMethods.merge(a,b);
    console.log(r); //Output: ['a', 'b', 'A', 'B', 'Z', 1,   2]
} catch(e){
    console.log(e);
}

try{
    //Negative
    let r = arrMethods.merge([1,2]);
    console.log(r); //Output: Please enter valid parameters.
} catch(e){
    console.log(e);
}

try{
    //Negative
    let r = arrMethods.merge('b');
    console.log(r); //Output: Please enter valid parameters.
} catch(e){
    console.log(e);
}
*/

//sortString Test Cases
/*
try{
    //Positive
    r = strMethods.sortString('!213 FOO BAR'); 
    console.log(r); //Output: ABFOOR!123  
} catch(e){
    console.log(e);
}

try{
    //Negative
    r = strMethods.sortString('');
    console.log(r); //Output: Input must not be an empty string.
} catch(e){
    console.log(e);
}

try{
    //Negative
    r = strMethods.sortString();    //Output: Please enter a value.  
} catch(e){
    console.log(e);
}

try{
    //Negative
    r = strMethods.sortString(["Hello", "World"]);
    console.log(r); //Output: This is not a string. 
} catch(e){
    console.log(e);
}
*/

/*
//replaceChar Test Cases:

//Positive
try{
    r = strMethods.replaceChar("Daddy", 2);
    console.log(r); //Output: Daday
} catch(e){
    console.log(e);
}

//Negative
try{
    r = strMethods.replaceChar("foobar", 0);
    console.log(r); //Output: Index must not be the first or last values of the string.
} catch(e){
    console.log(e);
}


//Negative
try{
    r = strMethods.replaceChar("fi",1);
    console.log(r); //Output: Please enter a string of atleast three characters.
} catch(e){
    console.log(e);
}
*/

/*
//mashUp Test Cases:
//Positive
try{
    r = strMethods.mashUp("Patrick", "Hill", "$");
    console.log(r); //Output: PHaitlrli$c$k$
} catch(e){
    console.log(e);
}

//Positive
try{
    r = strMethods.mashUp("John","23456","8");
    console.log(r); //Output: Please enter a value.
} catch(e){
    console.log(e);
}

//Positive
try{
    r = strMethods.mashUp("h", "Hello",'g');
    console.log(r); //Output: hHgeglglgo
} catch(e){
    console.log(e);
}

//Negative
try{
    r = strMethods.mashUp();
    console.log(r); //Output: Please enter a value.
} catch(e){
    console.log(e);
}

//Negative
try{
    r = strMethods.mashUp("h","e");
    console.log(r); //Output: undefined is an invalid input.
} catch(e){
    console.log(e);
}
*/

// computeObjects Test Cases:

/*
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
const fourth = {a: 3, b: {x: 7, y: 10}};
try{
    //Positive
    const firstSecondThird = objMethods.computeObjects([first, second],x=>x+50);
    console.log(firstSecondThird); //Output: { x: 106, y: 53, a: 120, z: 55 }
} catch(e){
    console.log(e);
}

try{
    //Negative
    const firstSecondThird = objMethods.computeObjects([third, fourth],x=>x+50);
    console.log(firstSecondThird); //Output: The value {"x":7,"y":10} of the object [object Object] is not of type number.
} catch(e){
    console.log(e);
}
*/

/*
//commonKeys Test Cases:

    const third = {a: 2, b: {x: 7}};
    const fourth = {a: 3, b: {x: 7, y: 10}};
    const fifth = { a: 1, b: { x: 10 }, c: {} };
    const sixth = { a: 2, b: { x: 9, y: 9 }, c: {} };
try{
    //Positive
    console.log(objMethods.commonKeys(third, fourth)); // Output: { b: { x: 7 } }
} catch(e){
    console.log(e);
}

try{
    //Returns empty object
    console.log(objMethods.commonKeys({}, {})); // Output: {} 
} catch(e){
    console.log(e);
}

try{
    //Returns empty object
    console.log(objMethods.commonKeys(fifth,sixth)); // Output: { b: {}, c: {} }
} catch(e){
    console.log(e);
}

try{
    //Negative
    console.log(objMethods.commonKeys(sixth)); // Output: Please enter the second object.
} catch(e){
    console.log(e);
}
*/

/*
//flipObject Test Cases

try{
    //Positive
    r = objMethods.flipObject({ a: 3, b: 7, c: { x: 1 } });
    console.log(r); //Output: { '3': 'a', '7': 'b', c: { '1': 'x' } }
} catch(e){
    console.log(e);
}
*/
try{
    //Positive
    r = objMethods.flipObject({});
    console.log(r); //Output: { '3': 'a', '7': 'b', c: { '1': 'x' } }
} catch(e){
    console.log(e);
}
/*
try{
    //Positive
    r = objMethods.flipObject({ a: 3, b: 7, c: [5,6,4] });
    console.log(r); //Output: { '3': 'a', '4': 'c', '5': 'c', '6': 'c', '7': 'b' }
} catch(e){
    console.log(e);
}

try{
    //Negative
    r = objMethods.flipObject();
    console.log(r); //Output: undefined must be an object.
} catch(e){
    console.log(e);
}

try{
    //Negative
    r = objMethods.flipObject({ a: [], b: 7, c: [5,6,4] });
    console.log(r); //Null values are not allowed.
} catch(e){
    console.log(e);
}

*/