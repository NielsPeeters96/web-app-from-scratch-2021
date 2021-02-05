/**
 * Initialize the app and return the headers, so it can be used in another function.
 */
function init () {
	const superSecretApiKey = "567539acfemsh057d2628e235702p1b4c6djsn41e3c8996400"
	const apiHost = "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"

	const headers = {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": superSecretApiKey,
			"x-rapidapi-host": apiHost
		}
	}

	setEventListeners(headers);
}

/**
 * Get all the data that the user needs
 * 
 * @param {string} url 
 * @param {object} headers 
 */
async function getData(url, headers) {
	const result = await getResults(url, headers);

	if (result.Quotes.length <= 0) {
		// @TODO Error handling (no flights/ticket available)
		return
	}

	getCarrierData(result);
	getPriceData(result);

	setDetailButtonListener();
}

/**
 * Get all the data of the carrier that the user needs
 * 
 * @param {object} result 
 */
function getCarrierData (result) {
	result.Carriers.forEach(el => {
		let div = document.createElement('div');
		div.className = 'card'

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
 * @param {object} result 
 */
function getPriceData (result) {
	result.Quotes.forEach((el, i) => {
		const minPrice = document.querySelectorAll('.min-price');
		const modalMinPrice = document.querySelectorAll('.modal-price');

		const formattedPrice = `€${el.MinPrice},00`;
		minPrice[i].innerHTML = formattedPrice;
		modalMinPrice[i].innerHTML = formattedPrice;
	})
}

/**
 * Returns an object with all the data that is fetched by the API
 * 
 * @param {string} url
 * @param {object} headers
 */

async function getResults(url, headers) {
	return fetch(url, headers)
	  .then((response) => response.json())
	  .then((data) => data);
}

/**
 * Returns the final url that will be fetched
 * 
 * All those parameters are required.
 * Can be dynamic, based on user input, in the future.
 * 
 * @param {string} departure 
 * @param {string} destination 
 * @param {string} date 
 */
function setParameters (departure, destination, date) {
	const country = 'NL';
	const currency = 'EUR';
	const locale = 'nl-NL';
	let departureAirportCode = departure;
	let destinationAirportCode = destination
	const departureDate = date;

	return url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${departureAirportCode}-sky/${destinationAirportCode}-sky/${departureDate}`;
}

/**
 * Set all the event listeners
 * 
 * @param {object} headers 
 */
function setEventListeners(headers) {
	const searchBtn = document.getElementById('search-btn');

	searchBtn.addEventListener('click', () => {
		const departureLocation = document.getElementById('departureLocation').value;
		const destinationLocation = document.getElementById('destinationLocation').value;
		const departureDate = document.getElementById('departureDate').value;
	
		// @TODO Also accept requests like Amsterdam or Stockholm
		// Only accepts/understands AMS & ARN, right now
	
		const cards = document.querySelectorAll('.card');
	
		cards.forEach(card => {
			card.remove();
		})
	
		if (departureLocation.length === 0 || destinationLocation.length === 0) {
			// @TODO Error handling (empty field(s))
			return
		}
	
		setParameters(departureLocation, destinationLocation, departureDate);
	
		getData(url, headers);
	});
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

init();