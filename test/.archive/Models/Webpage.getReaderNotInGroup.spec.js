'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')(__filename)

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')

const url = 'http://Webpage.getReaderNotInGroup.spec/222.html'

test('create groups in webpage', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL(url)
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
  let reader = await webpage.getUsersNotInGroup()
  
  reader = reader.toJSON()
  
  assert.equal(reader.length, 3)
  assert.equal(reader[0].username, 'c')
})

// Reset database
//trait('DatabaseTransactions')