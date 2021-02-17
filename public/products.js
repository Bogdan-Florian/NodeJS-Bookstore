const addCart = document.getElementsByClassName('button-custom')[0]
const checkoutItems = document.getElementsByClassName('custom-file-upload')[0]

window.addEventListener('DOMContentLoaded', event => {
	console.log('DOM Loaded')
	addCart.addEventListener('click', addToBasket, true)
	checkoutItems.addEventListener('click', checkoutRedirect, true)
  
})

function checkoutRedirect() {
  	window.location.href = '/basket'

}

function addToBasket() {
	const bookId = window.location.pathname.split('/').pop()
	console.log(bookId)
	console.log('Book added to basket')
	$.post('/addItem',
		{
			id: bookId,
			city: 'Duckburg'
		},
		(data, status) => {
			if (data === 'failed') {
				alert('Book already in basket')
			}
		})
}

