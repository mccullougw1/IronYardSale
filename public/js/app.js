console.log('we ready')

$.getJSON('/get-product', function(data){
   console.log(data)
})







// {"category":"assorted stuff","dateAdded":"2016-12-01","description":"nothing much to say here","name":"test2","originatorId":2,"price":3400.0,"productId":2}


// var dummyData = [
//    {
//       category: 'pants',
//       dateAdded: '2016-09-07',
//       description: 'im a pair of pants',
//       name: 'skinny jeans',
//       originatorId: 17,
//       price: 49.99,
//       productId: 1
//    },
//    {
//       category: 'shirt',
//       dateAdded: '2016-06-27',
//       description: 'long-sleeve plaid',
//       name: 'hipster plaid',
//       originatorId: 24,
//       price: 27.50,
//       productId: 2
//    }
// ]
//
//
//
// var sendBloatData = {
//    username: "thisBigMan",
//    password: "testtest"
// }

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
