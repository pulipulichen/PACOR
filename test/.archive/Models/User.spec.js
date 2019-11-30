'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')(__filename)

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')

let url = 'http://user.spec.pulipuli.info/'

test('create groups in webpage', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL(url)
  let groupSetting = `a b c
d e
f g`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 3)
})

test(`find other users' id in group`, async ({ assert }) => {
  let webpage = await WebpageModel.findByURL(url)
  assert.isNumber(webpage.domain_id)
  
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  await user.goToCollaborativeReadingProgress(webpage)
  assert.isNumber(user.id)
  
  let usersInGroup = await user.getOtherUserIDsInGroup(webpage)
  assert.equal(usersInGroup.length, 2)
})

// -----------------------------

test('change groups in webpage ', async ({ assert }) => {
  let webpage = await WebpageModel.findByURL(url)
  let groupSetting = `b c
d`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 2)
})

test(`find other users' id in anonymous group`, async ({ assert }) => {
  let webpage = await WebpageModel.findByURL(url)
  assert.isNumber(webpage.domain_id)
  
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  assert.isNumber(user.id)
  
  // 這時候的a應該變成匿名小組了，所以是快取的問題
  //console.log('這時候的a應該變成匿名小組了，所以是快取的問題')
  
  let usersInGroup = await user.getOtherUserIDsInGroup(webpage)
  assert.equal(usersInGroup.length, 3)
  
  // 這邊是為了測試cache有沒有正常運作
  for (let i = 0; i < 100; i++) {
    let usersInGroupLoop = await user.getOtherUserIDsInGroup(webpage)
    assert.equal(usersInGroupLoop.length, 3)
  }
})

// Reset database
//trait('DatabaseTransactions')