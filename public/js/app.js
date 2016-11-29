console.log('we ready')


$.getJSON('/get-product', function(data){
   console.log(data)
})







// {"category":"assorted stuff","dateAdded":"2016-12-01","description":"nothing much to say here","name":"test2","originatorId":2,"price":3400.0,"productId":2}





var userBut = document.querySelector('.bbButton')
var loginBox = document.querySelector('.loginScreen')
var loginCloseBut = document.querySelector('.lsctClose')
var addProductBut = document.querySelector('.anptClose')
var closerLookBut = document.querySelector('.pcltClose')
var topBannerHolder = document.querySelector('.homeCoursel')
var userField = document.querySelector('.lsUser')
var passField = document.querySelector('.lsPass')
var loginInput = document.querySelector('.lsBut')
var loginUser = document.querySelector('.bannerUser')
var loginUserPic = document.querySelector('.bannerUserPic')
var topBannerIcons = document.querySelectorAll('.homeThing')
var closerLookName = document.querySelector('.pclName')
var closerLookPic = document.querySelector('.pclPic')
var closerLookCat = document.querySelector('.pclCat')
var closerLookDesc = document.querySelector('.pclDesc')
var closerLookPrice = document.querySelector('.pclPrice')
var closerLookDate = document.querySelector('.pclDate')
var closerLookHolder = document.querySelector('.productCloserLook')
var addNewHolder = document.querySelector('.addNewProduct')
var addNewCloseBut = document.querySelector('.anptClose')
var addNewName = document.querySelector('.anpName')
var addNewDesc = document.querySelector('.anpDesc')
var addNewPrice = document.querySelector('.anpPrice')
var addNewBut = document.querySelector('.anpBut')
var addNewCat = document.querySelector('.anpCat')
var startAddNew = document.querySelector('.vbBut')
/////////
var boxHolder = document.querySelector('.veryBottomFillContent')
//

$.getJSON('/get-products', function(superData){
   boxHolder.innerHTML = ''
   for (var key in superData){
      fillFirstContent(superData[key])
   }

})


var fillFirstContent = function(bigData){

   // console.log(bigData)



   var productHolder = document.createElement('div')
      productHolder.classList = "col-sm-3 productDiv"

      boxHolder.appendChild(productHolder)
      var productPic = document.createElement('img')

         productPic.id = bigData.productId
         productHolder.appendChild(productPic)
         switch (bigData.category) {
            case 'pants':
               productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/lederhosen-96.png'
               productPic.title = "Lederhosen"
               productPic.width = "124"
               break;
               // <img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/lederhosen-96.png" title="Lederhosen" width="96">
            case 'shirt':
               productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/t-shirt-96.png'
               productPic.title = "shirt"
               productPic.width = "124"
               break;
            case 'shoes':
               productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/trainers-96.png'
               productPic.title = "shoes"
               productPic.width = "124"
               break;
            case 'hat':
               productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Cultures/bowler_hat-96.png'
               productPic.title = "hat"
               productPic.width = "124"
               break;
            case 'jacket':

               productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/vegan_clothing-96.png'
               productPic.title = "jacket"
               productPic.width = "124"
               break;
            case 'shorts':
            //    // <img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/shorts-96.png" title="Shorts" width="96">

               productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/shorts-96.png'
               productPic.title = "shorts"
               productPic.width = "124"

               break;
            default:
               productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/sun_glasses-96.png'
               productPic.title = "default"
               productPic.width = "124"
               break;

         }
      window.location.hash = 'home'
      productHolder.addEventListener('click', takeCloserLook)
}


var takeCloserLook = function(wowData){

   // console.log(wowData.path[0].id)
   window.location.hash = wowData.path[0].id

}



var homePage = function(){

}


var routerController = function(){
   var currentHash = window.location.hash.slice(1)

   if(currentHash.length === 0) {
      return homePage()
   }

}

window.addEventListener('hashchange', routerController)
routerController()



