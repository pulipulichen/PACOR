'use strict'

const WebpageUserBaseController = use('App/Controllers/Http/Client/WebpageUserBaseController')
//const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const AnnotationModel = use('App/Models/Annotation')
//const AnnotationNoteModel = use('App/Models/AnnotationNote')

//const Cache = use('Cache')
//const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Profiler = use('Profiler')
//const Sleep = use('Sleep')

class AnnotationSave extends WebpageUserBaseController {
  constructor () {
    super('Annotation')
  }
  
  async create({request, webpage, user}) {
    let data = request.all()
    
    //console.log('create', 1)
    
    let profiler = new Profiler(0, 'Annotation.create()', data)
    webpage.log(user, 'Annotation.create', data)
    profiler.after('webpage.log()')
    
    //console.log('create', 2)
    
    //await Sleep(3)
    
    let instance = await AnnotationModel.create(webpage, user, data)
    profiler.finish()
    return instance.id
  }
  
  async update ({request, webpage, user}) {
    //console.log('ready to update 4')
    let data = request.all()
    webpage.log(user, 'Annotation.update', data)
    
    //console.log('update')
    //await ReadingActivityLog.log(webpage, user, this.modelName + '.update', data)
    webpage.log(user, this.modelName + '.update', data)
    //console.log('ready to update 3')
    let id = data.id
    if (typeof(id) !== 'number' && typeof(id) !== 'string') {
      throw new HttpException('No id')
    }
    //console.log('ready to update 2')
    let instance = await this.model.find(id)
    if (user.isAdmin() === false && instance.user_id !== user.id) {
      throw new HttpException('You are not owner of it.')
    }
    //console.log('ready to update 1')
    instance.updateAnnotation(data)
    return 1
  }
  
}

module.exports = AnnotationSave