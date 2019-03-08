(() => {
  const $ = require('../vender/jquery/jquery-3.3.1.min.js')
  const msg = 'Hello, world111.'
  console.log(msg)
  $(() => {
    console.log($('body').text())
  })
  
  //console.log(111)
})()