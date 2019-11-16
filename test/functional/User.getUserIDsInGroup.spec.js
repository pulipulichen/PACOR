/* global __filename */

'use strict'
let title = 'Controllers/Models/' + __filename

/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */

const Test = use('Test')

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')

const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'


let config = {
  'a. create group in webpage': async function ( { assert, client } ) {
    let webpage = await WebpageModel.findByURL(url)
    let groupSetting = `a b c
d e
f g`
    
    await webpage.setGroupsList(groupSetting)

    let groups = await webpage.groups().fetch()
    assert.equal(groups.size(), 3)
  },
  'b. count users in groups': async function ( { assert, client } ) {
    let webpage = await WebpageModel.findByURL(url)
    
    let user = await UserModel.findByNameInWebpage(webpage, 'a')
    //console.log('b.1')
    let idlist = await user.getUserIDsInGroup(webpage)
    //console.log('b.2')
    
    assert.equal(idlist.length, 3)
  },
  'c. add two admins to webpage': async function ( { assert, client } ) {
    let domain = await DomainModel.findByURL(url)
    
    let adminSetting = 'name1:password name2:password'
    await domain.changeAdmins(adminSetting)
    //console.log('b.1')
    let admins = await domain.admins().fetch()
    //console.log('b.2')
    
    assert.equal(admins.size(), 2)
  },
  'd. check users in group include admins': async function ( { assert, client } ) {
    let webpage = await WebpageModel.findByURL(url)
    
    let user = await UserModel.findByNameInWebpage(webpage, 'a')
    //console.log('b.1')
    let idlist = await user.getUserIDsInGroup(webpage)
    //console.log('b.2')
    
    assert.equal(idlist.length, 5)
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')