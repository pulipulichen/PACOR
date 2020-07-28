var appComputed = {
  outputTextarea: function () {
    let cells = this.inputTextarea.split('\n').map(line => line.split('\t'))
    
    let output = []
    
    let columnCount = cells[0].length
    
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < cells.length; r++) {
        let cell = cells[r][c]
        if (cell === '') {
          cell = '-'
        }
        output.push(cell)
      }
    }
    
    return output.join('\n')
  }
}