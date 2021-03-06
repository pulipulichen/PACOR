'use strict'

const DomainModel = use('App/Models/Domain')

const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const Cache = use('Cache')

class Domain {
  async list ({request, auth}) {
    await auth.checkGlobalAdmin()
    const {page = 1} = request.all()
    
    const limit = Config.get('view.itemsPerPage')
    const offset = (page - 1) * limit

    let domains = await DomainModel
            .query()
            //.where('domain', '!=', '')
            .with('admins')
            .withCount('webpages')
            .offset(offset)
            .limit(limit)
            .orderBy('created_at', 'desc')
            .fetch()

    //await domains.loadMany(['admins'])
    domains = domains.toJSON()
    domains.forEach(domain => {
      let admins = domain.admins.map(admin => {
        let output = admin.username + ':'
        if (typeof(admin.password) === 'string') {
          output = output + admin.password
        }
        return output
      })
      domain.admins = admins.join(' ')
      domain.adminsCount = admins.length

      if (domain.config !== null) {
        domain.config = JSON.stringify(domain.config, null, '  ')
      }
    })

    let count = await DomainModel.getCount()
    let maxPage = Math.ceil(count / limit)

    let output = {
      domains,
      maxPage
    }
    return output
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

module.exports = Domain
