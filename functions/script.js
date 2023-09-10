'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 2,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

// numPassengers olarak 2 yi alacak, default olarak 2 ayarlamıştım.
createBooking('LH123', undefined, 1000);


const flight = 'LH234';
const anil = {
  name: 'Anil Beter',
  passport: 2342343,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 2342343) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, anil);
console.log(flight);
// LH234
console.log(anil);
// {name: 'Mr. Anil Beter', passport: 2342343}

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(anil);
checkIn(flight, anil);


// Functions Accepting Callback Functions (High-Order Function)
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
// Original string: JavaScript is the best!
// Transformed string: JAVASCRIPT is the best!
// Transformed by: upperFirstWord

transformer('My dreams come through', oneWord);
// Original string: My dreams come through
// Transformed string: mydreamscomethrough
// Transformed by: oneWord

// addEventListener also higher-order function
const high5 = function () {
  console.log(`👋🏻`);
};
document.body.addEventListener('click', high5);


// Functions Returning Functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Anil'); // Hey Anil
greeterHey('Billie'); // Hey Billie

greet('Hello')('Anil'); // Hello Anil

// Write greet function as arrow function
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

greetArrow('Hellooo')('Chris'); // Hellooo Chris
*/

// the Call and Apply methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(23, 'Anil Beter');
lufthansa.book(645, 'Cody Fern');
console.log(lufthansa);
// ...
// bookings: Array(2)
// 0: {flight: 'LH23', name: 'Anil Beter'}
// 1: {flight: 'LH645', name: 'Cody Fern'}
// ...

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// ERROR
// book(23, 'Sarah Winter');
// ERROR

// Proper way -> the Call method
// what object that this keyword should point?, flightNum, name
book.call(eurowings, 23, 'Sarah Winter');
console.log(eurowings);
// bookings: Array(1)
// 0: {flight: 'EW23', name: 'Sarah Winter'}
// ...

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);
// ...
// bookings: Array(3)
// 0: {flight: 'LH23', name: 'Anil Beter'}
// 1: {flight: 'LH645', name: 'Cody Fern'}
// 2: {flight: 'LH239', name: 'Mary Cooper'}
// ...

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 184, 'Martha Ocean');
console.log(swiss);
// bookings: Array(1)
// 0: {flight: 'LX184', name: 'Martha Ocean'}

// Apply method
// Too similar to call method, but instead apply method takes *array* as argument
const flightData = [583, 'George Washington'];
book.apply(swiss, flightData);
console.log(swiss);
// ...
// bookings: Array(2)
// 0: {flight: 'LX184', name: 'Martha Ocean'}
// 1: {flight: 'LX583', name: 'George Washington'}
// ...

// Apply method isn't that used anymore, cause we have much modern way (spread operator):
const anilData = [23, 'Anil Adrian'];
book.call(swiss, ...anilData);
console.log(swiss);
// ...
// bookings: Array(3)
// 0: {flight: 'LX184', name: 'Martha Ocean'}
// 1: {flight: 'LX583', name: 'George Washington'}
// 2: {flight: 'LX23', name: 'Anil Adrian'}
// ...

// Bind method
// -> Bind methods similar to call method, we can manually set this keyword to any object. Difference is: Bind method doesn't immediately call the function. Instead it returns a new function where this keyword is bound

// book.call(eurowings, 23, 'Sarah Winter');

const bookEW = book.bind(eurowings);
bookEW(23, 'Steven Williams');
console.log(eurowings);
// ...
// bookings: Array(2)
// 0: {flight: 'EW23', name: 'Sarah Winter'}
// 1: {flight: 'EW23', name: 'Steven Williams'}
// ...

const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

// I can set default arguments
const bookEW99 = book.bind(eurowings, 99);
bookEW99('Anil Ocean');
bookEW99('John LA');
console.log(eurowings);
// bookings: Array(4)
// 0: {flight: 'EW23', name: 'Sarah Winter'}
// 1: {flight: 'EW23', name: 'Steven Williams'}
// 2: {flight: 'EW99', name: 'Anil Ocean'}
// 3: {flight: 'EW99', name: 'John LA'}

// With event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  // <button class="buy">Buy new plane 🛩</button>
  // This keyword points button itself. I should fix it cuz I got NaN resault

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// I used bind method to fix line 231 error. Now this keyword points to lutfhansa object

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); // 220

const addVATPortugal = addTax.bind(null, 0.23);
// null stands for this keyword, I don't even need to set this keyword for target. So I use null instead
console.log(addVATPortugal(100)); // 123
// I create brand new function for Portugal Tax. Imagine the tax is 0.23 in Portugal ;)

// Rewrite our partial application with technique that one function returning another function:
const calculateTax = function (value) {
  return function (rate) {
    console.log(value + value * rate);
  };
};

calculateTax(100)(0.23); // 123
