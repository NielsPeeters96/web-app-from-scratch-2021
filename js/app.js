import { convertLocations } from './modules/places.js'

function main () {
	const searchBtn = document.getElementById('search-btn');

	searchBtn.addEventListener('click', () => {
		const fromInputValue = document.getElementById('fromLocation').value;
		const toInputValue = document.getElementById('toLocation').value;
		const dateInputValue = document.getElementById('departureDate').value;

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