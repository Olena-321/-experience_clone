
let re = /[^Aa]{6,}/g;

console.log(re.test("Hello Teacher"));      // true  (немає A/a)
console.log(re.test("BBBBBB"));     // true
console.log(re.test("aaBBBFHJBB"));   // false (є a)
console.log(re.test("Ananas"));     // false (є A та a)
console.log(re.test("1234567"));    // true


var arr = [
    {
        userName:"Test",
        lastName:"Test",
        email:"test.test@gmail.com"
    },
    {
        userName:"Dmitro",
        lastName:"Porohov",
        email:"dmitro.porohov@yahoo.com"
    },
    {
        userName:"Andrii",
        lastName:"",
        email:"andrii@mail.ru"
    },
];

var trustedEmails = [];

for (var i = 0; i < arr.length; i++) {
    var email = arr[i].email;
    if (/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)?@(gmail\.com|yahoo\.com)$/.test(email)) {
        trustedEmails.push(email);
    }
}

console.log(trustedEmails);