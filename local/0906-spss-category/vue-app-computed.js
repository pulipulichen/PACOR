var appComputed = {
  outputTextarea: function () {
    let levels = []
    return this.inputTextarea.split('\n').map(line => {
      return line.split('\t').map((field, i) => {
        if (Array.isArray(levels[i]) === false) {
          levels[i] = []
        }
        
        if (isNaN(field) === false) {
          return field
        }
        
        let pos = levels[i].indexOf(field)
        if (pos === -1) {
          pos = levels[i].length
          levels[i].push(field)
        }
        return pos
      }).join('\t')
      
    }).join('\n')
    
  }
}