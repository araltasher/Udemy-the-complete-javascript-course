'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// LECTURE: LET and CONST

//ES5
/*
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

//ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6);

//ES5
function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;

        console.log(firstName + ' born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
    }
};
driversLicense5(true);

//ES6
function driversLicense6(passedTest) {
    let firstName;
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
    }
    console.log(firstName + ' born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
};
driversLicense6(true);


/////////////////////////////////////
// LECTURE: BLOCKS and IIFEs

//ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b);
console.log(c);

//ES5
(function () {
    var c = 3;
})();


/////////////////////////////////////
// LECTURE: STRINGS

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2018 - year;
}

//ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

//ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;

console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes('ar'));
console.log(`${firstName} `.repeat(5));


/////////////////////////////////////
// LECTURE: ARROW FUNCTIONS -- Part 1

const years = [1990, 1965, 1982, 1937];

//ES5
var ages5 = years.map(function(el) {
  return 2018 - el;
});
console.log(ages5);

//ES6
let ages6 = years.map(el => 2018 - el);
console.table(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2018 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;

  return `Age element ${index + 1}: ${age}.`;
});
console.log(ages6);


/////////////////////////////////////
// LECTURE: ARROW FUNCTIONS -- Part 2

//ES5
var box5 = {
  color: "green",
  position: 1,
  clickMe: function() {
    var self = this;
    document.querySelector(".green").addEventListener("click", function() {
      var str =
        "This is box number " + self.position + ", and it is " + self.color;
      alert(str);
    });
  }
};
//box5.clickMe();

//ES6
var box6 = {
  color: "green",
  position: 1,
  clickMe: function() {
    document.querySelector(".green").addEventListener("click", () => {
      alert(`This is box number ${this.position}, and it is ${this.color}`);
    });
  }
};
box6.clickMe();

function Person(name) {
  this.name = name;
}

var friends = ["Bob", "Jane", "Mark"];

//ES5
Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(
    function(el) {
      return this.name + " is friends with " + el;
    }.bind(this)43
  );

  console.log(arr);
};

new Person("John").myFriends5(friends);

//ES6
Person.prototype.myFriends6 = function(friends) {
  var arr = friends.map(el => `${this.name} is friends with ${el}`);

  console.log(arr);
};

new Person("Mike").myFriends6(friends);


/////////////////////////////////////
// LECTURE: DESTRUCTURING

//ES5
var john = ["John", 26];
var name1 = john[0];
var age = john[1];

//ES6
const [name2, year] = ["John", 26];
console.log(`${name2} is ${age} years old.`);

const obj = {
  firstName: "John",
  lastName: "Smith"
};

const { firstName, lastName } = obj;
console.log(`Hello ${firstName} ${lastName}!`);

const { firstName: a, lastName: b } = obj;
console.log(`Hello ${a} ${b}!`);

function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);


/////////////////////////////////////
// LECTURE: ARRAYS

const boxes = document.querySelectorAll(".box");

//ES5


var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (cur) {
  cur.style.backgroundColor = 'dodgerblue';
});


//ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => (cur.style.background = "dodgerblue"));

//ES5

for (var i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === "box blue") {
    continue;
  }
  boxesArr5[i].textContent = "I changed to blue!";
}


for (const cur of boxesArr6) {
  if (cur.className.includes("blue")) {
    continue;
  }
  cur.textContent = "I changed to blue!";
}

//ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function (cur) {
  return cur >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

//ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));


/////////////////////////////////////
// LECTURE: SPREAD OPERATOR

function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);

console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];

const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

const all = [h, ...boxes];

Array.from(all).forEach(cur => cur.style.color = 'purple');


/////////////////////////////////////
// LECTURE: REST PARAMETERS

//ES5
function isFullAge5() {
  //console.log(arguments);
  var argsArr = Array.prototype.slice.call(arguments);

  argsArr.forEach(function (element) {
    console.log(2018 - element >= 18);
  });
}

//isFullAge5(1990, 1999, 1965, 2016);

//ES6
function isFullAge6(...years) {
  years.forEach(cur => console.log((2018 - cur) >= 18));
}

isFullAge6(1990, 1999, 1965, 2016);

//ES5
function isFullAge5(limit) {
  //console.log(arguments);
  var argsArr = Array.prototype.slice.call(arguments, 1);

  argsArr.forEach(function (element) {
    console.log(2018 - element >= limit);
  });
}

//isFullAge5(21, 1990, 1999, 1965, 2016);

//ES6
function isFullAge6(limit, ...years) {
  years.forEach(cur => console.log((2018 - cur) >= limit));
}

isFullAge6(16, 1990, 1999, 1965, 2016, 1987);


/////////////////////////////////////
// LECTURE: DEFAULT PARAMETERS

//ES5
// function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

//   lastName === undefined ? lastName = "Smith" : lastName = lastName;
//   nationality === undefined ? nationality = 'American' : nationality = nationality;

//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.yearOfBirth = yearOfBirth;
//   this.nationality = nationality;
// }

//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
  this.firstName = firstName;
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var john = new SmithPerson("John", 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');


/////////////////////////////////////
// LECTURE: MAPS

const question = new Map();
question.set(
  "question",
  "What is the official name of the lastest major JavaScript version?"
);
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES7");
question.set("correct", 3);
question.set(true, "Correct answer!");
question.set(false, "Wrong, please try again");

console.log(question.get("question"));
//console.log(question.size);

if (question.has(4)) {
  //question.delete(4);
  //console.log("Answer 4 is here");
}

//  question.clear();

// question.forEach((value, key) =>
//   console.log(`This is ${key}, and it's set to ${value}`)
// );

for (let [key, value] of question.entries()) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}

const ans = parseInt(prompt("Write the correct answer"));
console.log(question.get(ans === question.get("correct")));


/////////////////////////////////////
// LECTURE: CLASSES

//ES5
var Person5 = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person5.prototype.calculateAge = function () {
  var age = new Date().getFullYear - this.yearOfBirth;
  console.log(age);
};

var john5 = new Person5('John', 1990, 'teacher');

//ES6
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calculateAge() {
    let age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
  }

  static greeting() {
    console.log('Hey there!');
  }
}

const mary6 = new Person6('Mary', 1990, 'designer');
Person6.greeting();


/////////////////////////////////////
// LECTURE: CLASS INHERITANCE

//ES5
var Person5 = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

Person5.prototype.calculateAge = function () {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
};

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
};

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function () {
  this.medals++;
  console.log(this.medals);
};

var johnAthlete5 = new Athlete5("John", 1990, "swimmer", 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

//ES6
class Person6 {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calculateAge() {
    let age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }
}

class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }

  wonMedals() {
    this.medals++;
    console.log(this.medals);
  }
}

const johnAthlete6 = new Athlete6 ('John', 1990, 'swimmer', 3, 10);
johnAthlete6.wonMedals();
johnAthlete6.calculateAge();
*/

