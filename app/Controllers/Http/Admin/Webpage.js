'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const TokenizationHelper = use('App/Helpers/TokenizationHelper')

class Webpage {
  async list ({request, auth}) {
    //await auth.checkAdmin()
    //throw new HttpException(`You don't have permission to access.`, 403)
    
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
    
    let webpagesInstance = await WebpageModel
            .query()
            //.where('domain', '!=', '')
            .where('domain_id', domainID)
            .with('groups')
            .offset(offset)
            .limit(limit)
            .orderBy('created_at', 'desc')
            .fetch()
    
    let webpages = []
    if (webpagesInstance !== null) {
      for (let i = 0; i < webpagesInstance.size(); i++) {
        let webpageInstance = webpagesInstance.nth(i)
        let webpage = webpageInstance.toJSON()
        
        webpage.path = '/' + webpage.url.split('/').slice(3).join('/')
      
        await WebpageModel.parseUsersGroupsCount(webpageInstance, webpage)
        
        try {
          if (webpage.config === null) {
            webpage.config = ''
          }
          else {
            webpage.config = JSON.stringify(webpage.config, null, '  ')
          }
        }
        catch (e) {}

        webpage.config = webpageInstance.config

        webpages.push(webpage)
      } 
    }
    
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
  
  /*
  async t () {
    
//    let webpage = new WebpageModel()
//    webpage.title = 'A'
//    webpage.path = '/'
//    
//    let domain = await DomainModel.find(1)
//    await domain.webpages().save(webpage)
    
    //let webpage = await WebpageModel.find(1)
    let group = new WebpageGroupModel()
    group.group_seq_id = 0
    await webpage.groups().save(group)
    
    let user = await UserModel.find(1)
    await group.users().save(user)
    
    return 1
  }
  */
  /*
  async b() {
    let webpage = await WebpageModel
            .find(3)
    
    return webpage.getGroupsList()
  }
  */
  /*
  async b2 () {
//    let webpage = new WebpageModel()
//    webpage.title = 'A'
//    webpage.path = '/'
//    
//    let domain = await DomainModel.find(1)
//    await domain.webpages().save(webpage)
    
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
  */
  /*
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
  */
  /*
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
  */
  /*
  async u () {
    let user = await UserModel.find(4)
    await user.groups(2).detach()
    return user.groups().fetch()
  }
  */
  
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
    
    //console.log('a1')
    let webpage = await WebpageModel.findByURL(data.url)
    //console.log('a2')

    //webpage.path = data.path
    //webpage.url = domain.getFullURL(data.url)
    let changed = false
    if (typeof(data.title) === 'string' && data.title !== '') {
      webpage.title = data.title
      changed = true
    }
    if (typeof(data.title) === 'object') {
      webpage.config = data.config
      changed = true
    }
    
    //console.log('a')
    if (changed === true) {
      await webpage.save()
    }
    //console.log('b')
    if (Array.isArray(data.groups)) {
      await webpage.setGroupsList(data.groups)
    }
    //console.log('c')
    
    return domain.id
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
    //console.log(webpage.config)
    return 1
  }
  
  async find({request}) {
    const { url } = request.all()
    let webpage = await WebpageModel.findByURL(url)
    return webpage.primaryKeyValue
  }
  
  async analyzeIdeaUnits({request, response}) {
    const { paragraphs, url } = request.all()
    let webpage = await WebpageModel.findByURL(url)
    
    await webpage.analyzeIdeaUnits(paragraphs)
    //console.log(webpage.primaryKeyValue)
    //console.log(paragraphs)
    
    // 然後要轉址
    //return paragraphs
    response.redirect('/admin#/webpage-dashboard/' + webpage.primaryKeyValue  + '/article-analysis')
  }
  
  async testTokenization({request, response}) {
    let { paragraphs } = request.all()
    paragraphs = JSON.parse(paragraphs)
    return paragraphs.map((paragraph) => {
      paragraph = TokenizationHelper.removePunctuations(paragraph)
      let segment = TokenizationHelper.parseSegment(paragraph)
      return segment.map(seg => seg.w).filter(p => p.trim() !== '').join(' / ')
    }).filter(p => p.trim() !== '').join('\n\n')
  }
  
}

module.exports = Webpage
 