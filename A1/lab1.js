let checkNull = (arr) => {
    if (arr == undefined || arr.length == 0) {
        return false;
    }
    return true
}

const questionOne = function questionOne(arr) {

    let res1 = {}
    
    if(checkNull(arr)) {
        arr.forEach(x => {
            let b = Math.abs(Math.pow(x, 2) - 7)
            res1[b] = true
            for (let i = 2; i < Math.ceil(b / 2); i++) {
                if (b % i == 0) {
                    res1[b] = false
                }
            }
        });
    }
    return res1

}

const questionTwo = function questionTwo(arr) {
    let res2 = []
    if (checkNull(arr)){
        arr.forEach(x => {
            if (!res2.includes(x)) {
                res2.push(x)
            }
        })
    }
    return res2
}

const questionThree = function questionThree(arr) {
    let res3 = {}
    if (checkNull(arr)){
        let sortArr = questionTwo(arr).sort()
        let charSortArr = sortArr.map(x => x.split('').sort().join(''))
        let i = 0
        charSortArr.forEach(x => {
            if(!res3[x]){
                res3[x] = sortArr[charSortArr.indexOf(x)].split()

            } else{
                res3[x].push(sortArr[charSortArr.indexOf(x, i)])
            }
            i++
        })
        for (let x in res3){
            if(res3[x].length == 1){
                delete res3[x]
            }
        }
    }
    return res3
}

const questionFour = function questionFour(num1, num2, num3) {
    sum_of_fact = fact(num1) + fact(num2) + fact (num3)
    avg = (num1+num2+num3)/3
    res4 = Math.floor(sum_of_fact/avg)
    return res4
}

let fact = (num) => {
    if(num > 0){
        num = num * fact(num-1)
        return num
    } else {
        return 1
    }
}
module.exports = {
    firstName: "Bapiraju",
    lastName: "Vinnakota",
    studentId: "10475202",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};