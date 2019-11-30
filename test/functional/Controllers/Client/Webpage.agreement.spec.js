'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Controllers/Client/Webpage.agreement.spec')

trait('Test/ApiClient')
trait('Session/Client')

const Sleep = use('Sleep')

const url = 'http://blog.pulipuli.info/2019/10/adonisjsvue-diary-about-adonisjs-and-vue.html?Webpage.agreement.spec'

test('check agreement is work', async ({ assert, client }) => {
  let response = await client.get('/client/webpage/agreement')
          .header('Referer', url)
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  //console.log(response)
  assert.isString(response.text)
})

// Reset database
//trait('DatabaseTransactions')