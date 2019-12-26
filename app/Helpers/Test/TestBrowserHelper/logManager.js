const dayjs = use('dayjs')
const Drive = use('Drive')
const Helpers = use('Helpers')
const fs = use('fs')

let logManager = {
  logs: [],
  useThreads: true,
  gotError: false,
  indexWidth: 1,
  displayIndexes: [],
  threads: null,
  init (threads) {
    if (typeof(threads) !== 'number') {
      threads = 1
      this.useThreads = false
    }
    
    for (let i = 0; i < threads; i++) {
      this.logs.push(this.buildDefaultLogData())
    }
    
    if (threads > 100) {
      this.indexWidth = 3
    }
    else if (threads > 10) {
      this.indexWidth = 2
    }
    
    this.threads = threads
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
    
    //console.log(args)
    if (args[0] 
            && args[0]._args[0]
            && args[0]._args[0]._remoteObject
            && args[0]._args[0]._remoteObject.subtype
            && args[0]._args[0]._remoteObject.subtype === 'error') {
      //console.log('error occured', args[0])
      
      args.unshift(index)
      return this.error.apply(this, args)
    }
    if (args[0] 
            && args[0]._type === 'error') {
      console.log('error occured', args[0])
      args.unshift(index)
      return this.error.apply(this, args)
    }
    
    //console.log('log', args[0])
    if (args[0] 
            && args[0]._text === 'Scripts may close only the windows that were opened by it.') {
      return null
    }
    
    args = this.argsToString(args)
    
    let prefix = this.buildPrefix('LOG  ', index)
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
    
    //console.log(args[0])
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
    
    if (args[0] === 'Scripts may close only the windows that were opened by it.') {
      return null
    }
    
    //console.log('error...', args[0].message, typeof(args[0].message), args[0].startsWith('Evaluation failed: '))
    
    let prefix = this.buildPrefix('ERROR', index)
    args.unshift(prefix)
    
    args = this.argsToString(args)
    
    let message = args.join(' ')
    
    
    console.error(message)
    
    this.logs[index].logs.push(message)
    this.logs[index].isError = true
    this.logs[index].errorMessage = message
    this.gotError = true
  },
  isError: function (index) {
    if (index === undefined) {
      index = 0
    }
    return this.logs[index].isError
  },
  getErrorMessage: function (index) {
    let message = this.logs[index].errorMessage
    return message.slice(message.indexOf('] '))
  },
  buildPrefix (prefix, index) {
    if (this.useThreads === false
            || typeof(index) !== 'number') {
      return `[ ${prefix}\t]`
    }
    else {
      let i = index + ''
      while (i.length < this.indexWidth + 1) {
        i = ' ' + i
      }
      
      return `[${i} ${prefix}\t]`
    }
  },
  argsToString (args) {
    return args.map(arg => {
      if (arg && typeof(arg) === 'object') {
        try {
          //console.log('a2s', arg._args[0]._remoteObject)
          if (arg 
              && arg._args[0]
              && arg._args[0]._remoteObject) {
            let remoteObject = arg._args[0]._remoteObject
            if (remoteObject.description) {
              return remoteObject.description
            }
            else if (remoteObject.value) {
              return remoteObject.value
            }
          }
          else if (arg._text) {
            let text = arg._text
            if (arg._type === 'error') {
              text = text + '\n' + JSON.stringify(arg._location, null, 2)
            }
            
            return text
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
        console.log('==============================\n')
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
    
    if (fs.existsSync(basedir)) {
      //console.error(`Dir is existed: ${basedir}`)
      //return null
      isDirMade = true
    }
    
    this.logs.forEach((l, index) => {
      if (l.isError === false) {
        return null
      }
      
      if (isDirMade === false) {
        fs.mkdirSync(basedir)
        console.log('\nLogs are saved in ' + basedir)
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
      name = '策士' + index + '_' + this.basename
    }
    else {
      name = '策士' + this.basename
    }
    
    return name
  },
  buildWebpageGroup (size) {
    // 一組要有size個人
    let groups = []
    let threads = this.threads
    let groupsSize = Math.ceil(threads / size)
    
    // 先決定有幾組
    for (let i = 0; i < groupsSize; i++) {
      groups.push([])
    }
    
    
    // 再來開始塞人
    for (let g = 0; g < groupsSize; g++) {
      let i = g
      while (i < threads) {
        let name = this.getBasename(i)
        groups[g].push(name)
        
        i = i + size
      }
    }
    
    return groups.map(g => g.join(' ')).join('\n')
  },
  
  // ----------------------------
  getDisplayIndex (index) {
    let i = this.displayIndexes.indexOf(index)
    if (i === -1) {
      this.displayIndexes.push(index)
      return this.displayIndexes.length - 1
    }
    return i
  },
  
  getSizeOptions (index, screenSize) {
    let output = {
      ...screenSize
    }
    
    // 6 7 8
    // 3 4 5
    // 0 1 2
    
    
    
    output.width = Math.ceil(output.width / 3)
    output.height = Math.ceil(output.height / 2)
    
    output.top = 0
    output.left = 0
    
    let i = this.getDisplayIndex(index) % 9
    if ([1,4,7].indexOf(index) > -1) {
      output.left = output.width + 1
    }
    if ([2,5,8].indexOf(index) > -1) {
      output.left = (output.width * 2) + 1
    }
    
    if ([3,4,5].indexOf(index) > -1) {
      output.top = ((output.height / 2) * 1) + 1
    }
    if ([0,1,2].indexOf(index) > -1) {
      output.top = ((output.height / 2) * 2) + 1
    }
    
    return output
  }
}

module.exports = logManager