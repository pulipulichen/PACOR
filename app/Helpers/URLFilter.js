'use strict'

const Config = use('Config')
let mapping = Config.get('origin.originMapping')
const Env = use('Env')

const directoryIndexList = [
  'index.html', 'index.htm', 'index.shtml', 'index.php', 'index.php4', 'index.php3', 'index.phtml', 'index.cgi'
]

let URLFilter = function (url) {
  if (typeof(url) !== 'string') {
    return '__direct'
  }
  
  if (url.endsWith('#')) {
    url = url.slice(0, -1)
  }
  
  if (url.endsWith('?')) {
    url = url.slice(0, -1)
  }
  
  for (let i = 0; i < directoryIndexList.length; i++) {
    let fileName = directoryIndexList[i]
    if (url.endsWith(fileName)) {
      url = url.slice(0, ( -1 * fileName.length) )
    }
  }
  
  // -----------------------------------------

  if (url.startsWith('/') && !url.startsWith('//')) {
      url = Env.get('APP_URL') + url
      //console.log(origin)
    }
    
  //console.log({url})

  // ---------------------
  // 先把127.0.0.1對應成localhost

  let parts = url.split('/')
  let domain  = parts.slice(2)[0]

  let host = domain
  let port = ''
  if (host.indexOf(':') > -1) {
    port = host.slice(host.indexOf(':'))
    if ((parts[0] === 'http' && port === ':80') 
            || (parts[0] === 'https' && port === ':443')) {
      port = ''
    }
    host = host.slice(0, host.indexOf(':'))
  }
  
  //console.log({host})
  
  if (host === '127.0.0.1') {
    host = 'localhost'
    domain = host + port
  }

  // ------------------
  // 再從config做對應

  if (typeof(mapping[domain]) === 'string') {
    domain = mapping[domain]
  }
  parts[2] = domain
  url = parts.join('/')

  return url
}

module.exports = URLFilter