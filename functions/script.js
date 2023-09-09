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
*/

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
