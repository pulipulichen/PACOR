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

const WebpageUserGroupScripts = use('./scripts/WebpageUserGroupScripts')

class UserSeeder {
  async run () {
    
    await WebpageUserGroupScripts.createAdmin()
    await WebpageUserGroupScripts.createGroups()
    
    WebpageUserGroupScripts.processGroup0User1()
    WebpageUserGroupScripts.processGroup0User2()
    WebpageUserGroupScripts.processGroup0User3()
    WebpageUserGroupScripts.processGroup0User4()
    WebpageUserGroupScripts.processGroup1User1()
    WebpageUserGroupScripts.processGroup1User2()
    
    await Sleep(5) // 統統給我等待10秒鐘
    console.log(__filename + ' is finished.')
    
    return true
  }
}

module.exports = UserSeeder