// $.getJSON('/get-user', function(evt){
//    console.log(evt)
//
//    $.post('/login', JSON.stringify(sendBloatData)).then(function(evt){
//
//       console.log(evt)
//
//       $.getJSON('/get-user', function(evt){
//          console.log(evt)
//
//          $.post('/login', JSON.stringify(sendBloatData2)).then(function(evt){
//             $.getJSON('/get-user', function(evt){
//                console.log(evt)
//             })
//          })
//       })
//
//       $.post('/add-product', JSON.stringify(dummyData[0])).then(function(evt){
//          console.log(evt)
//
//          $.getJSON('/get-products', function(evt){
//             console.log(evt)
//          })
//       })
//
//
//    })
//
//
// })




var loginFunction = function(){

   // console.log('im here')

   if(loginBox.classList.contains('remove')){
      loginBox.classList.remove('remove')
   } else {
      loginBox.classList.add('remove')
   }



}

// var topBannerFun = function(){
//    console.log(topBannerIcons)
//
//
// }

topBannerHolder.addEventListener('mouseover', function(){

   console.log('hey')
   topBannerHolder.classList.remove('collapsed-el')
   // topBannerIcons[1].classList.remove('remove')
   // topBannerIcons[2].classList.remove('remove')
   // topBannerIcons[3].classList.remove('remove')

   topBannerHolder.addEventListener('mouseout', function(){
      topBannerHolder.classList.add('collapsed-el')
      // topBannerIcons[1].classList.add('remove')
      // topBannerIcons[2].classList.add('remove')
      // topBannerIcons[3].classList.add('remove')
   })

})

var loginCheck = function(){
   var loginData = {
      username: userField.value,
      password: passField.value
   }

   $.post('/login', JSON.stringify(loginData)).then(function(){
      $.getJSON('/get-user', function(userData){
         // console.log(userData)

         loginUser.textContent = userData.username
         loginUserPic.src = 'https://robohash.org/' + userData.username

         userBut.classList.add('remove')
         loginUser.classList.remove('remove')
         loginUserPic.classList.remove('remove')
         loginBox.classList.add('remove')

      })
   })
   userField.value = ''
   passField.value = ''



}

var filterTheContent = function(route){
   boxHolder.innerHTML = ''
   console.log(route)
   $.getJSON('/get-products', function(superData){
      for (var key in superData){
         if(superData[key].category === route){
            var productHolder = document.createElement('div')
               productHolder.classList = "col-sm-3 productDiv"

               boxHolder.appendChild(productHolder)
               var productPic = document.createElement('img')

                  productPic.id = superData[key].productId
                  productHolder.appendChild(productPic)
                  switch (superData[key].category) {
                     case 'pants':
                        productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/lederhosen-96.png'
                        productPic.title = "Lederhosen"
                        productPic.width = "124"
                        break;
                        // <img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/lederhosen-96.png" title="Lederhosen" width="96">
                     case 'shirt':
                        productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/t-shirt-96.png'
                        productPic.title = "shirt"
                        productPic.width = "124"
                        break;
                     case 'shoes':
                        productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/trainers-96.png'
                        productPic.title = "shoes"
                        productPic.width = "124"
                        break;
                     case 'hat':
                        productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Cultures/bowler_hat-96.png'
                        productPic.title = "hat"
                        productPic.width = "124"
                        break;
                     case 'jacket':

                        productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/vegan_clothing-96.png'
                        productPic.title = "jacket"
                        productPic.width = "124"
                        break;
                     case 'shorts':
                     //    // <img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/shorts-96.png" title="Shorts" width="96">

                        productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/shorts-96.png'
                        productPic.title = "shorts"
                        productPic.width = "124"

                        break;
                     default:
                        productPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/lederhosen-96.png'
                        productPic.title = "Lederhosen"
                        productPic.width = "124"
                        break;

                  }
               productHolder.addEventListener('click', takeCloserLook)

            }

      }
   })

}

