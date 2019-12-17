const dayjs = use('dayjs')
const Drive = use('Drive')
const Helpers = use('Helpers')
const fs = use('fs')

let logManager = {
  logs: [],
  useThreads: true,
  gotError: false,
  init (threads) {
    if (typeof(threads) !== 'number') {
      threads = 1
      this.useThreads = false
    }
    
    for (let i = 0; i < threads; i++) {
      this.logs.push(this.buildDefaultLogData())
    }
  },
  buildDefaultLogData () {
    return {
      logs: [],
      errorMessage: null,
      isError: false
    }
  },
  log (index, ...args) {
    if (typeof(index) !== 'number') {
      args.unshift(index)
      index = 0
    }
    
    let prefix = this.buildPrefix('LOG', index)
    args.unshift(prefix)
    
    let message = args.join(' ')
    console.log(message)
    
    this.logs[index].logs.push(message)
  },
  error (index, ...args) {
    if (typeof(index) !== 'number') {
      args.unshift(index)
      index = 0
    }
    
    let prefix = this.buildPrefix('ERROR', index)
    args.unshift(prefix)
    let message = args.join(' ')
    console.error(message)
    
    this.logs[index].logs.push(message)
    this.logs[index].isError = true
    this.logs[index].errorMessage = message
    this.gotError = true
  },
  buildPrefix (prefix, index) {
    if (this.useThreads === false
            || typeof(index) !== 'number') {
      return `[${prefix}]`
    }
    else {
      return `[${index} ${prefix}]`
    }
  },
  
  // ----------------------------
  
  printErrorMessage () {
    this.logs.forEach(l => {
      if (l.isError === false) {
        return null
      }
      console.error(l.errorMessage)
    })
  },
  
  saveErrorLogs () {
    let basedir = Helpers.appRoot() + '/log/' + dayjs().format('YYYY-MM-DD-HH-mm') + '/'
    
    this.logs.forEach((l, index) => {
      if (l.isError === false) {
        return null
      }
      
      let logs = l.logs.join('\n')
      let filename = `${index}.txt`
      fs.writeFile(basedir + filename, logs, 'utf8', () => {
        // do nothings
      })
    })
  }
}

module.exports = logManager