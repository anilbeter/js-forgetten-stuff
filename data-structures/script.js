'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starter, main) {
    return [this.starterMenu[starter], this.mainMenu[main]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '23:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...optionalIngredients) {
    console.log(mainIngredient);
    console.log(optionalIngredients);
  },
};

// console.log(restaurant.openingHours.mon.open);
// restaurant.openingHours.mon = undefined. because there are only thu, fri, and sat. so i try to access open of undefined -> undefined.open
// script.js:97 Uncaught TypeError: Cannot read properties of undefined (reading 'open')

// Optional Chaning (?.)
// To prevent this error, I can use Optional Chaining. Long story short it whether is there restaurant.openingHours.mon controls it first.
console.log(restaurant.openingHours.mon?.open);
// undefined

// I can use multiple optional chaining
console.log(restaurant.openingHours?.mon?.open);
// undefined

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderDoner?.(0, 1) ?? 'Method does not exist');
// Method does not exist

// Arrays
const users = [
  {
    name: 'Anil',
    email: 'hello@anil.io',
  },
];
console.log(users[0]?.name ?? 'User array empty.');
// Anil

/*
// For of loops

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) {
  console.log(item);
}

for (const item of menu.entries()) {
  console.log(item);
  // (2) [0, 'Focaccia']
  // (2) [1, 'Bruschetta']
  // ...
}

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
  // 1: Focaccia
  // 2: Bruschetta
  // ...
}


// 1)
const players1 = [...game.players[0]];
const players2 = [...game.players[1]];

// 2)
const [goalKeeper, ...fieldPlayers] = [...game.players[0]];
console.log(goalKeeper);
console.log(fieldPlayers);

// 3)
const allPlayers = [...game.players[0], ...game.players[1]];
console.log(allPlayers);

// 4)
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1];
console.log(players1Final);

// 5)
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6)
const printGoals = function (...players) {
  console.log(`${players.length} goals were scored!`);
  console.log('Goals scored by:');
  for (let i = 0; i < players.length; i++) {
    console.log(`${players[i]}`);
  }
};

printGoals('Anil', 'Cody', 'Billie', 'Bluey');
// 4 goals were scored!
// Goals scored by:
// Anil
// Cody
// Billie
// Bluey

// 7)
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

///////////////////////////////
// Logical Assignment Operators

const rest1 = {
  name: 'Fern',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'Sky Burger',
  owner: 'Cody Le',
};

// rest1.numGuests = rest1.numGuests || 10;
// console.log(rest1.numGuests); --> 20
// rest2.numGuests = rest2.numGuests || 10;
// console.log(rest2.numGuests); --> 10

// OR assigment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
console.log(rest1.numGuests); // 10
// 0 ayarlamama rağmen 10 gösteriyor, çünkü JS'e göre 0 falsy value. Bundan nasıl kaçınabilirim?

// nullish assigment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1.numGuests); // 0
console.log(rest2.numGuests); // 10
// görüldüğü gibi nullish assigment operator ile 0'ı truthy value olarak gösterebiliyorum.

rest1.owner &&= 'Anonymous';
console.log(rest1); // {name: 'Fern', numGuests: 0}
rest2.owner &&= 'Anonymous';
console.log(rest2); // {name: 'Sky Burger', owner: 'Anonymous', numGuests: 10}


///////////////////////////////////////
// The Nullish Coalescing Operator (??)
restaurant.numGuests = 0;

const guest = restaurant.numGuests || 10;
console.log(guest);
// output -> 10, ama benim misafirim 0. JS doğası gereği 0'ı falsy value olarak görüyor ve 0'ı atlıyor. Bu durumdan nasıl kaçınabilirim?

// Nullish Coalescing Operator ile --->
// Nullish: null and undefined (NOT include 0 or '')
// Yani ?? kullanırsam 0 ve '' (boş string) falsy değil.
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
// output -> 0

console.log(null ?? 'Anil On Fire!');
// Anil On Fire!


///////////////////////////////////////
// Short Circuting
console.log('---------------OR----------------');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Anil'); // 3
console.log('' || 'Anil'); // Anil
console.log(true || 0); // true
console.log(undefined || 0); // 0 -> Eğer hiç true value yoksa en sondaki valueyi veriyor

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello
// Görüldüğü gibi OR operatoru karşılaştığı ilk true değeri veriyor, hiç true yoksa en sondaki yanlış ifadeyi veriyor.

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10

// Let's rewrite with short circuiting
const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 10;

console.log('---------------AND----------------');
console.log(0 && 'Anil'); // 0
// OR operatorunun tam tersi çalışıyor, bulduğu ilk yanlış değeri veriyor
console.log(23 && 'Anil'); // Anil
// Hiç yanlış değeri yoksa, tıpkı OR'daki gibi en sondaki değeri veriyor
console.log('Hello' && 23 && null && 'Adr!'); // null

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach');


//////////////////////////////////////////////
// Rest pattern and parameters
// 1) Destructring

// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);
// 1 2 [3, 4, 5]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
// NOT: it does not include any skipped elements, rest pattern always must be the last in the destructring assignment
// , , koyarak 1. indexi atladım ve 1. indexi dahil etmedi

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);
// {open: 0, close: 24} {thu: {…}, fri: {…}}

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  console.log(sum);
};

add(5, 7, 23); // 35
add(2, 5); // 7
add(5, 5, 34, 23, 54, 14); // 135

const x = [23, 5, 7];
add(...x); // 35

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// mushrooms
// (3) ['onion', 'olives', 'spinach']
restaurant.orderPizza('mushrooms');
// mushrooms
// []


//////////////////////////////
// Spread Operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // (5) [1, 2, 7, 8, 9]

const newGoodArr = [1, 2, ...arr];
console.log(newGoodArr); // (5) [1, 2, 7, 8, 9]

console.log(...newGoodArr); // 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci', 'Kebap'];
console.log(newMenu);
// (5) ['Pizza', 'Pasta', 'Risotto', 'Gnocci', 'Kebap']

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(wholeMenu);
// (7) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad', 'Pizza', 'Pasta', 'Risotto']

// Spread operator only works with iterables
// Iterables are: arrays, strings, maps, sets, NOT objects
const str = 'Anil';
const letters = [...str];
console.log(letters);
// (4) ['A', 'n', 'i', 'l']
console.log(...str);
// A n i l
// console.log(`${...str} Beter`); ---> ERROR
// Multiple values separted by comma are usually only expected when we pass arguments into a function or when we build new array

// Real word example
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredients);

restaurant.orderPasta(...ingredients);

// Objects
// Since ES2018, spread operators works with objects. Even though objects are not iterable
const newRestaurant = { foundedIn: 1984, ...restaurant, founder: 'Cody Fern' };
console.log(newRestaurant);
// categories: (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']
// foundedIn: 1984
// founder: "Cody Fern"
// location: "Via Angelo Tavanti 23, Firenze, Italy"
// mainMenu: (3) ['Pizza', 'Pasta', 'Risotto']
// name: "Classico Italiano"
// openingHours: {thu: {…}, fri: {…}, sat: {…}}
// order: ƒ (starter, main)
// orderDelivery: ƒ ({ starterIndex = 1, mainIndex = 0, time = '23:00', address, })
// orderPasta: ƒ (ing1, ing2, ing3)
// starterMenu:
// (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name, restaurant.name);
// Ristorante Roma Classico Italiano


//////////////////////////////////
// Destructring Objects
// !!! Dikkat ettiysen orderDelivery fonksiyonunun parametreleri sırasıyla tam olarak uyuşmuyor, yani benim yazdığım sıralama farklı: orderDelivery: function ({ starterIndex, mainIndex, time, address }) Object'de sıralama önemsiz, array gibi index muhabbeti yok
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
// Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 22:30

// Get values with default values
restaurant.orderDelivery({
  address: 'Via del 23',
  starterIndex: 1,
});
// Order received! Bruschetta and Pizza will be delivered to Via del 23 at 23:00

///////////////////////////////////////////////////

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
// Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

// Set default value
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
// [] ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);
// 23 7

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
// 11 23


// Destructring arrays
const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// console.log(a, b, c); // 2 3 4

// with data structure
const [x, y, z] = arr;
console.log(x, y, z); // 2 3 4
console.log(arr); // 2 3 4

const [first, second] = restaurant.categories;
console.log(first, second);
// Italian Pizzeria

// Eğer 1. ve 3.yü istiyorsam
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
// Italian Vegetarian

// Lets switch variables
[secondary, main] = [main, secondary];
console.log(main, secondary);
// Vegetarian Italian

console.log(restaurant.order(2, 0));
// (2) ['Garlic Bread', 'Pizza']

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);
// Garlic Bread Pizza

// Nested Arrays Destructure
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
// 2 [5, 6]

const [i, , [j, k]] = nested;
console.log(i, j, k);
// 2 5 6

// Default values
const [p, q, r] = [8, 9];
console.log(p, q, r); // 8 9 undefined

const [o = 1, c = 1, v = 1] = [8, 9];
console.log(o, c, v); // 8 9 1
*/
