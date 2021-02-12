import './routie.js';

import { setSearchButtonEventListener } from '../modules/search.js';

export function handleRoutes() {
	routie({
		'': function () {
			updateUI('home');
			setSearchButtonEventListener();
		},
		checkout: function () {
			updateUI('checkout');
		},
		'*': function () {
			updateUI('not-found');
		},
	});
}

function updateUI(route) {
	const sections = document.querySelectorAll('section');
	const activeSection = document.querySelector(`[data-route=${route}]`);

	sections.forEach((section) => {
		section.classList.remove('active');
		section.setAttribute('aria-hidden', 'true');
		section.hidden = true;
	});

	activeSection.classList.add('active');
	activeSection.setAttribute('aria-hidden', 'false');
	activeSection.hidden = false;
}
