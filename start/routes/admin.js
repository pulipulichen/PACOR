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
const controllerMapping = use('./lib/controllerMapping.js')

//Route.on('/chat').render('chat')

// 進入管理或文件管理
Route.on('/').render('index')
//Route.on('/test-lorem-ipsum').render('test-lorem-ipsum')

// ------------------------------------------
/*
Route.get('/client/user/login', 'Client/UserController.login').middleware(['origin', 'referer'])
Route.get('/client/user/register', 'Client/UserController.register').middleware(['origin', 'referer'])
Route.get('/client/user/logout', 'Client/UserController.logout')
Route.get('/client/user/check-login', 'Client/UserController.checkLogin').middleware(['origin', 'referer'])
Route.get('/client/user/attempt-login-via-username', 'Client/UserController.attemptLoginViaUsername').middleware(['origin', 'referer'])

Route.get('/client/message/list', 'Client/MessageController.list').middleware(['origin', 'referer'])
Route.get('/client/message/sync-list', 'Client/MessageController.syncList').middleware(['origin', 'referer'])
Route.post('/client/message/insert', 'Client/MessageController.insert').middleware(['origin', 'referer'])
Route.post('/client/message/upload', 'Client/MessageController.upload').middleware(['origin', 'referer'])

Route.get('/client/oauth/request/:driver', 'Client/UserController.oauthRequest').middleware(['origin', 'referer'])
Route.get('/client/oauth/authenticated/:driver', 'Client/UserController.oauthAuthenticated').middleware(['origin', 'referer'])
Route.get('/client/oauth/login', 'Client/UserController.oauthLogin').middleware(['origin', 'referer'])
*/
// ---------------------------

// --------------------

// ----------------------------

Route.on('/admin').render('admin')

Route.any('/admin/:controller/:action', (options) => {
  return controllerMapping(options, 'admin')
}).middleware(['admin'])

// --------------------------------

Route.on('/material').render('material')

// Read material assets
let routePrefix = '/material/asset/:id'
//Route.get(routePrefix, 'Material/Asset.view')
for (let i = 0; i < 10; i++) {
  routePrefix = routePrefix + `/:folderLevel${i}?`
  Route.get(routePrefix, 'Material/Asset.view')
}

Route.any('/material/:controller/:action', (options) => {
  return controllerMapping(options, 'material')
}).middleware(['admin'])

// ----------------------------
