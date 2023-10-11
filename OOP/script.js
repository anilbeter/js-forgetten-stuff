'use strict';

/*
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

// Object.prototype (top of prototype chain)
console.log(anil.__proto__.__proto__);

console.dir(Person.prototype.constructor);
// ƒ Person(firstName, birthYear)

const arr = [3, 4, 5, 6, 23, 39, 3, 3, 4, 23];
console.log(arr.__proto__ === Array.prototype);
// true

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());
// (6) [3, 4, 5, 6, 23, 39]

// Coding Challenge #1


1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
bmw.accelerate();
bmw.brake();

*/
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  neverGaveUp() {
    console.log('HEY! DREAMS ONLY COME TRUE TO THOSE WHO TRULY WANT THEM!');
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exist
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

console.log(jessica.age);
// 41

jessica.neverGaveUp();
// HEY! DREAMS ONLY COME TRUE TO THOSE WHO TRULY WANT THEM!
jessica.calcAge();
// 41
console.log(jessica.hasOwnProperty('calcAge'));
// false

// Manually adding method
PersonCl.prototype.greet = function () {
  console.log(`Hello ${this.firstName}`);
};
jessica.greet();
// Hello Jessica

// Notes about CLASSES
// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode

// Setters and Getters

const account = {
  owner: 'anil',
  movements: [200, 305, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
// 300

account.latest = 50;
console.log(account.movements);
// (5) [200, 305, 120, 300, 50]
