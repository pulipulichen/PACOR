var appComputed = {
  allCodes: function () {
    return this.inputCodesTextarea.trim().split(' ')
  },
  outputTextarea: function () {
    let lines = this.inputTextarea.trim().split('\n')
    
    let output = []
    lines.forEach((line, i) => {
      let codes = line.trim().split(' ')
      
      this.allCodes.forEach(code => {
        let codeFound = (codes.indexOf(code) > -1)
        if (codeFound === true) {
          codeFound = 'true'
        }
        else {
          codeFound = 'false'
        }
        
        output.push([
          i + '_' + code,
          codeFound
        ].join('\t'))
      })
    })
    
    return output.join('\n')
  }
}