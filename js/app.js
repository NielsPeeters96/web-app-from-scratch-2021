import { convertLocations } from './modules/places.js'
import { handleRoutes } from './utils/router/router.js'
import { clearPrevSearch, addSearchToLocalStorage } from './utils/helpers/localStorage.js'

function main () {
	handleRoutes();
	clearPrevSearch();

	const searchBtn = document.getElementById('search-btn');

	searchBtn.addEventListener('click', () => {
		const fromInputValue = document.querySelector('[data-form-from]').value;
		const toInputValue = document.querySelector('[data-form-to]').value;
		const dateInputValue = document.querySelector('[data-form-date]').value;

		clearPrevSearch()

		addSearchToLocalStorage(fromInputValue, toInputValue, dateInputValue)

		const cards = document.querySelectorAll('.card');

		cards.forEach(card => {
			card.remove();
		})

		// This can also be done with HTML, but this is OK for now
		const emptyFromField = fromInputValue.length === 0;
		const emptyToField = toInputValue.length === 0;
		const emptyDateField = dateInputValue.length === 0;

		if (emptyFromField) {
			// @TODO Error handling (no from specified)
			return
		}

		if (emptyToField) {
			// @TODO Error handling (no to specified)
			return
		}

		if (emptyDateField) {
			// @TODO Error handling (no date specified)
			return
		}

		convertLocations(fromInputValue, toInputValue, dateInputValue)
	});
}

main()