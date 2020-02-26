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


const TestSetupScript = use('./scripts/TestSetupScript.js')

const WebpageUserGroupScript = use('./scripts/WebpageUserGroupScript-1section.js')
const AnnotationInteractScript = use('./scripts/AnnotationInteractScript-1section.js')

const WebpageUserGroupScript2 = use('./scripts/WebpageUserGroupScript-2sections.js')
const AnnotationInteractScript2 = use('./scripts/AnnotationInteractScript-2sections.js')

const WebpageUserGroupScript2Cors = use('./scripts/WebpageUserGroupScript-2sections-cors.js')
const AnnotationInteractScript2Cors = use('./scripts/AnnotationInteractScript-2sections-cors.js')

const Exp2020Script = use('./2020exp/Exp2020Script.js')

class UserSeeder {
  async run () {
    await Cache.flush()
    
    console.log('=========================================')
    console.log(__filename + ' start...\n')
    
    await TestSetupScript.main()
    
    //await WebpageUserGroupScript.main()
    //await AnnotationInteractScript.main()
    
    console.log('直接開始吧')
    await WebpageUserGroupScript2.main()
    console.log('直接開始吧 2')
    await AnnotationInteractScript2.main()
    
    await WebpageUserGroupScript2Cors.main()
    await AnnotationInteractScript2Cors.main()
    
    await Exp2020Script.main()
    
    console.log('\n' + __filename + ' is finished.')
    console.log('=========================================')
    
    await Cache.flush()
    
    return true
  }
}

module.exports = UserSeeder
