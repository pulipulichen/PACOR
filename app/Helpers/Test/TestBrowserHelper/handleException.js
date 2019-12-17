const Sleep = use('Sleep')

let handleException = async function (errors, headless, index) {
  if (errors.length > 0) {
    if (headless === false) {
      let prefix = `[ERROR]`
      if (index !== undefined) {
        prefix = `[${index}: ERROR]`
      }
      console.log(prefix, '\n\n' + errors.join('\n') + '\n')
      
      let time = 8 * 60 * 60
      console.log(`Wait ${time} seconds for debug...`)
      await Sleep(time) // 暫停30分鐘
      throw new Error('')
    }
    else {
      throw new Error('\n\n' + errors.join('\n') + '\n')
    }
  }
}

module.exports = handleException