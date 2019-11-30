'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
const { test, trait } = use('Test/Suite')('Controllers/Admin/Login')

trait('Test/ApiClient')
trait('Session/Client')

test('check login status before login', async ({ assert, client  }) => {
  let response
  response = await client.get('/admin/auth/checkLogin')
          .session('adonis-auth', 1)
          .end()
  
  console.log(response.text)
  response.assertStatus(200)
  response.assertText('0')
})

test('try to login', async ({ assert, client  }) => {
  let response
  response = await client.get('/admin/auth/login')
          .query({
            domain: '',
            username: 'admin', 
            password: 'password'
          })
          .session('adonis-auth', 1)
          .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    role: 'global_admin'
  })
})


test('check login status after login', async ({ assert, client  }) => {
  let response
  response = await client.get('/admin/auth/checkLogin')
          .session('adonis-auth', 1)
          .end()
  
  console.log(response.text)
  response.assertStatus(200)
  response.assertJSONSubset({
    role: 'global_admin'
  })
})

// Reset database
//trait('DatabaseTransactions')