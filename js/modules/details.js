import { renderCheckoutPage } from './checkout.js';

export { setDetailButtonListener };

/**
 * Set a event listener to the detail button
 * Needs to happen after data is fetched (& the card is created)
 */
function setDetailButtonListener() {
	const detailsBtns = document.querySelectorAll('.details-btn');

	detailsBtns.forEach((button, i) => {
		button.addEventListener('click', (e) => {
			const detailsModal = document.querySelector('.details-modal');
			detailsModal.classList.remove('hidden');
			const card = e.target.parentNode;
			const carrier = card.childNodes[1].innerHTML;
			const price = card.childNodes[3].innerHTML;

			renderDetailsModal(carrier, price);

			detailsModal.addEventListener('click', (e) => {
				if (e.target !== detailsModal) {
					return;
				}

				detailsModal.classList.add('hidden');
			});
		});
	});
}

/**
 * Renders the details modal
 *
 * @param {string} carrier
 * @param {string} price
 */
function renderDetailsModal(carrier, price) {
	const airports = document.querySelector('[data-modal-airports]');
	const modalPrice = document.querySelector('[data-modal-price]');
	const modalAirline = document.querySelector('[data-modal-airline]');
	const bookBtn = document.querySelector('[data-modal-btn]');
	const closeBtn = document.querySelector('[data-modal-close]');

	const detailsModal = document.querySelector('.details-modal');

	const fromAirportCode = localStorage.getItem('fromAirportCode');
	const toAirportCode = localStorage.getItem('toAirportCode');

	airports.textContent = `${fromAirportCode} ${toAirportCode}`;
	modalAirline.textContent = carrier;
	modalPrice.textContent = price;

	bookBtn.addEventListener('click', () => {
		localStorage.setItem('quotePrice', price);
		location.hash = 'checkout';
		renderCheckoutPage();
	});

	// @TODO Event listener fires ++ every time
	closeBtn.addEventListener('click', () => {
		detailsModal.classList.add('hidden');
	});
}
