/**
 * Clears local storage values of last search
 */
export function clearPrevSearch() {
	localStorage.removeItem('fromInputValue')
	localStorage.removeItem('toInputValue')
	localStorage.removeItem('dateInputValue')
	localStorage.removeItem('fromAirportCode')
	localStorage.removeItem('toAirportCode')
	localStorage.removeItem('quotePrice')
}