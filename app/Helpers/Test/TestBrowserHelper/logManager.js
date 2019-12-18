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
    
    args = this.argsToString(args)
    
    let prefix = this.buildPrefix('LOG', index)
    args.unshift(prefix)
    
    let message = args.join(' ')
    console.log(message)
    
    this.logs[index].logs.push(message)
  },
  logStep (index, ...args) {
    if (typeof(index) !== 'number') {
      args.unshift(index)
      index = 0
    }
    
    args = this.argsToString(args)
    
    let prefix = this.buildPrefix('STEP', index)
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
    
    //console.log('error...', args[0], typeof(args[0].startsWith('Error: Evaluation failed: '))
    if (typeof(args[0]) === 'object'
            && typeof(args[0].message) === 'string') {
      let m = args[0].message
      let needle = 'Evaluation failed: '
      if (m.startsWith(needle)) {
        m = m.slice(needle.length).trim()
      }
      args[0] = m
    }
    //console.log('error...', args[0].message, typeof(args[0].message), args[0].startsWith('Evaluation failed: '))
    
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
  argsToString (args) {
    return args.map(arg => {
      if (arg && typeof(arg) === 'object') {
        try {
          //console.log(arg)
          if (arg._text) {
            return arg._text
          }
          
          return JSON.stringify(arg, null, 2)
        }
        catch (e) {
          //return arg.toString()
          return arg + ''
        }
      }
      return arg
    })
  },
  
  // ----------------------------
  
  printErrorMessage () {
    
    let first = false
    
    this.logs.forEach(l => {
      if (l.isError === false) {
        return null
      }
      
      if (first === false) {
        console.log('\n==============================\n')
      }
      first = true
      
      console.error(l.errorMessage)
    })
    
    if (first === true) {
      console.log('\n==============================\n')
    }
    
  },
  
  saveErrorLogs () {
    let basedir = Helpers.appRoot() + '/test/log/' + dayjs().format('YYYY-MMDD-HHmm') + '/'
    
    //console.log(basedir)
    
    let isDirMade = false
    
    this.logs.forEach((l, index) => {
      if (l.isError === false) {
        return null
      }
      
      if (isDirMade === false) {
        fs.mkdirSync(basedir)
        console.log('Logs are saved in ' + basedir)
      }
      
      isDirMade = true
      
      let logs = l.logs.join('\n')
      let filename = `${index}.txt`
      
      fs.writeFile(basedir + filename, logs, 'utf8', () => {
        // do nothings
      })
    })
  },
  
  // --------------------------------
  basename: null,
  getBasename (index) {
    if (!this.basename) {
      this.basename = (new Date()).getTime().toString(36)
    }
    
    let name
    if (index) {
      name = '丁丁' + index + '_' + this.basename
    }
    else {
      name = '丁丁' + this.basename
    }
    
    return name
  }
}

module.exports = logManager