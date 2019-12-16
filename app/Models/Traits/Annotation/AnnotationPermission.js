'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationPermission {

  register(Model) {
    
    Model._setPermission = async function (webpage, user, data, instance) {
      let config = await user.getCurrentReadingProgressStepConfig(webpage)
      if (!config) {
        throw new Error('config is undefined')
      }
      let permissionConfig = config.permission
      if (typeof (permissionConfig) !== 'object') {
        //throw new HttpException('You cannot use annotation in current step.')
        throw new HttpException('Permission config is undefined in current step.')
      }

      let {
        control, 
        defaultPermission
      } = permissionConfig
      
      if (control === true) {
        if (typeof (data.public) === 'boolean') {
          instance.public = data.public
        } else {
          if (defaultPermission === 'public') {
            instance.public = true
          } else {
            instance.public = false
          }
        }
      } else if (typeof (data.public) !== 'undefined') {
        let step = await user.getCurrentReadingProgressStepName()
        throw new HttpException(`You cannot change annotation's premission in current step: ${step}`)
      } else {
        if (defaultPermission === 'public') {
          instance.public = true
        } else {
          instance.public = false
        }
      }

      await instance.save()
    } // Model._setPermission = async function (webpage, user, data, instance) {

    Model._setPermissionTest = async function (webpage, user, data, instance) {
      if (typeof (data.public) === 'boolean') {
        instance.public = data.public
      }
      return instance
    }
  } // register (Model) {
}

module.exports = AnnotationPermission
