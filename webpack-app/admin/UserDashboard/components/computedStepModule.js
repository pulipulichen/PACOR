export default function (StepModule) {
  StepModule.computed.displayStepData = function () {
    if (typeof (this.stepData) === 'object') {
      let output = JSON.stringify(this.stepData, null, '  ')
      output = output.slice(2, -2).trim()
      return output
    }
  }

  StepModule.computed.logPair = function () {
    let output = []
    let log = this.log
    if (typeof (log) === 'string'
            && log.startsWith('{') && log.endsWith('}')) {
      try {
        log = JSON.parse(log)
      } catch (e) {
      }
    }

    if (typeof (log) === 'object') {
      for (let name in log) {
        output.push({
          name: name,
          value: log[name]
        })
      }
    }
    //console.log(typeof(this.log))
    return output
  }
}