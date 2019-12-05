'use strict'

const AnnotationModel = use('App/Models/Annotation')
const AnchorPositionModel = use('App/Models/AnchorPosition')
const AnnotationNoteModel = use('App/Models/AnnotationNote')

const Profiler = use('Profiler')

class AnnotationCreate {

  register(Model) {
    
    /**
     * 建立標註
     * 
     * @param {Webpage} webpage
     * @param {User} user
     * @param {JSON} data
     * {
      type: 'MainIdea',
      notes: {
        'default': '今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準。'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-0',
          start_pos: 1,
          anchor_text: '今年8月新的隱私保護與個資管理'
        }
      ]
    }
     * @returns {Annotation}
     */
    Model.create = async function (webpage, user, data) {

      if (Array.isArray(data.anchorPositions) === false
              || data.anchorPositions.length === 0) {
        throw new Error('Create annotation need anochorPositions')
        return false
      }
      
      let profiler = new Profiler(1, 'Annotation/AnnotationCreate.create()', data)

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

      //instance = await this._setPermissionTest(webpage, user, data, instance)

      profiler.mark('before await instance.save()')

      await instance.save()
      
      profiler.after('await instance.save()')

      // ------------------

      this._setPermission(webpage, user, data, instance)
      
      profiler.after('this._setPermission()')
      
      this._createAnchorPositions(webpage, instance, data)
      
      profiler.after('this._createAnchorPositions()')
      
      this._createNotes(instance, data)
      
      profiler.after('this._createNotes()')
      
      // ------------------
      
      profiler.finish()

      return instance
    } // Model.create = async function (webpage, user, data) {
    
    Model._createAnchorPositions = async function (webpage, instance, data) {
      let anchorTextIds = []
      for (let i = 0; i < data.anchorPositions.length; i++) {
        let a = data.anchorPositions[i]

        if (!a.type) {
          // 來自動判斷
          if (typeof(a.start_pos) === 'number'
                  && typeof(a.end_pos) === 'number') {
            a.type = 'textContent'
          }
          else {
            a.type = 'section'
          }
        }

        let query = {
          webpage_id: webpage.primaryKeyValue,
          seq_id: a.seq_id,
          type: a.type,
          //start_pos: a.start_pos,
          //end_pos: a.end_pos,
          //anchor_text: a.anchor_text
        }
        if (a.type === 'textContent') {
          // 自動補齊一些資料
          if (typeof(a.start_pos) === 'number' 
                  && typeof(a.end_pos) !== 'number' 
                  && typeof(a.anchor_text) === 'string') {
            a.end_pos = a.start_pos + a.anchor_text.length
          }
          
          if (typeof(a.start_pos) !== 'number' 
                  && typeof(a.end_pos) === 'number' 
                  && typeof(a.anchor_text) === 'string') {
            a.start_pos = a.end_pos - a.anchor_text.length
          }
          
          // 檢查
          if (typeof(a.paragraph_id) === 'undefined' 
                  || typeof(a.start_pos) !== 'number' 
                  || typeof(a.end_pos) !== 'number' 
                  || typeof(a.anchor_text) !== 'string' ) {
            throw new Error('anchorPosisitions format error: \n' + JSON.stringify(a, null, ' '))
          }
          
          query.paragraph_id = a.paragraph_id
          query.start_pos = a.start_pos
          query.end_pos = a.end_pos
          query.anchor_text = a.anchor_text
        }

        //console.log(query)
        let anchorTextInstance = await AnchorPositionModel.findOrCreate(query, query)
        anchorTextIds.push(anchorTextInstance.primaryKeyValue)
        //await anchorTextInstance.annotations().attach.save(instance)
      }
      //console.log(anchorTextIds)
      await instance.anchorPositions().attach(anchorTextIds)
    } // Model._createAnchorPositions = async function () {
    
    Model._createNotes = async function (instance, data) {
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

      //instance.note = data.note
      
    } // Model._createNotes = async function (webpage, instance, data) {
    
    Model.createSectionAnnotation = async function (webpage, user, data) {

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
      
      let annotation = await AnnotationModel
              .query()
              .where('webpage_id', webpage.primaryKeyValue)
              .where('user_id', user.primaryKeyValue)
              .where('deteled', false)
              .whereHas('anchorPositions', (builder) => {
                builder.where('webpage_id', webpage.primaryKeyValue)
                  .where('seq_id')
              })
              .pick(1)
      
      if (annotation.size() > 0) {
        annotation = annotation.first()
        let notes = await annotation.notes().fetch()
        for (let i = 0; i < notes.size(); i++) {
          let note = notes.nth(i)
          let type = note.type
          
          if (typeof(data.notes[type]) === 'string') {
            note.note = data.notes[type]
            await note.save()
          }
        }
        return annotation
      }
      else {
        return await this.create(webpage, user, data)
      }
    } // static async create(webpage, user, data) {
    
    Model.prototype.updateAnnotation = async function (data) {
      let id = data.id
      for (let name in data) {
        if (name === 'id') {
          continue
        } else if (name === 'notes') {
          for (let type in data[name]) {
            let note = data[name][type]

            let query = {
              annotation_id: id,
              type: type
            }
            let noteInstance = await AnnotationNoteModel.findOrCreate(query, query)
            if (note !== noteInstance.note) {
              noteInstance.note = note
              //console.log('before save note')
              await noteInstance.save()
            }
          }
        } else {
          this[name] = data[name]
        }
      }
      //console.log('ready to update')
      await this.save()
    }
  } // register (Model) {
}

module.exports = AnnotationCreate
