'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Annotation = use('App/Models/Annotation')
const ModelHelper = use('App/Helpers/ModelHelper')

class SectionAnnotation extends Annotation {
  // 這邊要做check list的 json case
  
  rates () {
    return this.hasMany('App/Models/SectionAnnotationRate')
            .where('deleted', false)
  }
  
  replies () {
    return this.hasMany('App/Models/SectionAnnotationReply')
            .where('deleted', false)
  }
  
  getChecklist (checklist) {
    if (ModelHelper.getDatabaseClient() !== 'sqlite3') {
      return checklist
    }
    
    if (checklist !== null 
                && typeof(checklist) === 'string'
                && checklist.startsWith('{')
                && checklist.endsWith('}')) {
          checklist = JSON.parse(checklist)
    }
    return checklist
  }
  
  setChecklist (checklist) {
    if (ModelHelper.getDatabaseClient() !== 'sqlite3') {
      return checklist
    }
    
    if (checklist !== null && typeof(checklist) === 'object') {
      checklist = JSON.stringify(checklist)
    }
    return checklist
  }
}

module.exports = SectionAnnotation
