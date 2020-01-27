const ioc = require('@adonisjs/fold').ioc
const { HttpException } = use('@adonisjs/generic-exceptions') 

// ------------

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

module.exports = controllerMapping