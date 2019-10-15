'use strict'

const DomainModel = use('App/Models/Domain')

const Config = use('Config')

class Domain {
  async list ({request, auth}) {
    await auth.checkGlobalAdmin()
    //await auth.checkAdmin()
    
    const {page = 1} = request.all()
    
    const limit = Config.get('view.itemsPerPage')
    const offset = (page - 1) * limit
    
    let domains = await DomainModel
            .query()
            //.where('domain', '!=', '')
            .with('admins')
            .with('webpageCount')
            //.offset(offset)
            //.limit(offset)
            .fetch()
    
    //await domains.loadMany(['admins'])
    
    let count = await DomainModel.getCount()
    let maxPage = Math.ceil(count / limit)
    
    return {
      domains,
      maxPage
    }
  }
  
  async add ({request, auth}) {
    await auth.checkGlobalAdmin()
    
    const data = request.all()
    
    const domain = new DomainModel()
    domain.domain = data.domain
    if (data.title !== '') {
      domain.title = data.title
    }
    if (data.config !== '') {
      domain.config = data.config
    }
    await domain.save()
    
    return 1
  }
}

module.exports = Domain
