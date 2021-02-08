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
	const fromInputPlaceID = convertedLocationArr[0].Places[0].PlaceId
	const toInputPlaceID = convertedLocationArr[1].Places[0].PlaceId

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