var displayCloserlook = function(route){

   if(closerLookHolder.classList.contains('remove')){
      closerLookHolder.classList.remove('remove')

      $.getJSON('/get-products', function(bunchaData){
         console.log('hello123')
            for(var key in bunchaData){
               console.log(bunchaData[key].productId)
               console.log(route)
               console.log(parseInt(route))
               if(bunchaData[key].productId === parseInt(route)){
                  closerLookName.textContent = bunchaData[key].name
                  closerLookCat.textContent = bunchaData[key].category
                  closerLookDesc.textContent = bunchaData[key].description
                  closerLookDate.textContent = bunchaData[key].dateAdded
                  closerLookPrice.textContent = bunchaData[key].price
                  console.log('help')
                  switch (bunchaData[key].category) {
                     case 'pants':
                        closerLookPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/lederhosen-96.png'
                        closerLookPic.title = "Lederhosen"
                        closerLookPic.width = "124"
                        break;
                        // <img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/lederhosen-96.png" title="Lederhosen" width="96">
                     case 'shirt':
                        closerLookPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/t-shirt-96.png'
                        closerLookPic.title = "shirt"
                        closerLookPic.width = "124"
                        break;
                     case 'shoes':
                        closerLookPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/trainers-96.png'
                        closerLookPic.title = "shoes"
                        closerLookPic.width = "124"
                        break;
                     case 'hat':
                        closerLookPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Cultures/bowler_hat-96.png'
                        closerLookPic.title = "hat"
                        closerLookPic.width = "124"
                        break;
                     case 'jacket':

                        closerLookPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/vegan_clothing-96.png'
                        closerLookPic.title = "jacket"
                        closerLookPic.width = "124"
                        break;
                     case 'shorts':
                     //    // <img src="https://maxcdn.icons8.com/Color/PNG/96/Clothing/shorts-96.png" title="Shorts" width="96">

                        closerLookPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/shorts-96.png'
                        closerLookPic.title = "shorts"
                        closerLookPic.width = "124"

                        break;
                     default:
                        closerLookPic.src = 'https://maxcdn.icons8.com/Color/PNG/96/Clothing/sun_glasses-96.png'
                        closerLookPic.title = "default"
                        closerLookPic.width = "124"
                        break;

                  }

               }
            }
      })
   } else {
      closerLookHolder.classList.add('remove')
   }




}

var addProductFunction = function(){
   if(addNewHolder.classList.contains('remove')){
      addNewHolder.classList.remove('remove')
   } else {
      addNewHolder.classList.add('remove')
   }
}

var pushProduct = function(){
   var crntDate = new Date()

   $.getJSON('/get-user', function(data){
      var dummyProduct = {
            "category": addNewName.value,
            "dateAdded": crntDate.toDateString(),
            "description": addNewDesc.value,
            "name": addNewName.value,
            "originatorId": data.id,
            "price": addNewPrice.value

         }



         $.post('/add-product', JSON.stringify(dummyProduct)).then(function(){
            addNewName.value = ''
            addNewDesc.value = ''
            addNewPrice.value = ''
            addNewCat.value = ''
            addNewHolder.classList.add('remove')
            $.getJSON('/get-products', function(bigLongData){
               boxHolder.innerHTML = ''
               for( var keyB in bigLongData){
                  fillFirstContent(bigLongData[keyB])
               }
            })
         })
   })


}


var hashRouter = function(){
   var crntRoute = window.location.hash.slice(1)
   // console.log(crntRoute)

   // console.log(isNaN(crntRoute))

   switch (isNaN(crntRoute)) {
      case true:
         if(crntRoute === 'home'){
            $.getJSON('/get-products', function(theData){
               for(var keyC in theData){
                  fillFirstContent(theData[keyC])
               }
            })

         }
         // console.log('here')
         filterTheContent(crntRoute)

         break;
      default:
         // console.log('here1')
         displayCloserlook(crntRoute)
         break;

   }
}








// product json package: {"category":"assorted stuff","dateAdded":"2016-12-01","description":"nothing much to say here","name":"test2","originatorId":2,"price":3400.0,"productId":2}
userBut.addEventListener('click',loginFunction)
loginCloseBut.addEventListener('click', loginFunction)
closerLookBut.addEventListener('click', displayCloserlook)

window.addEventListener('hashchange', hashRouter)

loginInput.addEventListener('click', loginCheck)

addNewCloseBut.addEventListener('click', addProductFunction)
startAddNew.addEventListener('click', addProductFunction)
addNewBut.addEventListener('click', pushProduct)
