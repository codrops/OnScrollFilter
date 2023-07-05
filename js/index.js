// Import necessary functions and classes
import { preloadFonts } from './utils.js';
import { Item } from './item.js';

// Define a variable to store Lenis smooth scrolling object
let lenis;

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.1, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};

// Start preloading fonts
preloadFonts('qsy7khk').then(() => {
    // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
    document.body.classList.remove('loading');
    // Initialize smooth scrolling
	initSmoothScrolling();
	// Select all elements with the class 'content-wrap', and for each, create a new instance of the Item class
	[...document.querySelectorAll('.content-wrap')].forEach(element => {
		new Item(element);
	});
});
