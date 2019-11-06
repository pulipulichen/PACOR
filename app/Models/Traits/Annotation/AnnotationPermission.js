'use strict'

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationPermission {

  register(Model) {
    Model._setPermission = async function (webpage, user, data, instance) {
      let config = await user.getCurrentReadingProgressStepConfig(webpage)
      let annotationConfig = config.annotation
      if (typeof (annotationConfig) !== 'object') {
        throw new HttpException('You cannot use annotation in current step.')
      }

      let {enableControlPermission, defaultPermission} = annotationConfig
      if (enableControlPermission === true) {
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
        throw new HttpException(`You cannot change annotation's premission in current step.`)
      } else {
        if (defaultPermission === 'public') {
          instance.public = true
        } else {
          instance.public = false
        }
      }

      return instance
    }

    Model._setPermissionTest = async function (webpage, user, data, instance) {
      if (typeof (data.public) === 'boolean') {
        instance.public = data.public
      }
      return instance
    }
  } // register (Model) {
}

module.exports = AnnotationPermission