import { API_KEY, API_HOST } from '../constants/api.js';

export { getResults };

const headers = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': API_KEY,
		'x-rapidapi-host': API_HOST,
	},
};

/**
 * @param {string} url - URL that needs to be fetched
 *
 * @returns {Object} data - All the data that is fetched by the API
 */
async function getResults(url) {
	return fetch(url, headers)
		.then(function (response) {
			if (!response.ok) {
				// @TODO Make difference between 400, 401 & 404
				throw Error(response.statusText);
			}

			return response.json();
		})
		.then(function (data) {
			return data;
		})
		.catch(function (error) {
			console.log(error);
		});
}
