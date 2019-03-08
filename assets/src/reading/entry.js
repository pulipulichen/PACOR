import Vue from 'vue'
//const Vue = require('vue')
//const App = require('./app.vue')
import App from './app.vue'

(function () {
  //const App = require('./app.vue')
  require('./style.css')
  
  new Vue({
    el: '#app',
    render: h => h(App)
  })
})()
