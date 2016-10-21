console.log('we ready')


var userBut = document.querySelector('.bbButton')
var loginBox = document.querySelector('.loginScreen')
var loginCloseBut = document.querySelector('.lsctClose')
var topBannerHolder = document.querySelector('.homeCoursel')
var userField = document.querySelector('.lsUser')
var passField = document.querySelector('.lsPass')
var loginInput = document.querySelector('.lsBut')
var loginUser = document.querySelector('.bannerUser')
var loginUserPic = document.querySelector('.bannerUserPic')
var topBannerIcons = document.querySelectorAll('.homeThing')





//
// var sendBloatData = {
//    username: "thisBigMan",
//    password: "testtest"
// }
//
//
// var sendBloatData2 = {
//    username: "thisBigManNumb2",
//    password: "testtesttest"
// }
//



var dummyData = [
   {
      category: 'pants',
      dateAdded: '2016-09-07',
      description: 'im a pair of pants',
      name: 'skinny jeans',
      originatorId: 17,
      price: 49.99,

   },
   {
      category: 'shirt',
      dateAdded: '2016-06-27',
      description: 'long-sleeve plaid',
      name: 'hipster plaid',
      originatorId: 24,
      price: 27.50,

   },
   {
      category: 'hat',
      dateAdded: '2016-06-27',
      description: 'long-sleeve plaid',
      name: 'hipster plaid',
      originatorId: 33,
      price: 67.50,

   },
   {
      category: 'shoes',
      dateAdded: '2016-06-27',
      description: 'long-sleeve plaid',
      name: 'hipster plaid',
      originatorId: 24,
      price: 67.87,

   },
   {
      category: 'jacket',
      dateAdded: '2016-06-27',
      description: 'long-sleeve plaid',
      name: 'hipster plaid',
      originatorId: 23,
      price: 67.87,

   },
   {
      category: 'shorts',
      dateAdded: '2016-06-27',
      description: 'long-sleeve plaid',
      name: 'hipster plaid',
      originatorId: 77,
      price: 67.87,

   },
]

for(var key in dummyData){
   console.log(dummyData[key])
   $.post('/add-product', JSON.stringify(dummyData[key])).then(function(superData){
      console.log(superData)
   })
}


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

   console.log('im here')

   if(loginBox.classList.contains('remove')){
      loginBox.classList.remove('remove')
   } else {
      loginBox.classList.add('remove')
   }



}

var topBannerFun = function(){
   console.log(topBannerIcons)


}

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
         console.log(userData)

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








// product json package: {"category":"assorted stuff","dateAdded":"2016-12-01","description":"nothing much to say here","name":"test2","originatorId":2,"price":3400.0,"productId":2}
userBut.addEventListener('click',loginFunction)
loginCloseBut.addEventListener('click', loginFunction)

loginInput.addEventListener('click', loginCheck)
