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

// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
// el.addEventListener('click', function (e) {
// e.preventDefault();
// const id = this.getAttribute('href');
// document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
// });
// });

// Page navigation w/ event deligation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tab Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));
// BAD PRACTICE cuz' if we had 200 tabs, we exact callback function for 200 times. TOO BAD for optimization

// Bunun yerine event delegation kullanalım, parent elemente eventhandler atiyicam (tabsContainer)
tabsContainer.addEventListener('click', function (e) {
  // which buttons clicked?
  // const clicked = e.target;

  // THERE IS A BIG PROGLEM, we have a span inside of button (01, 02, 03), if I clicked that span element, its appear on console but I dont want that. I only interesting with buttons
  /////////////////////////////////
  // CONSOLE
  // -> <button
  //   class="btn operations__tab operations__tab--1 operations__tab--active"
  //   data-tab="1"
  // >
  //   <span>01</span>Instant Transfers
  // </button>;

  // -> <span>01</span>
  ////////////////////////////////

  // To fix that problem; use with closest method instead of only e.target:
  const clicked = e.target.closest('.operations__tab');
  // now its only selecting buttons itself, cuz we finding closest parent that had operations__tab class

  // fix null problem: if I clicked inside of container area (except buttons) I got null error:

  // Guard clause
  if (!clicked) return;
  // anlamı-> eğer tıkladığım elementin .closest(".operations__tab") / operations__tab parentı yoksa hiçbi şey yapma, sadece return

  // Activate tab

  // remove active classes from all tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // add active class to tab that I clicked
  clicked.classList.add('operations__tab--active');

  // Activate content area (with Data attribute)

  // remove active classes from all contents
  document;
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // add active class to content that I clicked
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    // tab coming from .html (data-tab="1"), REMEMBER I only interesting only the part after that data-
    .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation (Scroll Event)
// const initialCoordinates = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCoordinates.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
// This way just works fine but not good for performance. Every second browser calculates scroll position and this is not that we want for good performance.

// A Better Way: The Intersection Observer API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  // entry (header), viewport(root: null) ile kesişiyor mu(intersect)? kesişiyorsa yani şu an headerı görüyorsam sticky navi ekleme, zaten en üstteyim nave gerek yok
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } // header ile viewport şu an çakışmıyor di mi? o zaman sticky classı ekle, çünkü yeterince aşağı indim, artık header bölümünü göremiyorum
  else if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // section1 e geldiğimde sticky nav ın çalışmasını istiyorum, yani header benim viewport umdan tamamen çıkmalı. bu yüzden threshold 0
  rootMargin: `-${navHeight}px`,
  // section1 e gelmeden nav'ın yüksekliği kadar (90px) önce gözükmesini istiyorum navbar ın, daha estetik gözüküyor
});
headerObserver.observe(header);

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



// DOM Traversing
/////////////////////////////////////////////
const h1 = document.querySelector('h1');

// Going downwards: SELECTING CHILDS

console.log(h1.querySelectorAll('.highlight'));
// --> NodeList(2) [span.highlight, span.highlight]

// Direct children (everything included)
console.log(h1.childNodes); // not too useful
// NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]

// use .children instead of childNodes
console.log(h1.children);
// HTMLCollection(3) [span.highlight, br, span.highlight]

console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// Going upwards: SELECTING PARENTS

console.log(h1.parentNode);
console.log(h1.parentElement);

// closest method (very important!)
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// it selected closest header to h1 element
// closest parent element that has .header class

h1.closest('h1').style.background = 'var(--gradient-secondary)';
// bu durumda h1 in kendisi oldu

// querySelector un tam zıttı denilebilir, querySelector children seçiyor, closest parent

// Goind sideways: SELECTING SIBLINGS

// Elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// for Nodes - not important as Elements (previousElementSibling)
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
// h1'in parent elementinin bütün child elementleri

*/
