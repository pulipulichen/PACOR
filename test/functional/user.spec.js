'use strict'

const { test, trait } = use('Test/Suite')('User')

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

test(`find other users' id in group`, async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  assert.equal(webpage.domain_id, 1)
  
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  console.log(user.toJSON())
  assert.equal(user.id, 1)
  
  let usersInGroup = await user.getOtherUserIDsInGroup(webpage)
  assert.equal(usersInGroup, [2, 3])
  
  trait('DatabaseTransactions')
})

// Reset database
//trait('DatabaseTransactions')