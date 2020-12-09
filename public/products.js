window.addEventListener('DOMContentLoaded', event => {
	const addCart = document.getElementsByClassName('button-custom')[0]
	if (typeof addCart !== 'undefined') {
		addCart.addEventListener('click', addToBasket, true)
	}
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
		} else{
			basketList.push(bookId)
			window.localStorage.setItem('Basket', JSON.stringify(basketList))


		}
	}


}


function isEmptyBasket() {
	if (window.localStorage.getItem('Basket') === 'empty') {
		console.log('Basket is empty')
		return true
	}
	console.log('Basket not empty')
	return false


}

