export { clearPrevSearch, addSearchToLocalStorage, addAirportCodesToLocalStorage }

/**
 * Clears local storage values of last search
 */
function clearPrevSearch() {
	localStorage.removeItem('fromInputValue')
	localStorage.removeItem('toInputValue')
	localStorage.removeItem('dateInputValue')
	localStorage.removeItem('fromAirportCode')
	localStorage.removeItem('toAirportCode')
	localStorage.removeItem('quotePrice')

    // Remove previous cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.remove();
    })
}

/**
 * Adds the input values to local storage, so they can be used
 * later in the app
 * 
 * @param {string} fromInputValue 
 * @param {string} toInputValue 
 * @param {string} dateInputValue 
 */
function addSearchToLocalStorage(fromInputValue, toInputValue, dateInputValue) {
	localStorage.setItem('fromInputValue', fromInputValue)
	localStorage.setItem('toInputValue', toInputValue)
	localStorage.setItem('dateInputValue', dateInputValue)
}

/**
 * Adds the airport codes to localStorage, so they can be used
 * later in the app.
 * 
 * @param {string} fromInputPlaceID - i.e. AMS-sky
 * @param {string} toInputPlaceID - i.e. JFK-sky
 */
function addAirportCodesToLocalStorage(fromInputPlaceID, toInputPlaceID) {
    const fromAirportCode = removeSkySuffix(fromInputPlaceID)
    const toAirportCode = removeSkySuffix(toInputPlaceID)

    /**
     * Removes the last 4 characters ('-sky') of the string
     * 
     * @param {string} placeID 
     * 
     * @returns {string} airportCode without '-sky' suffix
     */
    function removeSkySuffix (placeID) {
        return placeID.substr(0, placeID.length - 4)
    }

    localStorage.setItem('fromAirportCode', fromAirportCode)
    localStorage.setItem('toAirportCode', toAirportCode)
}