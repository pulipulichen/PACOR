'use strict'

//const { HttpException } = use('@adonisjs/generic-exceptions') 
//const ExceptionHelper = use('App/Helpers/ExceptionHelper')

let forceTimeout5min = true
if (forceTimeout5min === true){
  console.log('@TODO forceTimeout5min')
}

class Profiler {
  constructor(timeout = 5, ...args) {
    if (typeof(timeout) !== 'number') {
      args.unshift(timeout)
      timeout = 5
    }
    
    
    //this.basetime = (new Date()).getTime()
    this.marks = []
    this.marksTime = []
    this.mark.apply(this, args)
    
    //console.log('Profiler')
    
    if (timeout === 0) {
      return false
    }
    
    if (forceTimeout5min === true) {
      timeout = 5 * 60
    }
    
    this.timeout = timeout
    
    this.timer = setTimeout(() => {
      this.displayTimeoutMessage()
    }, timeout * 1000)
  }
  
  time () {
    return (new Date()).getTime()
  }
  
  mark (...args) {
    let mark = this.argsToMark(args)
    this.marks.push(mark)
    this.marksTime.push(this.time())
    
    //console.log(mark)
  }
  
  before (...args) {
    args.unshift('[BEFORE]\t')
    return this.mark.apply(this, args)
  }
  
  after (...args) {
    args.unshift('[AFTER]\t')
    return this.mark.apply(this, args)
  }
  
  displayTimeoutMessage () {
    //let message = this.marks.join('\n  ')
    let message = []
    let basetime
    for (let i = 0; i < this.marks.length; i++) {
      let mark = this.marks[i]
      if (!basetime) {
        message.push('[PROFILER] timeout: ' + this.timeout)
        message.push(mark)
        basetime = this.marksTime[i]
      }
      else {
        let sec = (this.marksTime[i] - basetime) / 1000
        message.push(`${sec}\t: ${mark}`)
      }
    }
    
    message = message.join('\n  ')
    //message = message + ExceptionHelper.getStackTraceString()
    
    console.error(message)
    //throw new HttpException(message)
  }
  
  finish () {
    clearTimeout(this.timer)
  }
  
  argsToMark (args = []) {
    return args.map(arg => {
      if (arg === null) {
        return 'null'
      }
      else if (typeof(arg) === 'object') {
        if (arg.primaryKeyValue !== undefined) {
          let className = ''
          if (arg.contructor && arg.contructor.name) {
            className = arg.contructor.name + '_'
          }
          else if (arg.name) {
            className = arg.name + '_'
          }
          return className + arg.primaryKeyValue
        }
        else if (Array.isArray(arg) || Object.keys(arg).length <= 3) {
          return JSON.stringify(arg)
        }
        else {
          return '\n' + JSON.stringify(arg, null, 2)
        }
      }
      else if (typeof(arg) === 'function') {
        return arg.name
      }
      else {
        return arg
      }
    }).join(' ')
  }
}

module.exports = Profiler