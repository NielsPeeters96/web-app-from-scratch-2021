import { convertLocations } from "./places.js";
import {
    addSearchToLocalStorage,
    clearPrevSearch,
} from "../helpers/localStorage.js";

export { setSearchButtonEventListener };

function setSearchButtonEventListener() {
    const searchBtn = document.getElementById("search-btn");

    searchBtn.addEventListener("click", (e) => {
        const fromInputValue = document.querySelector("[data-form-from]").value;
        const toInputValue = document.querySelector("[data-form-to]").value;
        const dateInputValue = document.querySelector("[data-form-date]").value;

        clearPrevSearch();

        addSearchToLocalStorage(fromInputValue, toInputValue, dateInputValue);

        // Check whether the fields are empty or not
        const emptyFromField = fromInputValue.length === 0;
        const emptyToField = toInputValue.length === 0;
        const emptyDateField = dateInputValue.length === 0;

        if (emptyFromField || emptyToField || emptyDateField) {
            return;
        }

        // Prevent the listener to be called twice
        e.stopImmediatePropagation();

        // Prevent default after emtpy fields check
        // Otherwise the (HTML) error handling doesn't work correctly
        e.preventDefault();

        convertLocations(fromInputValue, toInputValue, dateInputValue);
    });
}
