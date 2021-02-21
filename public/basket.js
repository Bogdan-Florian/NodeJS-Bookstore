
window.addEventListener('DOMContentLoaded', event => {


  
  document.querySelectorAll('.button-book').forEach(item => {
  item.addEventListener('click', event => {
    removeFromBasket(item.id)
  })
})
  
  
 
                                          
                                                    
});


function removeFromBasket(bookId){
  
	$.post('/removeFromBasket',
		{
			id: bookId,
		},
		(data, status) => {
			if (data === 'failed') {
				alert('Book already in basket')
			}
    else{
      location.href = "/basket"
    }
		})
  

  
  
}



