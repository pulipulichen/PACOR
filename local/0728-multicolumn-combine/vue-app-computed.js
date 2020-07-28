var appComputed = {
  outputTextarea: function () {
    let cells = this.inputTextarea.split('\n').map(line => line.split('\t'))
    
    let output = []
    
    let columnCount = cells[0].length
    
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < cells.length; r++) {
        output.push(cells[r][c])
      }
    }
    
    return output.join('\n')
  }
}