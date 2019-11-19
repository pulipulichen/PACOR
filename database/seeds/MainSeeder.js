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

const WebpageUserGroupScript = use('./scripts/WebpageUserGroupScript')
const AnnotationInteractScript = use('./scripts/AnnotationInteractScript')

class UserSeeder {
  async run () {
    
    await WebpageUserGroupScript.main()
    await AnnotationInteractScript.main()
    
    console.log(__filename + ' is finished.')
    
    return true
  }
}

module.exports = UserSeeder
