'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Model/User.getReadingProgresses')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')
const WebpageModel = use('App/Models/Webpage')
const ReadingProgressModel = use('App/Models/ReadingProgress')

const ReadingActivityLog = use ('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'

test('create group in webpage', async ({ assert, client }) => {
  let webpage = await WebpageModel.findByURL(url)
  let groupSetting = `a b c
d e
f g`
  await webpage.setGroupsList(groupSetting)
  
  let groups = await webpage.groups().fetch()
  assert.equal(groups.size(), 3)
})

test('check user reading progresses', async ({ assert, client }) => {
  let webpage = await WebpageModel.findByURL(url)
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  let readingProgresses = await user.getReadingProgressStatus(webpage)
  
  assert.equal(readingProgresses.length, 4)
  assert.equal(readingProgresses[1].step_name, 'individual-reading')
  assert.isUndefined(readingProgresses[0].start_timestamp)
  assert.isUndefined(readingProgresses[0].end_timestamp)
})

test('start step', async ({ assert, client }) => {
  let stepName = 'pre-imaginary'
  
  let webpage = await WebpageModel.findByURL(url)
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  
  await user.startReadingProgress(webpage, stepName)
  
  let readingProgresses = await user.getReadingProgressStatus(webpage)
  
  assert.equal(readingProgresses.length, 4)
  assert.isNumber(readingProgresses[0].start_timestamp)
  //console.log(readingProgresses[0].start_timestamp)
  await Sleep(1)
})


test('end step', async ({ assert, client }) => {
  let stepName = 'pre-imaginary'
  
  let webpage = await WebpageModel.findByURL(url)
  let user = await UserModel.findByNameInWebpage(webpage, 'a')
  
  await user.endReadingProgress(webpage, stepName)
  
  let readingProgresses = await user.getReadingProgressStatus(webpage)
  //console.log(readingProgresses[0].end_timestamp)
  assert.equal(readingProgresses.length, 4)
  assert.isNumber(readingProgresses[0].end_timestamp)
})

// Reset database
//trait('DatabaseTransactions')