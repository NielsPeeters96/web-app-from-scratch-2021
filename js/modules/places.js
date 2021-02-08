import { getResults } from './fetch.js'
import { getQuotesData, setQuotesUrl } from './quotes.js'
import { API_URL } from '../constants/api.js'

export { convertLocations }

/**
 * The quotes endpoint only accepts specific airport codes like AMS-sky and JFK-sky
 * This is not user friendly, so values like Amsterdam first needs to be converted
 * This function will convert i.e. Amsterdam to AMS-sky
 * 
 * @param {string} fromInput - From location input
 * @param {string} toInput  - To location input
 * @param {Date} dateInput -  Date input
 */

async function convertLocations(fromInput, toInput, dateInput) {
	// Create array with the locations
	let locationArr = [];
	locationArr.push(fromInput);
	locationArr.push(toInput);

	const convertedLocationArr = [];

	// Convert the input for each item in the array
	for (const loc of locationArr) {

		const convertUrl = setConvertUrl(loc)

		const convertedResult = await getResults(convertUrl);

		convertedLocationArr.push(convertedResult);
	}

    // Set the result to new variable
    const inputPlaceIDs = setInputPlaceID(convertedLocationArr)
    const fromInputPlaceID = inputPlaceIDs[0]
    const toInputPlaceID = inputPlaceIDs[1]

    addAirportCodesToLocalStorage(fromInputPlaceID, toInputPlaceID)

	// Call the endpoint with the converted places to show the quotes
	const quoteUrl = setQuotesUrl(fromInputPlaceID, toInputPlaceID, dateInput)

	// Get the data with the converted values
	getQuotesData(quoteUrl);

	// Empty the array
	locationArr = []
}

/**
 * Set all the parameters that are required for the endpoint
 * Static right now, but can be dynamic (based on user input) later
 * 
 * @param {string} input - Unconverted location
 * 
 * @returns {string} url - The right endpoint based on the users' input that will be fetched later
 */
function setConvertUrl(input) {
	const country = 'NL';
	const currency = 'EUR';
	const locale = 'nl-NL';

    return `${API_URL}/autosuggest/v1.0/${country}/${currency}/${locale}/?query=${input}`
	
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

/**
 * Set the place ID of the inputs
 * 
 * It is not possible to search for an aiport, yet
 * When you search for 'London', the code 'LOND-sky' will be used
 * 'LOND-sky' includes all the airports with the name London
 * Including London and East London in Canada & South Africa.
 * You don't want that, so if the code is longer than 7 characters
 * The second element (most used airport) in the array will be used
 * 'LOND-sky' is longer than 7 chars, but 'LHR' isn't. 'LHR' will be used
 * This won't be needed if you can choose between airports, but that's not
 * possible yet
 * 
 * 
 * @param {Array} convertedLocationArr - Array with all the converted location codes
 * 
 * @returns {Array} [fromInputPlaceID, toInputPlaceID]
 */
function setInputPlaceID (convertedLocationArr) {
    const fromInputPlaceID = setFromInputPlaceID(convertedLocationArr)
    const toInputPlaceID = setToInputPlaceID(convertedLocationArr)

    function setFromInputPlaceID (convertedLocationArr) {
        if (convertedLocationArr[0].Places[0].PlaceId.length > 7) {
            return convertedLocationArr[0].Places[1].PlaceId
        } else {
            return convertedLocationArr[0].Places[0].PlaceId
        }
    }

    function setToInputPlaceID(convertedLocationArr) {
        if (convertedLocationArr[1].Places[0].PlaceId.length > 7) {
            return convertedLocationArr[1].Places[1].PlaceId
        } else {
            return convertedLocationArr[1].Places[0].PlaceId
        }
    }

    return [fromInputPlaceID, toInputPlaceID]
}