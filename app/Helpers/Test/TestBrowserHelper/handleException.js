const Sleep = use('Sleep')

let handleException = async function ({errors, headless, index, logManager}) {
  if (errors.length > 0) {
    
    // 這裡要決定要不要輸出檔案
    logManager.saveErrorLogs()
    
    if (headless === false) {
      // ---------------------------
      
//      let prefix = `[ERROR]`
//      if (index !== undefined) {
//        prefix = `[${index}: ERROR]`
//      }
//      console.log(prefix, '\n\n' + errors.join('\n') + '\n')
      logManager.printErrorMessage()
      
      //-----------------------------
      
      let time = 8 * 60 * 60
      console.log(`Wait ${time} seconds for debug...`)
      await Sleep(time) // 暫停30分鐘
      //throw new Error('')
    }
    else {
      logManager.printErrorMessage()
      //throw new Error('\n\n' + errors.join('\n') + '\n')
    }
    
    throw new Error('')
  }
}

module.exports = handleException