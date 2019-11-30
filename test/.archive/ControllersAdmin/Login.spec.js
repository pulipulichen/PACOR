'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * @type type
 */
let title = __filename
const Test = use('Test')

const {test, trait} = use('Test/Suite')('Controllers/Admin/Login')

trait('Test/ApiClient')
trait('Session/Client')

const UserModel = use('App/Models/User')

let admin
let adminID

let config = {
  'a. getGlobalAdmin': async ({ assert, client }) => {
    admin = await UserModel.findGlobalAdmin()
    adminID = admin.primaryKeyValue
    assert.isNumber(adminID)
  },
  'b. check login status before login': async ({ assert, client  }) => {

    let response
    response = await client.get('/admin/auth/checkLogin')
            //.session('adonis-auth', adminID)
            .end()

    //console.log(response.text)
    response.assertStatus(200)
    response.assertText('0')
  },
  'c. try to login': async ({ assert, client  }) => {
    let response
    response = await client.get('/admin/auth/login')
            .query({
              domain: '',
              username: 'admin',
              password: 'password'
            })
            .session('adonis-auth', adminID)
            .end()

    response.assertStatus(200)
    response.assertJSONSubset({
      role: 'global_admin'
    })
  },
  'd. check login status after login': async ({ assert, client  }) => {
    let response
    response = await client.get('/admin/auth/checkLogin')
            .session('adonis-auth', adminID)
            .end()

    //console.log(response.text)
    response.assertStatus(200)
    response.assertJSONSubset({
      role: 'global_admin'
    })
  }
}

Test(title, config)

// Reset database
//trait('DatabaseTransactions')