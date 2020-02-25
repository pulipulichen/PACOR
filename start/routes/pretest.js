'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
| Middle的對應設定在 /start/kernel.js 裡面
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const ioc = require('@adonisjs/fold').ioc
const { HttpException } = use('@adonisjs/generic-exceptions') 

// --------------------

Route.any('/pretest/:article/:date', ({view, params}) => {
  let article = params.article
  return view.render('2020exp-articles.' + article)
})