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
 * Adds and removes given class (or random class, if more than one is given)
 * to a random element within a group at a given (random) interval.
 * @param {object} els - HTMLCollection of target elements
 * @param {array} classArr - Class name string(s) to add to target elements
 * @param {integer} minTime - minimum random interval time (in milliseconds)
 * @param {integer} maxTime - maximum random interval time (in milliseconds)
 */
function addClassRandomly(els, classArr, minTime, maxTime) {
	// Keep track of the currently selected index as well as the previous.
	let previousIndex, randomIndex;

	// Adds class to random element from given collection
	let addClass = function() {
		do {
			// Find new random index (not the same as the previous index)
			randomIndex = getRandomInt(0, els.length);
		} while (randomIndex === previousIndex);
		previousIndex = randomIndex; // Update previous index

		// Remove all classArr classes from target elements
		for (let i = 0; i < els.length; i++) {
			for (let j = 0; j < classArr.length; j++) {
				els[i].classList.remove(classArr[j]);
			}
		}
		// Assign random class to random element (same class as before is ok)
		let classIndex = getRandomInt(0, classArr.length);
		els[randomIndex].classList.add(classArr[classIndex]);
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
 * Takes element data and loads YouTube thumbnail and title into DOM
 * @param {object} el - DOM element that has youtube data-id and title attrs
 */
function selectMedia(el) {
	let id = el.getAttribute('data-id');
	let title = el.getAttribute('title');

	// Insert video src into target iframe element
	let stage = document.getElementById('stage');
	let iframe = stage.getElementsByTagName('iframe')[0];
	let source = 'https://www.youtube.com/embed/' + id + '?rel=0';
	iframe.setAttribute('src', source);

	// Load title into iframe title element
	let titleEl = document.getElementById('stage-title');
	titleEl.innerText = title;

	// Navigate to player, in case scrolled off screen
	if (document.location.hash === '#get-media') location.href = '#get-media';
}


/**
 * Load thumbnails and titles for youtube videos
 */
function insertYouTubeThumbs() {
	// Find all img tags that need image lookup
	let els = document.getElementsByClassName('yt-thumb');
	for (let i = 0; i < els.length; i++) {
		// Grab data-id data from element, set as source
		let id = els[i].getAttribute('data-id');
		let src = 'http://img.youtube.com/vi/' + id + '/mqdefault.jpg';
		els[i].setAttribute('src', src);
		// Set element caption from title data
		let cap = els[i].parentElement.getElementsByTagName('figcaption')[0];
		cap.innerText = els[i].getAttribute('title');
	}
}

/**
 * Initial functions and event listeners
 */
function readyInit() {
	// Select all .title <a> elements
	let clickableEls = document.getElementsByClassName('title')[0]
		.getElementsByTagName('a');
	// Randomly add .spin or .wiggle classes to clickableEls
	addClassRandomly(clickableEls, ['spin', 'wiggle'], 2500, 8000);

	// Load youtube video thumbnails
	insertYouTubeThumbs();

	// Load the first video for display
	let firstYT = document.getElementsByClassName('yt-thumb')[0];
	selectMedia(firstYT);
}

// Listen to page hash location, to virtually show/hide content based on id
window.addEventListener('popstate', function(e) {
	let id = (document.location.hash !== '') ?
		document.location.hash.replace('#', '') : 'home';
	showPage(id);
});
