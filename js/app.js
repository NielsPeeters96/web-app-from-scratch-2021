/**
 * Initialize the app
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
 * @param {String} url 
 * @param {Object} headers 
 */
async function getData(url, headers) {
	const result = await getResults(url, headers);

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
 * @param {Object} result 
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
 * @param {Object} result 
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
 * Returns an object with all the data that is fetched by the API
 * 
 * @param {String} url
 * @param {Object} headers
 */
async function getResults(url, headers) {
	return fetch(url, headers)
		.then(function(response) {
			if (!response.ok) {
				// @TODO Make difference between 400, 401 & 404
				throw Error(response.statusText);
			}
			
			return response.json();
		}).then(function(data) {
			return data;
		}).catch(function(error) {
			console.log(error);
		});
}

async function convertLocations(fromInput, toInput, date, headers) {
	// Create array with the locations
	let locationArr = []
	locationArr.push(fromInput)
	locationArr.push(toInput)

	const convertedLocationArr = [];

	// Convert the input for each item in the array
	for (loc of locationArr) {
		setConvertParams(loc)

		const convertedResult = await getResults(url, headers);

		convertedLocationArr.push(convertedResult);
	}

	const fromInputPlaceID = convertedLocationArr[0].Places[0].PlaceId
	const toInputPlaceID = convertedLocationArr[1].Places[0].PlaceId

	// Call the endpoint with the converted places to show the data
	setParameters(fromInputPlaceID, toInputPlaceID, date)

	// Get the data with the converted values
	getData(url, headers);

	// Empty the array
	locacationArr = []
}

function setConvertParams(input) {
	const country = 'NL';
	const currency = 'EUR';
	const locale = 'nl-NL';
	const apiURL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices'

	return url = `${apiURL}/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${input}`
}

/**
 * Returns the final url that will be fetched
 * 
 * All those parameters are required.
 * Can be dynamic, based on user input, in the future.
 * 
 * @param {String} departure 
 * @param {String} destination 
 * @param {String} date 
 */
function setParameters (departure, destination, date) {
	const country = 'NL';
	const currency = 'EUR';
	const locale = 'nl-NL';
	let departureAirportCode = departure;
	let destinationAirportCode = destination
	const departureDate = date;

	const apiURL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices'

	// Browse quotes
	return url = `${apiURL}/browsequotes/v1.0/${country}/${currency}/${locale}/${departureAirportCode}/${destinationAirportCode}/${departureDate}`;
}

/**
 * Set all the event listeners
 * 
 * @param {Object} headers 
 */
function setEventListeners(headers) {
	const searchBtn = document.getElementById('search-btn');

	searchBtn.addEventListener('click', () => {
		const fromInputValue = document.getElementById('departureLocation').value;
		const toInputValue = document.getElementById('destinationLocation').value;
		const departureDate = document.getElementById('departureDate').value;
	
		const cards = document.querySelectorAll('.card');
	
		cards.forEach(card => {
			card.remove();
		})
	
		if (departureLocation.length === 0 || destinationLocation.length === 0) {
			// @TODO Error handling (empty field(s))
			return
		}
	
		convertLocations(fromInputValue, toInputValue, departureDate, headers)
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