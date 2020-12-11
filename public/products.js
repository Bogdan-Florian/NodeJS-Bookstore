const addCart = document.getElementsByClassName('button-custom')[0]
const checkout = document.getElementsByClassName('custom-file-upload')[0]

window.addEventListener('DOMContentLoaded', event => {


	if (typeof addCart !== 'undefined') {
		addCart.addEventListener('click', addToBasket, true)
	}
	checkout.addEventListener('click', checkoutItems, true)

})

function addToBasket() {
	const bookId = window.location.pathname.split('/').pop()
	if (isEmptyBasket()) {
		const basketList = [bookId]
		console.log(basketList)
		window.localStorage.setItem('Basket',JSON.stringify(basketList))

	} else{
		const basketList = JSON.parse(window.localStorage.getItem('Basket'))
		console.log(bookId, basketList)
		if (basketList.includes(bookId)) {
			alert('Book already in basket')
			return
		} else{
			basketList.push(bookId)
			window.localStorage.setItem('Basket', JSON.stringify(basketList))


		}


	}
	addCart.textContent = 'Item added'

}


function isEmptyBasket() {
	if (localStorage.getItem('Basket') === null) {
		console.log('Basket is empty')
		return true
	}
	console.log('Basket not empty')
	return false


}


function checkoutItems() {
	window.location.href = '/basket'


}