/////////////////////////////////////
// LECTURE: CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees


4. Total and average length of the town's streets

5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

var Town = function Town(name, year) {
  _classCallCheck(this, Town);

  this.name = name;
  this.year = year;
};

var Park = function (_Town) {
  _inherits(Park, _Town);

  function Park(name, year, parkArea, treeNumber) {
    _classCallCheck(this, Park);

    var _this = _possibleConstructorReturn(this, (Park.__proto__ || Object.getPrototypeOf(Park)).call(this, name, year));

    _this.parkArea = parkArea;
    _this.treeNumber = treeNumber;
    return _this;
  }

  _createClass(Park, [{
    key: 'treeDensity',
    value: function treeDensity() {
      return this.treeNumber / this.parkArea;
    }
  }, {
    key: 'lotsOfTrees',
    value: function lotsOfTrees() {
      return this.treeNumber > 1000;
    }
  }, {
    key: 'calculateAge',
    value: function calculateAge() {
      return new Date().getFullYear() - this.year;
    }
  }]);

  return Park;
}(Town);

var Street = function (_Town2) {
  _inherits(Street, _Town2);

  function Street(name, year, length) {
    var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 3;

    _classCallCheck(this, Street);

    var _this2 = _possibleConstructorReturn(this, (Street.__proto__ || Object.getPrototypeOf(Street)).call(this, name, year));

    _this2.length = length;
    _this2.size = size;
    return _this2;
  }

  _createClass(Street, [{
    key: 'decideSize',
    value: function decideSize() {

      var classification = new Map();
      classification.set(2, 'Small');
      classification.set(1, 'Tiny');
      classification.set(3, 'Medium');
      classification.set(4, 'Big');
      classification.set(5, 'Huge');

      return classification.get(this.size);
    }
  }]);

  return Street;
}(Town);

var allParks = [new Park("Green Park", 1987, 0.2, 215), new Park("National Park", 1894, 2.9, 3541), new Park("Oak Park", 1953, 0.4, 949)];
var allStreets = [new Street("Ocean Avenue", 1999, 1.1, 4), new Street("Evergreen Street", 2008, 2.7, 2), new Street("4th Street", 2015, 0.8), new Street("Sunset Boulevard", 1982, 2.5, 5)];

var densityResults = allParks.map(function (cur) {
  return cur.name + ' has a tree density of ' + cur.treeDensity() + ' trees per square km';
});

var totalAge = allParks.reduce(function (total, currentValue) {
  return total + currentValue.calculateAge();
}, 0);

var largeParks = allParks.filter(function (cur) {
  return cur.lotsOfTrees();
});

var streetLength = allStreets.reduce(function (total, currentValue) {
  return total + currentValue.length;
}, 0);

console.log("----PARKS REPORT----");
console.log('Our ' + allParks.length + ' parks have an average of ' + totalAge / allParks.length + ' years\n');
densityResults.forEach(function (el) {
  return console.log(el);
});
largeParks.forEach(function (el) {
  return console.log(el.name + ' has more than 1000 trees (' + el.treeNumber + ' trees to be exact)');
});
console.log("----STREETS REPORT----");
console.log('Our ' + allStreets.length + ' streets have a total length of ' + streetLength + 'km, with an average of ' + streetLength / allStreets.length + 'km.');
allStreets.forEach(function (el) {
  return console.log(el.name + ', built in ' + el.year + ', is a ' + el.decideSize() + ' street');
});
