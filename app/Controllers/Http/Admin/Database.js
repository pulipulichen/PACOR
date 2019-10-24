'use strict'


const Env = use('Env')
const { HttpException } = use('@adonisjs/generic-exceptions') 

class Database {
  async admin ({request, response, auth}) {
    let user = await auth.getUser()
    
    if (user.role !== 'global_admin') {
      throw new HttpException('Permission denied', 403)
    }
    
    let adminURL = `${Env.get('PROTOCOL')}//${Env.get('HOST')}:${Env.get('DB_ADMIN_PORT')}`
    //console.log(adminURL)
    //return adminURL
    const {table} = request.all()
    
    if (typeof(table) === 'string') {
      adminURL = adminURL + '/tables/read/' + table
    }
    
    response.redirect(adminURL)
  }
}

module.exports = Database
