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

Person.hey = function () {
  console.log('Hey there :)');
};

Person.hey();
// Hey there :)

// anil.hey();
// Uncaught TypeError: anil.hey is not a function at script.js:43:6
// -> so Static methods are not inherited



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


// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
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

  // Static method
  static hey() {
    console.log('Hey there :)');
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

PersonCl.hey();
// Hey there :)
// jessica.hey();
// script.js:199 Uncaught TypeError: jessica.hey is not a function

// Long story short: static methods not available for instances

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

// Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // Better way to set properties for new objects
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
steven.init('Steven', 2001);
steven.calcAge();
// 36

console.log(steven.hasOwnProperty('name'));
// true
console.log(steven.hasOwnProperty('calcAge'));
// false
// ITS FALSE because calcAge is inherited prototype
console.log(steven);
// {name: 'Steven', birthYear: 2001}
// -->
// birthYear: 2001
// name: "Steven"
// [[Prototype]]: Object

const ocean = Object.create(PersonProto);
ocean.init('Ocean', 1997);
console.log(ocean);
// {firstName: 'Ocean', birthYear: 1997}
ocean.calcAge();
// 40

///////////////////////////////////////
// Coding Challenge #2

/* 
/////////////////////////////
// Coding Challenge #1
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
/////////////////////////////

1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀


class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// 120 km/h
const ford = new CarCl('Ford', 120);
console.log(ford.speedUS);
// get speedUS methodunu kullandım, 120 / 1.6 -> 75
console.log(ford);
// CarCl {make: 'Ford', speed: 120}
// görüldüğü üzere getter methodu orijinal speedi değiştirmiyor, speed hala 120
ford.accelerate();
// Ford is going at 130 km/h
ford.accelerate();
// Ford is going at 140 km/h
ford.brake();
// Ford is going at 135 km/h
console.log(ford);
// CarCl {make: 'Ford', speed: 135}
ford.speedUS = 50;
// (setter) mil/h yi km/h ye çeviriyorum -> 50mil/h * 1.6 = 80km/h
console.log(ford);
// CarCl {make: 'Ford', speed: 80}
// setter methodu orijinal speedi değiştiriyor, speed 135 di 80 oldu

// set speedUS ile US'de yaşıyan insanları hedef alıyorum, yani onlar mil cinsinden girecek ama set speedUS hızı km ye çeviricek 1*6 ile çarparak
// get speedUS ise km olan hızı mile çevirerek mil/h cinsinden hızı veriyor


//////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
// Now Student prototype inherits Person prototype
const mike = new Student('Mike', 2020, 'Computer Science');
mike.calcAge();
// 17

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

console.log(mike);
// Student {firstName: 'Mike', birthYear: 2020, course: 'Computer Science'}
mike.introduce();
// My name is Mike and I study Computer Science

console.dir(Student.prototype.constructor);
// ƒ Person(firstName, birthYear)
// Person olarak gösteriyor ama yanlış, Student olmalı
// Fixlemek için:
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
// ƒ Student(firstName, birthYear, course)

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

Car.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV('Tesla', 120, 23);
console.log(tesla);
tesla.accelerate();
console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);


/////////////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there :)');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Parent constructor'ından aldıgım icin super methodunu kullanıyorum (PersonCl.call() gibi)
    // Always needs to happen first!!!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `My name is ${this.fullName.split(' ')[0]} and I study ${this.course}`
    );
  }
}

const anil = new StudentCl('Anil Beter', 1999, 'Industrial Engineering');
console.log(anil);
// StudentCl {_fullName: 'Anil Beter', birthYear: 1999, course: 'Industrial Engineering'}
anil.introduce();
// My name is Anil and I study Industrial Engineering

anil.calcAge();
// 38



// Inheritance Between "Classes": Object Create
// (linking objects together)

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const anil = Object.create(PersonProto);
anil.init('Anil', 1999);
console.log(anil);
// {firstName: 'Anil', birthYear: 1999}

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const steve = Object.create(StudentProto);
steve.init('Steve', 2002, 'Computer Sciense');
console.log(steve);
// {firstName: 'Steve', birthYear: 2002, course: 'Computer Sciense'}
steve.introduce();
// anil.introduce();
// script.js:512 Uncaught TypeError: anil.introduce is not a function
steve.calcAge();
// 35

*/

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// static

class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
      return this;
    }
  }

  // Remember -> static methodu instancelar kullanamıyor, sadece classın kendisi kullanabiliyor
  static helper() {
    console.log('Helper');
  }

  // 4) Private methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Anil', 'USD', 2502);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
// (3) [250, -140, 1000]
console.log(acc1);
// Account {locale: 'tr', owner: 'Anil', currency: 'USD', #pin: 2502, #movements: Array(3)}

// console.log(acc1.#movements);
// Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class

// console.log(acc1.#pin);
// Uncaught SyntaxError: Private field '#pin' must be declared in an enclosing class
Account.helper();

// Chaining
acc1.deposit(300).deposit(500).withdraw(200).requestLoan(1000).withdraw(150);
console.log(acc1.getMovements());
// (8) [250, -140, 1000, 300, 500, -200, 1000, -150]

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀

// Coding Challenge #3
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate();
console.log(rivian);

rivian.accelerate().accelerate().accelerate().brake().chargeBattery(50);

console.log(rivian.speedUS);
console.log(rivian);
