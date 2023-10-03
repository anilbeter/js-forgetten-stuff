'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-09-29T23:36:17.929Z',
    '2023-09-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 10;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // create current day and time
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    const locale = navigator.language;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
console.log(23 === 23.0); // true

// Conversion
console.log(Number('23'));
// easier way to conver to number
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('ab30px', 10)); // NaN
// -> it has to be starts with number

console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2

// check if value is NaN
console.log(Number.isNaN(23)); //false
console.log(Number.isNaN('23')); //false
console.log(Number.isNaN(+'23x')); // true

// checking if value is number (BEST WAY A VALUE IS NUMBER OR NOT)
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('23')); // false
console.log(Number.isFinite(23 / 0)); // false (infinity)

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false


console.log(Math.sqrt(64)); // 8
console.log(25 ** (1 / 2)); // 5

console.log(Math.max(5, 18, 23, 36, 104, 34, 8435));
// 8435
console.log(Math.min(5, 18, 23, 36, 104, 34, 8435));
// 5

// calculate area of circle (2 * pi * r)
console.log(Math.PI * Number.parseFloat('10px') ** 2);
// 314.1592653589793

// generate random numbers between 1 and 6
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.82384)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

// Rounding decimals
console.log((2.7).toFixed(0)); // "3"
// toFixed() --> Returns a string representing a number in fixed-point notation.
console.log((2.7).toFixed(3)); // "2.700"
console.log(+(2.7).toFixed(3)); // 2.7


// Remainder operator
console.log(5 % 2); // 1
console.log(8 % 3); // 2

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //true
console.log(isEven(23)); //false

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});



// 284,000,000,000
const diameter = 284_000_000_000;
console.log(diameter);
// 284000000000

const priceCents = 345_99;
console.log(priceCents);
// 34599



// biggest number javascript safely represent
console.log(2 ** 53 - 1);
// 9007199254740991

console.log(Number.MAX_SAFE_INTEGER);
// 9007199254740991

console.log(8132194204239230314823094823942);
// 8.13219420423923e+30

// BigInt ->
console.log(8132194204239230314823094823942n);
// 8132194204239230314823094823942n

console.log(BigInt(813219420423));
// 813219420423n

// Operations
console.log(10000n + 10000n);
// 20000n



// Creating Dates

// Create a date
const now = new Date();
console.log(now);
// Sun Oct 01 2023 11:21:57 GMT+0300 (GMT+03:00)

console.log(new Date('December 24, 2023'));
// Sun Dec 24 2023 00:00:00 GMT+0300 (GMT+03:00)

console.log(new Date(account1.movementsDates[0]));
// Tue Nov 19 2019 00:31:17 GMT+0300 (GMT+03:00)

console.log(new Date(2026, 6, 26, 15, 23));
// Sun Jul 26 2026 15:23:00 GMT+0300 (GMT+03:00)
// 6 -> I was expecting june but javascript gave me July, so months are 0 indexed

console.log(new Date(2026, 10, 31));
// Tue Dec 01 2026 00:00:00 GMT+0300 (GMT+03:00)



// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
// Thu Nov 19 2037 15:23:00 GMT+0300 (GMT+03:00)

console.log(future.getFullYear());
// 2037
console.log(future.getMonth());
// 10 -> November in Javascript
console.log(future.getDate());
// 19
console.log(future.getDay());
// 4 -> day of the week

console.log(future.toISOString());
// 2037-11-19T12:23:00.000Z

console.log(future.getTime());
// 2142246180000
// getTime() --> Returns the stored time value in milliseconds since midnight, January 1, 1970

console.log(new Date(2142246180000));
// Thu Nov 19 2037 15:23:00 GMT+0300 (GMT+03:00)

console.log(Date.now());
// 1696149277399
console.log(new Date(1696149277399));
// Sun Oct 01 2023 11:34:37 GMT+0300 (GMT+03:00)

future.setFullYear(2026);
console.log(future);
// Thu Nov 19 2026 15:23:00 GMT+0300 (GMT+03:00)

// Operations With Dates

const future = new Date(2026, 5, 2, 15, 23);
console.log(future);
// Tue Jun 02 2026 15:23:00 GMT+0300 (GMT+03:00)

console.log(+future);
// 1780402980000 -->milliseconds



const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);
// 10



// Internationalizing Dates (Intl)

// Timers

setTimeout(() => console.log('Here is your pizza!😊'), 3000);
// 3 seconds
// IMPORTANT -> Code execution doesnt stop
console.log('anil'); // anil will appear before here is your pizza

const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza with ${ing1} and ${ing2}`);
  },
  2000,
  ...ingredients
);
// Here is your pizza with olives and spinach

if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer);
}
// line 518 (pizza string) will not printed to the console

// setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
// calling function every 1 seconds
// Tue Oct 03 2023 06:53:10 GMT+0300 (GMT+03:00)
// Tue Oct 03 2023 06:53:11 GMT+0300 (GMT+03:00)
// Tue Oct 03 2023 06:53:12 GMT+0300 (GMT+03:00)
// Tue Oct 03 2023 06:53:13 GMT+0300 (GMT+03:00)

// Building clock
setInterval(function () {
  const now = new Date();
  console.log(
    `${now.getHours()}:${String(now.getMinutes()).padStart(2, 0)}:${String(
      now.getSeconds()
    ).padStart(2, 0)}`
  );
}, 1000);
*/
