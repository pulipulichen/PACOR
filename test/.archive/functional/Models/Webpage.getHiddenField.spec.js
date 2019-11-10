'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * https://www.google.com/search?q=adonisjs+cache&oq=adonisjs+cache&aqs=chrome..69i57j69i60.8225j0j4&sourceid=chrome&ie=UTF-8
 */
const { test, trait } = use('Test/Suite')('Models/User.getHiddenField.spec')

trait('Test/ApiClient')
trait('Session/Client')

const WebpageModel = use('App/Models/Webpage')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html'


test('getHiddenField', async ({ assert, client }) => {
  await WebpageModel.findByURL('http://blog.pulipuli.info')
  
  let webpage = await WebpageModel
          .query()
          //.select('created_at')
          .setVisible(['created_at'])
          .pick(1)
  assert.isString(webpage.first().created_at)
  
  assert.isString(webpage.toJSON()[0].created_at)
}).timeout(0)

// Reset database
//trait('DatabaseTransactions')