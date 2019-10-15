'use strict'


const Env = use('Env')

class Database {
  admin ({request, response}) {
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
