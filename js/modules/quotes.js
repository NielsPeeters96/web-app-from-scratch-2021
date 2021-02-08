import { getResults } from './fetch.js'
import { API_URL } from '../constants/api.js'

export { getQuotesData, setQuotesUrl }

/**
 * Get all the data that the user needs
 * 
 * @param {string} url - The right quotes endpoint (based on user input)
 */
async function getQuotesData(url) {
	const result = await getResults(url);

	if (result === undefined) {
		// @TODO Error handling (wrong location or date in the past)
		console.log('Wrong location or date in past')
		return
	}

	if (result.Quotes.length <= 0) {
		// @TODO Error handling (no flights/ticket available)
		console.log('No ticket/flights available')
		return
	}

	setCarrierData(result);
	setPriceData(result);

	setDetailButtonListener();
}

/**
 * Get all the data of the carrier that the user needs
 * 
 * @param {Object} result - The fetched data from the quotes endpoint
 */
function setCarrierData (result) {
	result.Carriers.forEach(el => {
		let div = document.createElement('div');
		div.className = 'card'

		// @TODO One (dynamic) modal instead of a modal for every card
		const card = `
			<p class="carier">${el.Name}</p>
			<p class="min-price">€</p>
			<button class="details-btn btn">Details</button>

			<div class="card-modal details-modal hidden">
				<div class="card-modal__content">
					<h1 id="modal-locations">AMS - JFK</h1>
					<h2 class="modal-price"></h2>
					<small id="modal-airline">${el.Name}</small>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id saepe exercitationem sit, atque consequuntur ea natus officia dolor vero autem!</p>
				</div>
			</div>
		`
		div.innerHTML = card;
		const container = document.querySelector('.container');

		container.appendChild(div);
	})
}

/**
 * Get all the data of the price that the user needs
 * 
 * @param {Object} result - The fetched data from the quotes endpoint
 */
function setPriceData (result) {
	result.Quotes.forEach((el, i) => {
		const minPrice = document.querySelectorAll('.min-price');
		const modalMinPrice = document.querySelectorAll('.modal-price');

		const formattedPrice = `€${el.MinPrice},00`;
		minPrice[i].innerHTML = formattedPrice;
		modalMinPrice[i].innerHTML = formattedPrice;
	})
}

/**
 * Returns the final url that will be fetched
 * 
 * All those parameters are required.
 * Can be dynamic, based on user input, in the future.
 * 
 * @param {string} fromLocationCode - Airport code of the location the users wants to flight from
 * @param {string} toLocationCode - Airport code of the location the users wants to flight to
 * @param {string} departureDate  - Date the user wants to flight/leave
 * 
 * @returns {string} url - The right endpoint based on the users' input that will be fetched later
 */
function setQuotesUrl (fromLocationCode, toLocationCode, departureDate) {
	const country = 'NL';
	const currency = 'EUR';
	const locale = 'nl-NL';

	// Browse quotes
	return `${API_URL}/browsequotes/v1.0/${country}/${currency}/${locale}/${fromLocationCode}/${toLocationCode}/${departureDate}`;
}

/**
 * Set a event listener to the detail button
 * Needs to happen after data is fetched (& the button is created)
 */
function setDetailButtonListener () {
	const detailsBtns = document.querySelectorAll('.details-btn');

	detailsBtns.forEach((button, i) => {
		button.addEventListener('click', () => {
			const detailsModals = document.querySelectorAll('.details-modal');
			detailsModals[i].classList.toggle('hidden');

			// Make the modal disappear if you click outside of it
			// @TODO Make it work (only works once right now)
			detailsModals.forEach(detailsModal => {
				detailsModal.addEventListener('click', (e) => {
					
					if (e.target !== detailsModal) {
						return
					}

					detailsModal.classList.toggle('hidden');
				})
			})
		})
	})
}