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
        <div class="movements__value">${mov}€</div>
    </div>
      `;

    // <div class="movements">
    //  <div class="movements__row">
    //  ---> movements (containerMovements) parent, I'd want to store my movement__row's inside of containerMovements
    containerMovements.insertAdjacentHTML('afterbegin', html);
    // WHY afterbegin -> Just inside the element, before its first child. So order/sorting will be like newest movement to oldest movement
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // acc.balance = balance;
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((interest, i, arr) => {
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

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

// Refactoring
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // prevent form from submitting

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // ?. -> check for currentAcount exist or not
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;

    // clear fields
    inputClosePin.value = inputCloseUsername.value = '';

    // change welcome message
    labelWelcome.textContent = 'Log in to get started';
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURE

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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


const movementsArray = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movementsArray.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);
// (5) [200, 450, 3000, 70, 1300]

const withdrawals = movementsArray.filter(mov => mov < 0);
console.log(withdrawals);
// (3) [-400, -650, -130]


console.log(movements);
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]

// accumulator -> SNOWBALL
const balance = movements.reduce(function (accumulator, current, i, arr) {
  console.log(
    `Iteration ${i}: Accumulator: ${accumulator} Current: ${current}`
  );
  return accumulator + current;
}, 0);
console.log(balance);
// Iteration 0: Accumulator: 0 Current: 200
// Iteration 1: Accumulator: 200 Current: 450
// Iteration 2: Accumulator: 650 Current: -400
// Iteration 3: Accumulator: 250 Current: 3000
// Iteration 4: Accumulator: 3250 Current: -650
// Iteration 5: Accumulator: 2600 Current: -130
// Iteration 6: Accumulator: 2470 Current: 70
// Iteration 7: Accumulator: 2540 Current: 1300
// 3840

// Same stuff with for of
let total = 0;
for (const mov of movements) {
  total += mov;
}
console.log(total);
// 3840

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
// 3000
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? age * age : 16 + age * 4));
  const adult = humanAges.filter(age => age >= 18);
  const averageAge =
    humanAges.reduce((acc, age) => acc + age, 0) / adult.length;
  console.log(humanAges);
  console.log(adult);
  console.log(averageAge);
  return averageAge;
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);


// The Magic Of Chaining Methods
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adult = humanAges.filter(age => age >= 18);
  const averageAge =
    humanAges.reduce((acc, age) => acc + age, 0) / adult.length;
  console.log(humanAges);
  console.log(adult);
  console.log(averageAge);
  return averageAge;
};

const calcAverageHumanAgeArrow = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age) => acc + age, 0) /
  ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4)).filter(age => age >= 18)
    .length;

console.log(calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]));


// Find method

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(firstWithdrawal);
// -400

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}

// JUST FOR FUN -> rewrite code that line 450 with using for of loop
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') console.log(acc);
}


// Some method
console.log(movements);
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]

// Includes --> Equality
console.log(movements.includes(-130)); // true

// Some --> Condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); // true
// long story short -> some method check IS THERE ANY element that satisfies this condition (in our situation condution is is there any element greater then 0?)
console.log(movements.some(mov => mov > 5000));
// false

// Every method
// Every method checks of ALL OF THE ELEMENTS in the array satisfy the condition

console.log(movements.every(mov => mov > 0));
// false;


// flat method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
// (8) [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
// (6) [Array(2), 3, 4, Array(2), 7, 8]

console.log(arrDeep.flat(2));
// (8) [1, 2, 3, 4, 5, 6, 7, 8]

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);
// 17840

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
// 17840


// Sorting arrays

// Strings
const owners = ['Anil', 'Chris', 'John', 'Dennise'];
console.log(owners.sort());
// (4) ['Anil', 'Chris', 'Dennise', 'John']
console.log(owners);
// (4) ['Anil', 'Chris', 'Dennise', 'John']

// Numbers
console.log(movements);
// console.log(movements.sort());
// (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

// return < 0, A, B (keep order) (A, B DEN KÜÇÜKSE)
// return > 0 B, A (switch order) (A, B DEN BÜYÜKSE)
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(movements);
// (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

// line 617 (sorting numbers) shorter way:
movements.sort((a, b) => a - b);
console.log(movements);
// (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]
*/

// More ways of creating and filling arrays
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// (7) [empty × 7]

// x.fill(23);
// console.log(x);
// (7) [23, 23, 23, 23, 23, 23, 23]

// doldurmaya 3. indexten başla
x.fill(1, 3);
console.log(x);
// (7) [empty × 3, 1, 1, 1, 1]

const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 4, 6);
console.log(arr);
// (7) [1, 2, 3, 4, 23, 23, 7]
// -> index 4'ten başla 6'ya kadar 23 ile doldur(6 dahil değil)

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
// (7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
// (7) [1, 2, 3, 4, 5, 6, 7]

const randomDices = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
console.log(randomDices);
