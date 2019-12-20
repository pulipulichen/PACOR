'use strict'

const Env = use('Env')
const { HttpException } = use('@adonisjs/generic-exceptions') 
const Helpers = use('Helpers')
const fs = use('fs')

class Development {
  async avatars ({request, response}) {
    let basedir = Helpers.appRoot() + '/public/avatars/'
    
    let basefiles = fs.readdirSync(basedir)
    
    //files = JSON.stringify(files, null, 2)
    let output = {}
    
    basefiles.forEach((basefile) => {
      let subpath = basedir + '/' + basefile
      let baseStats = fs.statSync(subpath)
      
      if (baseStats.isDirectory() === false) {
        return false
      }
      
      let subfiles = fs.readdirSync(subpath)
      subfiles.forEach((subfile) => {
        if (subfile === 'README.md') {
          return false
        }
        
        let iconpath = subpath + '/' + subfile
        
        let iconStats = fs.statSync(iconpath)
        if (iconStats.isDirectory()) {
          return false
        }
        
        let value = basefile + '/' + subfile
        
        let key = value
        if (key.endsWith('.png')) {
          key = key.slice(0, -4)
        }
        if (key.endsWith('-icon')) {
          key = key.slice(0, -5)
        }
        if (key.indexOf('-icon-sets') > -1) {
          key = key.replace('-icon-sets', '')
        }
        
        output[key] = value
      })
    })
    
    output = JSON.stringify(output, null, 2)
    return output
  }
}

module.exports = Development
