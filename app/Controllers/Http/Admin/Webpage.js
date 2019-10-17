'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

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
  
  async t () {
    /*
    let webpage = new WebpageModel()
    webpage.title = 'A'
    webpage.path = '/'
    
    let domain = await DomainModel.find(1)
    await domain.webpages().save(webpage)
    */
    //let webpage = await WebpageModel.find(1)
    let group = new WebpageGroupModel()
    group.group_seq_id = 0
    await webpage.groups().save(group)
    
    let user = await UserModel.find(1)
    await group.users().save(user)
    
    return 1
  }
  
  async b() {
    let webpage = await WebpageModel
            .find(3)
    
    return webpage.getGroupsList()
  }
  
  async b2 () {
    /*
    let webpage = new WebpageModel()
    webpage.title = 'A'
    webpage.path = '/'
    
    let domain = await DomainModel.find(1)
    await domain.webpages().save(webpage)
    */
    //let webpage = await WebpageModel.find(1)
    let webpage = await WebpageModel
            .find(3)
    
    let group = new WebpageGroupModel()
    group.group_seq_id = 0
    await webpage.groups().save(group)
    
    let user = await UserModel.find(2)
    await group.users().save(user)
    
    let user2 = await UserModel.find(3)
    await group.users().save(user2)
    
    return 1
  }
  
  async c() {
    
    let webpage = await WebpageModel
            .find(3)
    
    let groups = await webpage.groups().fetch()
    
    let user = await UserModel.find(1)
    
    groups.map(async (group) => {
      await group.users().dissociate(user)
    })
    
    
    return await groups.users().fetch()
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
