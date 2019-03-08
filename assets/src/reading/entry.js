import Vue from 'vue'
import App from './app.vue'

(() => {
  const $ = require('../vender/jquery/jquery-3.3.1.min.js')
  const msg = 'Hello, world.'
  console.log(msg)
  $(() => {
    console.log($('body').text())
  })
  
  //console.log(111)
  

  new Vue({
    el: '#app',
    render: h => h(App)
  })
})()