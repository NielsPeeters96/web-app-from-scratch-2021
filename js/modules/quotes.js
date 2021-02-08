import { getResults } from './fetch.js'
import { API_URL } from '../constants/api.js'
import { setDetailButtonListener  } from './details.js'

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
			<h2 class="carier">${el.Name}</h2>
			<p class="min-price">€</p>
			<button class="details-btn btn">Details</button>

		`
		div.innerHTML = card;
		const cardContainer = document.querySelector('.card-container');

		cardContainer.appendChild(div);
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

		const formattedPrice = `${el.MinPrice},00`;
		minPrice[i].innerHTML += formattedPrice;
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