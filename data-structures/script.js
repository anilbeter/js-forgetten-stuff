'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starter, main) {
    return [this.starterMenu[starter], this.mainMenu[main]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '23:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
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

/*
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
