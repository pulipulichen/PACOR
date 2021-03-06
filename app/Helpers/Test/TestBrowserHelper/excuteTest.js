
let excuteTest = async function ({config, args, page, errors, index = 0, logManager}) {
  let stop = false

  for (let name in config) {
    try {
      let consolePrefix = '[RUNNING] '
      if (index !== undefined) {
        consolePrefix = `[${index}: RUNNING] `
      }
      
      //console.log(consolePrefix + name)
      logManager.logStep(index, name)
      
      await config[name](args, page)
      
      if (logManager.isError(index)) {
        errors.push(consolePrefix + ' ' + logManager.getErrorMessage(index))
        return false
        //throw logManager.getErrorMessage(index)
        //break
      }
      
      if (stop) {
        throw stop
        break
      }
    }
    catch (e) {
      let consolePrefix = `[${name}]`
      if (index !== undefined) {
        consolePrefix = `[${index}: ${name}] `
      }
      //console.log(consolePrefix, e)
      logManager.error(index, e)
      
      errors.push(consolePrefix + ' ' + e.message)
      return false  // 後面不繼續了，反正也就卡死了
      //throw e
    }
  }
}

module.exports = excuteTest