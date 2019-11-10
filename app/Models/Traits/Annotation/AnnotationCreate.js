'use strict'

const AnnotationModel = use('App/Models/Annotation')
const AnchorPositionModel = use('App/Models/AnchorPosition')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

class AnnotationCreate {

  register(Model) {
    Model.create = async function (webpage, user, data) {

      if (Array.isArray(data.anchorPositions) === false
              || data.anchorPositions.length === 0) {
        return false
      }

      /*
       let anchorTextInstance = new AnchorTextModel()
       anchorTextInstance.webpage_id = webpage.primaryKeyValue
       anchorTextInstance.start_pos = data.startPos
       anchorTextInstance.end_pos = data.endPos
       anchorTextInstance.anchor_text = data.anchorText
       */
      let instance = new AnnotationModel()

      instance.webpage_id = webpage.primaryKeyValue
      //instance.start_pos = data.startPos
      //instance.end_pos = data.endPos
      instance.user_id = user.primaryKeyValue
      instance.type = data.type
      if (typeof (data.properties) === 'object'
              && data.properties !== null) {
        instance.properties = data.properties
      }

      instance = await this._setPermission(webpage, user, data, instance)
      //instance = await this._setPermissionTest(webpage, user, data, instance)

      await instance.save()

      let anchorTextIds = []
      for (let i = 0; i < data.anchorPositions.length; i++) {
        let a = data.anchorPositions[i]

        let query = {
          webpage_id: webpage.primaryKeyValue,
          paragraph_seq_id: a.paragraph_seq_id,
          paragraph_id: a.paragraph_id,
          type: a.type,
          //start_pos: a.start_pos,
          //end_pos: a.end_pos,
          //anchor_text: a.anchor_text
        }
        if (a.type === 'textContent') {
          query.paragraph_id = a.paragraph_id,
                  query.start_pos = a.start_pos
          query.end_pos = a.end_pos,
                  query.anchor_text = a.anchor_text
        }

        //console.log(query)
        let anchorTextInstance = await AnchorPositionModel.findOrCreate(query, query)
        anchorTextIds.push(anchorTextInstance.primaryKeyValue)
        //await anchorTextInstance.annotations().attach.save(instance)
      }
      //console.log(anchorTextIds)
      await instance.anchorPositions().attach(anchorTextIds)

      // ---------------------------------------

      if (typeof (data.notes) === 'undefined'
              && typeof (data.note) === 'string') {
        data.notes = {
          'default': data.note
        }
      }

      await Object.keys(data.notes).map(async function (type) {
        let noteInstance = new AnnotationNoteModel()
        noteInstance.type = type
        noteInstance.note = data.notes[type]
        await instance.notes().save(noteInstance)
        //await anchorTextInstance.annotations().attach.save(instance)
      })  // Object.keys(data.notes).forEach(type => {
      //console.log(anchorTextIds)

      instance.note = data.note


      return instance
    } // static async create(webpage, user, data) {
  } // register (Model) {
}

module.exports = AnnotationCreate
