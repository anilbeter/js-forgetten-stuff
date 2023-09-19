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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements) {
  // containerMovements is not empty atm. It has 2 movements__row from index.html but those are just template or place holder elements. I need to rid out those elements. So first, I need to clear my container before insert html elements w/ insertAdjacentHTML from our so-called data(hehe).
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    // IMPORTANT create html
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type.toUpperCase()}</div>
        <div class="movements__value">${mov}</div>
    </div>
      `;

    // <div class="movements">
    //  <div class="movements__row">
    //  ---> movements (containerMovements) parent, I'd want to store my movement__row's inside of containerMovements
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // WHY afterbegin -> Just inside the element, before its first child. So order/sorting will be like newest movement to oldest movement
  });
};
displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

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


// Looping Arrays: forEach method



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
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
// Movement 1: You deposited 200
// Movement 2: You deposited 450
// ...



// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// Set(3) {'USD', 'GBP', 'EUR'}

// _ means in parameter -> compeletly unnecessary
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
// USD: USD
// GBP: GBP
// EUR: EUR


// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function (julia, kate) {
  const shallowCopyJulia = julia.slice();
  const splicedJulia = shallowCopyJulia.splice(1, 2);
  const totalData = splicedJulia.concat(kate);
  totalData.forEach((age, i) => {
    if (age >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still puppy (${age})`);
    }
  });
};
checkDogs(dogsJulia, dogsKate);


// Map method
const movementsArr = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const convertedMovs = movementsArr.map(function (mov) {
  return Math.trunc(mov * eurToUsd);
});
console.log(convertedMovs);
// (8) [220, 495, -440, 3300, -715, -143, 77, 1430]

// with for of loop
const forArr = [];
for (const mov of movementsArr) {
  forArr.push(Math.trunc(mov * eurToUsd));
}
console.log(forArr);
// (8) [220, 495, -440, 3300, -715, -143, 77, 1430]

// Map method with arrow function
const movsUSD = movementsArr.map(mov => Math.trunc(mov * eurToUsd));
console.log(movsUSD);
// (8) [220, 495, -440, 3300, -715, -143, 77, 1430]

const movementsDescriptions = movementsArr.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
// (8) ['Movement 1: You deposited 200', 'Movement 2: You deposited 450', 'Movement 3: You withdrew 400', 'Movement 4: You deposited 3000', 'Movement 5: You withdrew 650', 'Movement 6: You withdrew 130', 'Movement 7: You deposited 70', 'Movement 8: You deposited 1300']
*/
