const lab1 = require("./lab1");

console.log(lab1.questionOne([2,5])); 
console.log(lab1.questionOne([      ])); 
console.log(lab1.questionOne([0,2,3,2,-2])); 
console.log(lab1.questionOne());
console.log(lab1.questionOne([0,0,0,0])); 
// should return and output: {'3': true} 

console.log(lab1.questionTwo([1, 2, 3, 2, 1])); 
console.log(lab1.questionTwo(['1', '1', '1', '1', 'b', 'a'])); 
console.log(lab1.questionTwo([1, '1', 1, '1', 2,]));
console.log(lab1.questionTwo([])); 
console.log(lab1.questionTwo()); 


console.log(lab1.questionThree(["bar", "car", "car", "arc"])); 
console.log(lab1.questionThree(["race", "care", "foo", "car", "arc", "acre"])); 
console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
console.log(lab1.questionThree([])); 
console.log(lab1.questionThree()); 

// should return and output: { acr: ["car", "arc"] }

console.log(lab1.questionFour(1, 3, 2)); 
console.log(lab1.questionFour(1, 1, 1)); 
console.log(lab1.questionFour(1, 0, 0));
console.log(lab1.questionFour(0, 0, 0));
console.log(lab1.questionFour(-1,2,-18));
// should return and output: 4