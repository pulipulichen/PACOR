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

Route.on('/chat').render('chat')

// 進入管理或文件管理
Route.on('/').render('index')

// ------------------------------------------

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
}).middleware(['admin'])

// ----------------------------

Route.any('/client/auth/:action', (options) => {
  return controllerMapping(options, 'client', 'auth')
}).middleware(['webpage'])

/*
Route.any('/client/:controller/:action', (options) => {
  return controllerMapping(options, 'client')
}).middleware(['user', 'webpage'])
*/

// -------------------------------

let resourceControllerMapping = (options, model, action) => {
  const params = options.params
  if (typeof(model) !== 'string' && typeof(params.model) === 'string') {
    model = params.model
  }
  
  if (typeof(action) !== 'string' && typeof(params.action) === 'string') {
    action = params.action
  }
  
  if (action.startsWith('_')) {
    throw new HttpException(`Client/WebpageUserBaseController.${action} is not public method.`, 404)
  }
  
  const controllerPath = `App/Controllers/Http/Client`
  const url = `${controllerPath}/WebpageUserBaseController.${action}`
  const controllerInstance = ioc.makeFunc(url)
  console.log(model)
  controllerInstance.instance.setModel(model)
  return controllerInstance.method.apply(controllerInstance.instance,[options])
}

Route.any('/client/resource/:model/:action', (options) => {
  return resourceControllerMapping(options)
}).middleware(['user', 'webpage'])

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
