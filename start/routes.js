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

// 進入管理或文件管理
Route.on('/').render('index')

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

const ioc = require('@adonisjs/fold').ioc
const { HttpException } = use('@adonisjs/generic-exceptions') 

let controllerMapping = (options, module, controller, action) => {
  const params = options.params
  if (typeof(module) !== 'string' && typeof(params.module) === 'string') {
    module = params.module
  }
  if (typeof(controller) !== 'string' && typeof(params.controller) === 'string') {
    controller = params.controller
  }
  if (typeof(action) !== 'string' && typeof(params.action) === 'string') {
    action = params.action
  }
  
  if (action.startsWith('_')) {
    throw new HttpException(`${module}/${controller}.${action} is not public method.`, 404)
  }
  
  const controllerPath = `App/Controllers/Http/${module}`
  const url = `${controllerPath}/${controller}.${action}`
  const controllerInstance = ioc.makeFunc(url)
  return controllerInstance.method.apply(controllerInstance.instance,[options])
}

// ----------------------------
Route.on('/admin').render('admin')


Route.any('/admin/:controller/:action', (options) => {
  return controllerMapping(options, 'admin')
})


// --------------------------------

Route.on('/material').render('material')

// Read material assets
let routePrefix = '/material/asset/:id'
//Route.get(routePrefix, 'Material/Asset.get')
for (let i = 0; i < 10; i++) {
  routePrefix = routePrefix + `/:folderLevel${i}?`
  Route.get(routePrefix, 'Material/Asset.get')
}

Route.any('/material/:controller/:action', (options) => {
  return controllerMapping(options, 'material')
})
