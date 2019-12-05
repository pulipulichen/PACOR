'use strict'

class Profiler {
  constructor(timeout = 5, ...args) {
    this.basetime = (new Date()).getTime()
    this.marks = []
    this.marksTime = []
    this.mark.apply(this, args)
    
    //console.log('Profiler')
    
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
  
  displayTimeoutMessage () {
    //let message = this.marks.join('\n  ')
    let message = []
    let basetime
    for (let i = 0; i < this.marks.length; i++) {
      let mark = this.marks[i]
      if (!basetime) {
        message.push('[PROFILER] ' + mark)
        basetime = this.marksTime[i]
      }
      else {
        let sec = Math.round((this.marksTime[i] - basetime) / 1000)
        message.push(`${sec}\t: ${mark}`)
      }
    }
    message = message.join('\n  ')
    throw new Error(message)
  }
  
  finish () {
    clearTimeout(this.timer)
  }
  
  argsToMark (args = []) {
    return args.map(arg => {
      if (typeof(arg) === 'object') {
        if (arg.primaryKeyValue !== undefined) {
          let className = arg.contructor.name
          return className + '_' + arg.primaryKeyValue
        }
        else {
          return JSON.stringify(arg)
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