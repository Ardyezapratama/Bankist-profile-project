"use strict";

// NOTE: Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section--1");
const header = document.querySelector(".header");
const tabsContainer = document.querySelector(".operations__tab-container");
const nav = document.querySelector(".nav");
const slides = document.querySelectorAll(".slide");
const btnSliderLeft = document.querySelector(".slider__btn--left");
const btnSliderRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

const openModal = (evt) => {
	evt.preventDefault();
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = () => {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (evt) {
	if (evt.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

// NOTE: Page navigations

// navLink.forEach(function (el) {
// 	el.addEventListener("click", function (evt) {
// 		evt.preventDefault();
// 		const id = this.getAttribute("href");
// 		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
// 	});
// });'

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
navLinks.addEventListener("click", function (evt) {
	evt.preventDefault();

	if (
		evt.target.classList.contains("nav__link") &&
		!evt.target.classList.contains("nav__link--btn")
	) {
		const id = evt.target.getAttribute("href");
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});

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

// NOTE: Tabbed components
tabsContainer.addEventListener("click", function (evt) {
	const clicked = evt.target.closest(".operations__tab");
	if (!clicked) return;

	// Active tab
	tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
	clicked.classList.add("operations__tab--active");

	// Activate content area
	document
		.querySelectorAll(`.operations__content`)
		.forEach((el) => el.classList.remove("operations__content--active"));
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active");
});

// NOTE: Menu fade animations
const handleHover = function (evt) {
	if (evt.target.classList.contains("nav__link")) {
		const link = evt.target;
		const siblings = link.closest(".nav").querySelectorAll(".nav__link");
		const logo = link.closest(".nav").querySelector(".nav__logo");
		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
};

// Passing argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// NOTE: Sticky Nav

// const section1Coords = section1.getBoundingClientRect();
// console.log(section1Coords);
// window.addEventListener("scroll", function () {
// 	if (this.window.scrollY > section1Coords.top) nav.classList.add("sticky");
// 	else nav.classList.remove("sticky");
// });

// const obsCallback = function (entries, observer) {
// 	entries.forEach((entry) => console.log(entry));
// };

// const obsOptions = {
// 	root: null,
// 	threshold: [0, 0.2],
// };

// const observe = new IntersectionObserver(obsCallback, obsOptions);
// observe.observe(section1);

// Intersection observer API
const navHeinght = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
	const [entry] = entries;
	if (entry.isIntersecting) nav.classList.remove("sticky");
	else nav.classList.add("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeinght}px`,
});

headerObserver.observe(header);

// NOTE: Reveal sections

const revealSection = function (entries, observer) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		entry.target.classList.remove("section--hidden");
		observer.unobserve(entry.target);
	});
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});
sections.forEach(function (section) {
	sectionObserver.observe(section);
	section.classList.add("section--hidden");
});

// Lazy loading image
const imgTarget = document.querySelectorAll("img[data-src]");

const loadingImg = function (entries) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;
	// Replace src with data-src
	entry.target.src = entry.target.dataset.src;
	entry.target.classList.remove("lazy-img");

	entry.target.addEventListener("load", function () {});
};

const imgObserver = new IntersectionObserver(loadingImg, {
	root: null,
	threshold: 0,
	rootMargin: "200px",
});

imgTarget.forEach((img) => imgObserver.observe(img));

// NOTE: Implementing Sliders

const slider = function () {
	let currSlide = 0;
	const maxSlide = slides.length - 1;

	// Functions

	// Create dots
	const createDots = function () {
		slides.forEach(function (_, i) {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" data-slide="${i}"></button>`
			);
		});
	};

	// Active dot

	const activeDot = function (slide) {
		document
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active");
	};

	// Active slide
	const activeSlide = function (slide) {
		slides.forEach(
			(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
		);
	};

	// Next slide
	const nextSlide = function () {
		if (currSlide === maxSlide) {
			currSlide = 0;
		} else {
			currSlide++;
		}
		activeSlide(currSlide);
		activeDot(currSlide);
	};

	const prevSlide = function () {
		if (currSlide === 0) {
			currSlide = maxSlide;
		} else {
			currSlide--;
		}
		activeSlide(currSlide);
		activeDot(currSlide);
	};

	const init = function () {
		activeSlide(0);
		createDots();

		activeDot(0);
	};

	init();

	// Event Handler
	btnSliderRight.addEventListener("click", nextSlide);
	btnSliderLeft.addEventListener("click", prevSlide);

	document.addEventListener("keydown", function (evt) {
		if (evt.key === "ArrowRight") {
			nextSlide();
		} else if (evt.key === "ArrowLeft") {
			prevSlide();
		}
	});

	dotContainer.addEventListener("click", function (evt) {
		if (evt.target.classList.contains("dots__dot")) {
			currSlide = Number(evt.target.dataset.slide);
			activeSlide(currSlide);
			activeDot(currSlide);
		}
	});
};

slider();
