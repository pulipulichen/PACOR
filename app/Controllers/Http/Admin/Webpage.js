'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 


class Webpage {
  async list ({request, auth}) {
    //await auth.checkAdmin()
    
    let {page = 1, domainID} = request.all()
    await auth.checkDomainAdmin(domainID)
    
    if (isNaN(domainID) === false && typeof(domainID) === 'string') {
      domainID = parseInt(domainID, 10)
    }
    if (typeof(domainID) !== 'number') {
      throw new HttpException('No domainID', 503)
    }
    
    const limit = Config.get('view.itemsPerPage')
    const offset = (page - 1) * limit
    
    let webpages = await WebpageModel
            .query()
            //.where('domain', '!=', '')
            .where('domain_id', domainID)
            .with('groups')
            .offset(offset)
            .limit(limit)
            .orderBy('created_at', 'desc')
            .fetch()
    
    
    webpages = webpages.toJSON().map(webpage => {
      webpage.path = webpage.url.split('/').slice(3).join('/')
      
      let groups = []
      let usersCount = 0
      //console.log(webpage.groups)
      webpage.groups.forEach(group => {
        if (group.users.length > 0) {
          let g = group.users.map(user => user.username).filter(username => (username !== '') )
          groups.push(g.join(' '))
          usersCount = usersCount + g.length
        }
      })
      webpage.groupsCount = groups.length
      webpage.usersCount = usersCount
      webpage.groups = groups.join('\n')
      try {
        if (webpage.config === null) {
          webpage.config = ''
        }
        else {
          webpage.config = JSON.stringify(webpage.config, null, '  ')
        }
      }
      catch (e) {}
      return webpage
    })
    
    //await domains.loadMany(['admins'])
    
    let domain = await DomainModel.find(domainID)
    let count = await domain.webpages().getCount()
    let maxPage = Math.ceil(count / limit)
    
    return {
      webpages,
      maxPage,
      domain: domain.domain
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
  
  async d() {
    
    let webpage = await WebpageModel
            .find(3)
    
    let group = await webpage.getGroup(0)
    
    let names = ``
    
    //await group.rows[0].setUsers("pudding jo")
    group.setUsers(names)
    
    return group
  }
  
  async d2() {
    
    let webpage = await WebpageModel
            .find(2)
    
    await webpage.setGroupsList(`a c
c d z
e f`)
    
    return await webpage.getGroupsList()
  }
  
  async u () {
    let user = await UserModel.find(4)
    await user.groups(2).detach()
    return user.groups().fetch()
  }
  
  /*
  async w () {
    let group = WebpageGroupModel
            .query()
            .where('id', 7)
            //.with('webpage.domain.users', (builder) => {
            //  builder.pluck('username')
            //})
            //.with('webpage', (builder) => {
            //  builder.with('domain', (builder) => {
            //    builder.with('users', (builder) => {
            //    })
            //  })
            //})
            .pluck('webpage.id')
            .fetch()
    return group
  }
  */
  
  async add ({request, auth}) {
    const data = request.all()
    
    let domain = await DomainModel.findByURL(data.url)
    
    await auth.checkDomainAdmin(domain.id)
    /*
    let domainID = data.domainID
    if (typeof(domainID) === 'string') {
      domainID = parseInt(domainID, 10)
    }
    if (typeof(domainID) !== 'number') {
      throw new HttpException('No domain id')
    }
    
    // --------
    /*
    let isCreate = false
    let webpage
    webpage = await WebpageModel
            .query()
            .where('domain_id', domainID)
            .where('url', data.url)
            .pick(1)
    
    if (webpage.size() === 0) {
      webpage = new WebpageModel
      isCreate = true
    }
    else {
      webpage = webpage.first()
    }
    */
    // -------
    
    let webpage = await WebpageModel.findByURL(data.url)
    //webpage.path = data.path
    webpage.url = domain.getFullURL(data.url)
    if (data.title !== '') {
      webpage.title = data.title
    }
    if (data.config !== '') {
      webpage.config = data.config
    }
    await webpage.save()
    
    if (Array.isArray(data.groups)) {
      await webpage.setGroupsList(data.groups)
    }
    
    return 1
  }
  
  async editTitle({request, auth}) {
    const data = request.all()
    
    await auth.checkDomainAdmin(data.domainID)
    
    const webpage = await WebpageModel.find(data.id)
    webpage.title = data.title
    await webpage.save()
    
    return 1
  }
  
  async editGroups({request, auth}) {
    const data = request.all()
    
    await auth.checkDomainAdmin(data.domainID)
    //throw new HttpException('test')
    const webpage = await WebpageModel.find(data.id)
    await webpage.setGroupsList(data.groups)
    
    return 1
  }
  
  async editConfig({request, auth}) {
    const data = request.all()
    
    await auth.checkDomainAdmin(data.domainID)
    
    const webpage = await WebpageModel.find(data.id)
    webpage.config = data.config
    await webpage.save()
    
    return 1
  }
}

module.exports = Webpage
