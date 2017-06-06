/**
 * Adds given class name to the body element (while removing any other classes)
 * @param {string} classColor - name of class to add
 */
function setColorClass(classColor) {
	document.getElementsByTagName('body')[0].classList = classColor;
}

/**
 * Returns random integer between given range
 * @param {integer} min - Minimum integer for range (inclusive)
 * @param {integer} max - Maximum integer for range (exclusive)
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Adds and removes given class to a random element within a group at a given
 * (random) interval.
 * @param {object} els - HTMLCollection of target elements
 * @param {string} classToAdd - class name to add to target elements
 * @param {integer} minTime - minimum random interval time (in milliseconds)
 * @param {integer} maxTime - maximum random interval time (in milliseconds)
 */
function addClassRandomly(els, classToAdd, minTime, maxTime) {
	// Keep track of the currently selected index as well as the previous.
	let previousIndex, randomIndex;

	// Adds class to random element from given collection
	let addClass = function() {
		do {
			// Find new random index (not the same as the previous index)
			randomIndex = getRandomInt(0, els.length);
		} while (randomIndex === previousIndex);
		previousIndex = randomIndex; // Update previous index

		// Remove class from any element that may currently have it
		for (let i = 0; i < els.length; i++) {
			els[i].classList.remove(classToAdd);
		}
		// Assign given class to random element
		els[randomIndex].classList.add(classToAdd);
	}

	// Calls addClass function, then calls itself after a given range of time.
	let randomTimeout = function(min, max) {
		addClass();
		setTimeout(function() {
			randomTimeout(min, max);
		}, getRandomInt(min, max));
	};

	// Kick-off the randomTimeout function after a given range of time.
	setTimeout(function() {
		randomTimeout(minTime, maxTime);
	}, getRandomInt(minTime, maxTime));
}

/**
 * Reveal and hide element, given an id
 * @param {string} id - id of element to show (remove .hidden class from)
 */
function showPage(id) {
	// Get all section elements
	let sections = document.getElementsByTagName('section');

	// Add .hidden class to sections that don't have it
	for (let i = 0; i < sections.length; i++) {
		if (!sections[i].classList.contains('hidden')) {
			sections[i].classList.add('hidden');
		}
	}

	// Remove .hidden class from given element
	document.getElementById(id).classList.remove('hidden');

	// Add background color class to body
	setColorClass(id);
}

/**
 * Initial functions and event listeners
 */
function readyInit() {
	// Select all .title <a> elements
	let clickableEls = document.getElementsByClassName('title')[0]
		.getElementsByTagName('a');
	// Randomly add .spin and .wiggle classes to clickableEls
	addClassRandomly(clickableEls, 'spin', 10000, 18000);
	addClassRandomly(clickableEls, 'wiggle', 5000, 10000);
}

// Listen to page hash location, to virtually show/hide content based on id
window.addEventListener('popstate', function(e) {
	let id = (document.location.hash !== '') ?
		document.location.hash.replace('#', '') : 'home';
	showPage(id);
});
