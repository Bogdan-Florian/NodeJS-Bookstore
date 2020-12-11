window.addEventListener('load', event => {

	removeItems()


	const buttons = document.querySelectorAll('.button-book').length
	console.log(buttons)
	for (let i = 0; i < buttons ; i++) {
		document.querySelectorAll('.button-book')[i].addEventListener('click', function() {

			const itemId = this.id
			const n = document.getElementById(itemId)
			remove(n)
			const basketList = JSON.parse(window.localStorage.getItem('Basket'))
			basketList.pop(itemId)
      			window.localStorage.setItem('Basket', JSON.stringify(basketList))

		})
	}


})


function setPriceTotal() {
	const elements = document.getElementById('book-price')
	for(let i=0; i<elements.length; i++) {
		console.log(elements)
	}


}

function removeItems() {
	const items = document.getElementsByClassName('book')
	const basket = window.localStorage.getItem('Basket')
	console.log(basket)
	console.log(items)
	let i
	for(i=0; i < items.length; i++) {
		if(basket.includes(items[i].id)) {
			console.log('Y')
		} else{
			const n = document.getElementById(items[i].id)
			remove(n)


		}


	}
	setPriceTotal()

}

function remove(node) {
	while (node.firstChild) {
		node.firstChild.remove()
	}
}
