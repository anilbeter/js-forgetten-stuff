'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(0, 2)); // (2) ['a', 'b']
console.log(arr.slice(-1)); // ['e']

// Create shallow copy of original array
console.log(arr.slice()); // (5) ['a', 'b', 'c', 'd', 'e']

// SPLICE (too similar to slice method, big difference is splice method mutates original array)
console.log(arr.splice(2)); // (3) ['c', 'd', 'e']
arr.splice(-1);
console.log(arr); // (2) ['c', 'd']

let anilFavs = ['blue', 'Ilayda', 'ocean', 23, 'L.A.'];
// Start index 1, and delete 2 elements (index 1 includes)
anilFavs.splice(1, 2);
console.log(anilFavs); // (3) ['blue', 23, 'L.A.']

// REVERSE (mutate original array)
anilFavs = ['blue', 'Ilayda', 'ocean', 23, 'L.A.'];
console.log(anilFavs.reverse()); // (5) ['L.A.', 23, 'ocean', 'Ilayda', 'blue']
console.log(anilFavs); // (5) ['L.A.', 23, 'ocean', 'Ilayda', 'blue']

// CONCAT
const cities = ['L.A.', 'New York', 'Houston', 'San Frascisco'];
const nums = [23, 26, 15];
console.log(cities.concat(nums)); // (7) ['L.A.', 'New York', 'Houston', 'San Frascisco', 23, 26, 15]

// JOIN
console.log(cities.join(', ')); // L.A., New York, Houston, San Frascisco

// At method

const arr = [23, 11, 64];
console.log(arr[0]); // 23

// with new at method
console.log(arr.at(0)); // 23
// even works with strings
console.log('Anil'.at(0)); // A

// Getting last array element
console.log(arr[arr.length - 1]); // 64
console.log(arr.slice(-1)); // [64]
// much way better/newer way with at:
console.log(arr.at(-1)); // 64

*/
// Looping Arrays: forEach method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for of loop
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
// Movement 1: You deposited 200
// Movement 2: You deposited 450
// ...

// function (movement-current element-, index, array)
// Order is TOO IMPORTANT!
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
