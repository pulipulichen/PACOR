'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * https://www.google.com/search?q=adonisjs+cache&oq=adonisjs+cache&aqs=chrome..69i57j69i60.8225j0j4&sourceid=chrome&ie=UTF-8
 */
const { test, trait } = use('Test/Suite')('Controllers/Helpers/TokenizationHelper')

trait('Test/ApiClient')
trait('Session/Client')

const TokenizationHelper = use('App/Helpers/TokenizationHelper')

test('htmlToText', async ({ assert, client }) => {
  let result = TokenizationHelper.htmlToText('<p>abc</p>')
  assert.equal(result, 'abc')
}).timeout(0)

test('parseWordFrequency', async ({ assert, client }) => {
  let result = TokenizationHelper.parseWordFrequency('我來測試看看')
  console.log(result)
  assert.isArray(result)
}).timeout(0)

// Reset database
//trait('DatabaseTransactions')