//Варіант 1

function pow(x,y) {
    let result = x 
for (let i=1; i<y; i++) {
result = result * x /* Tекущее значение переменной result умножить на x,
затем положить обратно это новое значение в result*/
}
return result
}
console.log(pow(2,3))


/*Варіант 2

let pow=function (x,y) {
    let result = x 
for (let i=1; i<y; i++) {
result = result*x
}
return result
}
console.log(pow(2, 3))

Варіант 3

function pow(x,y) {
    let result = 1
    for (let i=0; i<y; i++){
        result= result * x
}
return result
}
console.log(pow(2,3))*/