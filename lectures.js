////////////// LECTURES ////////////////

/*
// NOTE: Selecting, Creating, and Deleting Elements

//Selecting Element

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSection = document.querySelectorAll(".section");
console.log(allSection);

document.getElementById("section--1");
const allButton = document.getElementsByTagName("button");
console.log(allButton);

console.log(document.getElementsByClassName("btn"));
*/

/*
// Creating and iserting elements
// .insertAdjacentHTML
const header = document.querySelector(".header");

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookie for improved functionality and analytics";
message.innerHTML =
	"We use cookie for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it! </button>";
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// DELETE ELEMENT
document
	.querySelector(".btn--close-cookie")
	.addEventListener("click", function () {
		message.parentElement.removeChild(message);
	});

// NOTE: Styles, Attributes and Classes

//Styles
message.style.backgroundColor = "#37383d";
message.style.width = "110%";

console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
	Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute("src"));
console.log(logo.className);

console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains('c')
*/
/*
// NOTE: Button scrolling
btnScrollTo.addEventListener("click", (evt) => {
	// const s1Coords = section1.getBoundingClientRect();
	// console.log(s1Coords);
	// console.log(evt.target.getBoundingClientRect());
	// console.log(
	// 	"height/width viewport",
	// 	document.documentElement.clientHeight,
	// 	document.documentElement.clientWidth
	// );

	//Scorlling
	// window.scrollTo({
	// 	left: s1Coords.left + window.scrollX,
	// 	top: s1Coords.top + window.scrollY,
	// 	behavior: "smooth",
	// });

	section1.scrollIntoView({ behavior: "smooth" });
});
*/

/*
// NOTE: Event propagation (event bubbling)

// rgb(255, 255, 255)
const randomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
	`rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector(".nav__link").addEventListener("click", function (evt) {
	evt.preventDefault();
	this.style.backgroundColor = randomColor();
	console.log("link");

	// how to stop bubbling event (.stopPropagation() and .stopImidiatePropagation())
	// evt.stopPropagation();
});
document.querySelector(".nav__links").addEventListener("click", function (evt) {
	evt.preventDefault();
	this.style.backgroundColor = randomColor();
	console.log("container");
});
document.querySelector(".nav").addEventListener(
	"click",
	function (evt) {
		evt.preventDefault();
		this.style.backgroundColor = randomColor();
		console.log("nav");
	},
	true
);
*/

/*
// NOTE: DOM Traversing

const h1 = document.querySelector("h1");

// Going downwards:  childs
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "white";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.background = "var(--gradient-secondary)";
h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sidways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// get all sibling, move upward to parent element and then take the children element
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
	if (el !== h1) el.style.transform = "scale(0.5)";
});
*/

/*
// NOTE: Lifecycle DOM Event

// DOMContentLoaded (this event fired by the document as soon as the HTML is completly parsed )
document.addEventListener("DOMContentLoaded", function (evt) {
	console.log("HTML parsed and DOM tree built!", evt);
});

// Load event, fired by the window as soon as not only the HTML parsed but also all the source like images, all external resouces (CSS, etc)
window.addEventListener("load", function (evt) {
	console.log("Page fully loaded", evt);
});

// beforeUnload event, fired by the window when the user want to close the web
// window.addEventListener("beforeunload", function (evt) {
// 	evt.preventDefault();
// 	console.log(evt);
// });
*/
