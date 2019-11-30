'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')(__filename)

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')

test('create groups in webpage', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info-User.spec')
  let groupSetting = `a b c
d e
f g`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 3)
})

test(`find other users' id in group`, async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  assert.equal(webpage.domain_id, 1)
  
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  assert.equal(user.id, 1)
  
  let usersInGroup = await user.getOtherUserIDsInGroup(webpage)
  assert.deepEqual(usersInGroup, [2, 3])
})

// -----------------------------

test('change groups in webpage ', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  let groupSetting = `b c
d`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 2)
})

test(`find other users' id in anonymous group`, async ({ assert }) => {
  let webpage = await WebpageModel.findByURL('http://blog.pulipuli.info')
  assert.equal(webpage.domain_id, 1)
  
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  assert.equal(user.id, 1)
  
  let usersInGroup = await user.getOtherUserIDsInGroup(webpage)
  assert.equal(usersInGroup.length, 3)
  for (let i = 0; i < 100; i++) {
    let usersInGroupLoop = await user.getOtherUserIDsInGroup(webpage)
    assert.equal(usersInGroupLoop.length, 3)
  }
})

// Reset database
//trait('DatabaseTransactions')