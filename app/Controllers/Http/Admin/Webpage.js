'use strict'

const DomainModel = use('App/Models/DomainModel')
const WebpageModel = use('App/Models/Webpage')

const Config = use('Config')

class Webpage {
  async list ({request, auth}) {
    //await auth.checkAdmin()
    
    const {page = 1, domainID} = request.all()
    await auth.checkDomainAdmin(domainID)
    
    if (typeof(domainID) !== 'number') {
      throw 'No domainID'
    }
    
    const limit = Config.get('view.itemsPerPage')
    const offset = (page - 1) * limit
    
    let webpages = await WebpageModel
            .query()
            //.where('domain', '!=', '')
            .where('domain_id', domainID)
            .offset(offset)
            .limit(limit)
            .orderBy('created_at', 'desc')
            .fetch()
    
    //await domains.loadMany(['admins'])
    
    let count = await DomainModel.find(domainID).webpages().getCount()
    let maxPage = Math.ceil(count / limit)
    
    return {
      webpages,
      maxPage
    }
  }
  
  async add ({request, auth}) {
    const data = request.all()
    
    await auth.checkDomainAdmin(data.domainID)
    let domainID = data.domainID
    if (typeof(domainID) === 'string') {
      domainID = parseInt(domainID, 10)
    }
    
    // --------
    
    let webpage = new WebpageModel
    webpage.path = data.path
    if (data.title !== '') {
      webpage.title = data.title
    }
    if (data.config !== '') {
      webpage.config = data.config
    }
    
    // 還沒有做reader分組的部分
    
    // ---------
    
    const domain = await DomainModel.find(domainID)
    await domain.webpages().save(webpage)
    
    return 1
  }
  
  async editTitle({request, auth}) {
    await auth.checkGlobalAdmin()
    
    const {id, title} = request.all()
    
    const domain = await DomainModel.find(id)
    domain.title = title
    await domain.save()
    
    return 1
  }
  
  async editAdmins({request, auth}) {
    await auth.checkGlobalAdmin()
    
    const {id, admins} = request.all()
    
    const domain = await DomainModel.find(id)
    await domain.changeAdmins(admins)
    
    return 1
  }
  
  async editConfig({request, auth}) {
    await auth.checkGlobalAdmin()
    
    const {id, config} = request.all()
    
    const domain = await DomainModel.find(id)
    domain.config = config
    await domain.save()
    
    return 1
  }
}

module.exports = Webpage
