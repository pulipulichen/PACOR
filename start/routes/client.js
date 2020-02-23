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

// --------------------

Route.any('/client/auth/:action', (options) => {
  return controllerMapping(options, 'client', 'auth')
}).middleware(['webpage'])

Route.any('/client/Webpage/:action', (options) => {
  return controllerMapping(options, 'client', 'Webpage')
}).middleware(['webpage'])

/*
Route.any('/client/:controller/:action', (options) => {
  return controllerMapping(options, 'client')
}).middleware(['user', 'webpage'])
*/

// ------------------------

Route.any('/client/Annotation/:action', (options) => {
  return controllerMapping(options, 'client', 'Annotation')
}).middleware(['user', 'webpage'])

Route.any('/client/Highlight/:action', (options) => {
  return controllerMapping(options, 'client', 'Highlight')
}).middleware(['user', 'webpage'])

Route.any('/client/AnnotationSave/:action', (options) => {
  return controllerMapping(options, 'client', 'AnnotationSave')
}).middleware(['user', 'webpage'])

Route.any('/client/AnnotationTest/:action', (options) => {
  return controllerMapping(options, 'client', 'AnnotationTest')
}).middleware(['user', 'webpage'])

Route.any('/client/Section/:action', (options) => {
  return controllerMapping(options, 'client', 'Section')
}).middleware(['user', 'webpage'])

Route.any('/client/AnnotationRate/:action', (options) => {
  return controllerMapping(options, 'client', 'AnnotationRate')
}).middleware(['user', 'webpage', 'checkEnableCollaboration'])

Route.any('/client/AnnotationComment/:action', (options) => {
  return controllerMapping(options, 'client', 'AnnotationComment')
}).middleware(['user', 'webpage', 'checkEnableCollaboration'])

Route.any('/client/ReadingProgress/:action', (options) => {
  return controllerMapping(options, 'client', 'ReadingProgress')
}).middleware(['user', 'webpage'])

Route.any('/client/Questionnaire/:action', (options) => {
  return controllerMapping(options, 'client', 'Questionnaire')
}).middleware(['user', 'webpage'])

Route.any('/client/File/:action', (options) => {
  return controllerMapping(options, 'client', 'File')
}).middleware(['user', 'webpage'])

Route.any('/client/AnnotationTypeFilter/:action', (options) => {
  return controllerMapping(options, 'client', 'AnnotationTypeFilter')
}).middleware(['user', 'webpage'])

Route.any('/client/UserNotification/:action', (options) => {
  return controllerMapping(options, 'client', 'UserNotification')
}).middleware(['user', 'webpage', 'checkEnableCollaboration'])

Route.any('/client/UserFilter/:action', (options) => {
  return controllerMapping(options, 'client', 'UserFilter')
}).middleware(['user', 'webpage', 'checkEnableCollaboration'])

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
  //console.log(model)
  controllerInstance.instance.setModel(model)
  return controllerInstance.method.apply(controllerInstance.instance,[options])
}

Route.any('/client/resource/:model/:action', (options) => {
  return resourceControllerMapping(options)
}).middleware(['user', 'webpage'])

// -------------
