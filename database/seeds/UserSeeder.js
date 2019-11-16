'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
//const Factory = use('Factory')
const Database = use('Database')

const DomainModel = use('App/Models/Domain')
const url = 'http://blog.pulipuli.info/'

class UserSeeder {
  async run () {
    await this.createAdmin()
  }
  
  async createAdmin () {
    let domain = await DomainModel.findByURL(url)
    let adminsSetting = '布布:password'
    await domain.setAdmins(adminsSetting)
    //console.log('aaa')
  }
}

module.exports = UserSeeder
