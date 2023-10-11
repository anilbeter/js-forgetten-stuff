'use strict';

// Constructor Function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // BAD PRACTICE - never create method inside of constructor function
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const anil = new Person('Anil', 1984);
console.log(anil);
// Person {firstName: 'Anil', birthYear: 1984}

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const billie = new Person('Billie', 2023);
const steve = new Person('Steve', 1999);

// Check is instance or not
console.log(anil instanceof Person);
// true
console.log(billie instanceof Person);
// true
const micheal = 'micheal';
console.log(micheal instanceof Person);
// false

// Prototypes
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

anil.calcAge();
// 53

console.log(anil.__proto__);
// {calcAge: ƒ, constructor: ƒ}

console.log(Person.prototype.isPrototypeOf(anil));
// true
console.log(Person.prototype.isPrototypeOf(Person));
// false

Person.prototype.favColor = 'blue';
console.log(anil.favColor);
// blue
console.log(billie.favColor);
// blue

console.log(anil.hasOwnProperty('firstName'));
// true
console.log(anil.hasOwnProperty('favColor'));
// false
// false because favColor property not inside of anil object, i added it externally (Person.prototype.favColor = 'blue'). It can access to it through prototype
