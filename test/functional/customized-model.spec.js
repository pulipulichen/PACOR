'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('CustomizedModel')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')

test('create groups in webpage', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  let groupSetting = `a b c
d e
f g`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 3)
  
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  assert.notEqual(user.avatar, undefined)
})

// Reset database
//trait('DatabaseTransactions')