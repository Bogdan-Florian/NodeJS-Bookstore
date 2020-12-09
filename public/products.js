window.addEventListener('DOMContentLoaded', event => {
  var addCart = document.getElementsByClassName("button-custom")[0];
  var userUUID = getCookie("UUID")
  if (typeof addCart !== 'undefined')
  {
    addCart.addEventListener("click", addToBasket, true); 
  }
  


function addToBasket() {
  let bookId = window.location.pathname.split("/").pop()
  let bookName = document.getElementById("book-name").innerText;
  let bookPrice = document.getElementsByClassName("price")[0].innerText.replace(/[^\d.-]/g, '');
  var book = {} 
  book = { name : bookName,
           price : bookPrice
          }
 
  if (isEmptyBasket())
   {
    var basketDictionary = {
      uuid:{userUUID},
      purchaseList: book
    }

     window.localStorage.setItem('Basket',JSON.stringify(basketDictionary))
  }
  
  else{
    
    var basketDictionary = JSON.parse(window.localStorage.getItem('Basket'))
    
    console.log(basketDictionary)
   if (basketDictionary.purchaseList[bookId] === undefined)
     {
      basketDictionary.purchaseList[bookId] = book
      window.localStorage.setItem('Basket', JSON.stringify(basketDictionary))
     }
    
    else{
      
      console.log("Book already in basket")
    }
      
    
    }
  }



function isEmptyBasket(){
  if (window.localStorage.getItem("Basket") === "empty")
    {
      console.log("Basket is empty")
     return true     
    }
  console.log("Basket not empty")
  return false
  
  
  
  
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  
  })