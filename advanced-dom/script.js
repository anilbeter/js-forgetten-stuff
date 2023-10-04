'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////
// Smooth Scrolling & Page Navigation

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const section1Coordinates = section1.getBoundingClientRect();
  console.log(section1Coordinates);

  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  // Scrolling

  // window.scrollTo(
  //   section1Coordinates.left + window.scrollX,
  //   section1Coordinates.top + window.scrollY
  // );

  // w/ Smooth effect

  //   window.scrollTo({
  //     left: section1Coordinates.left + window.scrollX,
  //     top: section1Coordinates.top + window.scrollY,
  //     behavior: 'smooth',
  //   });

  // More modern way:
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*

// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// sayfadaki bütün div'ler
console.log(document.getElementsByTagName('div'));

// btn classına sahip olan elementler
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies!';
message.innerHTML =
  'We use cookies! <button class ="btn btn--close-cookie">Got it</button>';

// header.prepend(message);
// prepend --> oluşturduğum message node'u, artık header'ın first childı

// yarattğım bu node aynı anda farklı yerde olamaz, sonuçta html de yok 0 dan js ile ben oluşturdum. aynı anda iki farklı yerde olmasını istiyorsam cloneNode() kullanmalıyım
// header.append(message.cloneNode(true));
header.append(message);

// header.before(message);
// --> header ile kardeş oldu ama before olduğu için header dan önce geliyor (header.prepend(message) de ise header ın first childı oluyordu)
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // nothing
console.log(message.style.backgroundColor); // rgb(55, 56, 61) (cuz' I set the background color inline)

// If I wanna see most styles -> getComputedStyle
console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
console.log(getComputedStyle(message).height); // 48.975px

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');
// css'deki --color-primary'i orangered yaptım

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
// http://127.0.0.1:8080/img/logo.png
console.log(logo.className);
// nav__logo

// Non-standard
console.log(logo.designer);
// undefined, cuz' designer not standart property that is expected in images

// to make this work:
console.log(logo.getAttribute('designer'));
// Ocean

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);
// Beautiful minimalist logo

logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));
// Bankist

// Data attributes

// in html: version-number -> versionNumber
console.log(logo.dataset.versionNumber);
// 3.0

// Classes
logo.classList.add('anil');
logo.classList.remove('anil');
logo.classList.toggle('anil');
logo.classList.contains('anil'); // not includes

// Don't use. Because this will override all the existing classes
// logo.className = 'Ocean';



// Types of Events and Event Handlers

// mouseenter (like hover effect in CSS)
const h1 = document.querySelector('h1');

const printHello = function (e) {
  console.log('Heyoo');
};

h1.addEventListener('mouseenter', printHello);

setTimeout(() => {
  h1.removeEventListener('mouseenter', printHello);
}, 3000);
// 3sn sonra bu eventi kaldırıyorum, daha fazla Heyoo yazmıcak console da

// OLD SCHOOL WAY
// h1.onmouseenter = function (e) {
//   console.log('Hello v2');
// };



// Event Propagation
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

*/
