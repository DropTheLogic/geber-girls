/**
 * Adds given class name to the body element (while removing any other classes)
 * @param {string} classColor - name of class to add
 */
function setColorClass(classColor) {
	document.getElementsByTagName('body')[0].classList = classColor;
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

// Listen to page hash location, to virtually show/hide content based on id
window.addEventListener('popstate', function(e) {
	let id = (document.location.hash !== '') ?
		document.location.hash.replace('#', '') : 'home';
	showPage(id);
});
