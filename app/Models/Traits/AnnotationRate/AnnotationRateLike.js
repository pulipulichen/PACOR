'use strict'

const AnnotationModel = use('App/Models/Annotation')
const AnnotationRateModel = use('App/Models/AnnotationRate')

const { HttpException } = use('@adonisjs/generic-exceptions') 

class AnnotationRateLike {

  register(Model) {
    
    Model.like = async function (webpage, user, data) {
      let {annotationID} = data

      if (!annotationID ) {
        throw new Error('Annotation ID is required.')
        return null
      }
      
      // ---------------
      
      let annotation = await AnnotationModel.find(annotationID)
      if (annotation.webpage_id !== webpage.primaryKeyValue) {
        throw new HttpException('Forbidden', 403)
      }
      
      // -----------------
      
      let findData = {
        annotation_id: annotation.id,
        user_id: user.primaryKeyValue,
        type: 'like',
        deleted: false
      }
      let createData = {
        ...findData
      }
      createData.deleted = true
      
      let rate = await AnnotationRateModel.findOrCreate(findData, createData)
      rate.deleted = !rate.deleted
      await rate.save()
      
      console.log('AnnotationRateLike 這邊應該要加入通知')
      
      return rate
    }
    
  } // register (Model) {
}

module.exports = AnnotationRateLike
