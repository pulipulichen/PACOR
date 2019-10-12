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
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')

// ------------------------------------------

Route.get('/client/user/login', 'Client/UserController.login')
Route.get('/client/user/register', 'Client/UserController.register')
Route.get('/client/user/logout', 'Client/UserController.logout')
Route.get('/client/user/check-login', 'Client/UserController.checkLogin')
Route.get('/client/user/attempt-login-via-username', 'Client/UserController.attemptLoginViaUsername')

Route.get('/client/message/list', 'Client/MessageController.list')
Route.get('/client/message/sync-list', 'Client/MessageController.syncList')
Route.post('/client/message/insert', 'Client/MessageController.insert')
Route.post('/client/message/upload', 'Client/MessageController.upload')

Route.get('/client/oauth/request/:driver', 'Client/UserController.oauthRequest')
Route.get('/client/oauth/authenticated/:driver', 'Client/UserController.oauthAuthenticated')
Route.get('/client/oauth/login', 'Client/UserController.oauthLogin')

// ---------------------------

Route.on('/admin').render('admin')
Route.get('/admin/user/list', 'Admin/UserController.list')

Route.on('/').render('admin')
Route.group(() => {
  // Binds '/users' to 'App/Controllers/Http/Admin/UserController'
  Route.resource('/users', 'UserController')
}).namespace('admin')