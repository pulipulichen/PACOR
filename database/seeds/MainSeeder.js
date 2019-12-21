'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
| 文章來源：https://www.ithome.com.tw/news/133958
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
//const Factory = use('Factory')
//const Database = use('Database')
const Sleep = use('Sleep')
const Cache = use('Cache')


const TestDomainAdminScript = use('./scripts/TestDomainAdminScript')
const WebpageUserGroupScript = use('./scripts/WebpageUserGroupScript')
const AnnotationInteractScript = use('./scripts/AnnotationInteractScript')

class UserSeeder {
  async run () {
    await Cache.flush()
    
    console.log('=========================================')
    console.log(__filename + ' start...\n')
    
    await TestDomainAdminScript.main()
    await WebpageUserGroupScript.main()
    await AnnotationInteractScript.main()
    
    console.log('\n' + __filename + ' is finished.')
    console.log('=========================================')
    
    await Cache.flush()
    
    return true
  }
}

module.exports = UserSeeder
