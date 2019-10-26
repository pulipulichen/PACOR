'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Models/User')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

test('create groups in webpage', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  let groupSetting = `a b c
d e
f g`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 3)
})

test('change group in webpage', async ({ assert, client }) => {
  let webpage = await WebpageModel.findByURL(url)
  let groupSetting = `a b
d e`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 2)
})

test('get readers not in group in webpage', async ({ assert, client }) => {
  let webpage = await WebpageModel.findByURL(url)
  let reader = await webpage.getReadersNotInGroup()
  
  assert.equal(reader.length, 3)
  assert.equal(reader[0].username, 'c')
})

// Reset database
//trait('DatabaseTransactions')