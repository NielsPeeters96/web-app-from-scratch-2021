export { renderCheckoutPage }

/**
 * Renders the content of the checkout page/route
 */
function renderCheckoutPage() {
    const checkoutFrom = document.querySelector('[data-checkout-from]');
    const checkoutTo = document.querySelector('[data-checkout-to]');
    const checkoutDate = document.querySelector('[data-checkout-date]');
    const checkoutPrice = document.querySelector('[data-checkout-price]');

    const fromLocation = localStorage.getItem('fromInputValue')
    const toLocation = localStorage.getItem('toInputValue')
    const departureDate = localStorage.getItem('dateInputValue')
    const finalPrice = localStorage.getItem('quotePrice')

    checkoutFrom.innerHTML = fromLocation
    checkoutTo.innerHTML = toLocation
    checkoutDate.innerHTML = departureDate
    checkoutPrice.innerHTML = finalPrice
}