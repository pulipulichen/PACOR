var appComputed = {
  /*
  outputTextarea: function () {
    let labels = []
    let attrs = []
    
    let data = {}
    
    this.inputTextarea.trim().split("\n").forEach(line => {
      let cells = line.trim().split("\t")
      
      let attrString = cells[0].slice(2)
      attrString = attrString.slice(0, attrString.indexOf(" ( "))
      
      let attrParts = attrString.split(" = Label ")
      let attr = attrParts[0]
      
      if (attrs.indexOf(attr) === -1) {
        attrs.push(attr)
        
        data[attr] = {}
      }
      
      let label = attrParts[1]
      if (labels.indexOf(label) === -1) {
        labels.push(label)
      }
      
      let target = Number(cells[1])
      //console.log(target)
      target = Math.round(target * 1000) / 1000
      
      data[attr][label] = target
    })
    
    // ----------------------------------
    
    labels.sort()
    attrs.sort()
    
    // ----------------------------------
    
    let rows = []
    
    rows.push(["Label"].concat(attrs).join("\t"))
    
    labels.forEach(label => {
      let row = [label]
      
      attrs.forEach(attr => {
        if (data[attr] 
                && typeof(data[attr][label]) === "number") {
          row.push(data[attr][label])
        }
        else {
          row.push("")
        }
      })
      
      rows.push(row.join("\t"))
    })
    
    return rows.join("\n")
  }
  */
  outputTextarea: function () {
    let labels = []
    let attrs = []
    
    let data = {}
    
    
    let min = null
    let max = null

    
    this.inputTextarea.trim().split("\n").forEach(line => {
      let cells = line.trim().split("\t")
      
      let attrString = cells[0].slice(2)
      attrString = attrString.slice(0, attrString.indexOf(" ( "))
      
      let attrParts = attrString.split(" = Label ")
      let attr = attrParts[0].trim()
      
      let label = attrParts[1]
      if (labels.indexOf(label) === -1) {
        labels.push(label)
        
        data[label] = {}
      }
      
      if (attrs.indexOf(attr) === -1) {
        attrs.push(attr)
        //data[attr] = {}
      }
      
      
      let target = Number(cells[1])
      
      if (target === 0) {
        return false
      }
      
      if (min === null) {
        min = max = target
      }
      if (target < min) {
        min = target
      }
      if (target > max) {
        max = target
      }
      
      let direct = (cells[2] === "TRUE")
      
      //console.log(target)
      
      //target = 1 / Math.log(target)
      //target = 1 / Math.sqrt(target)
      //target = Math.round(target * 1000) / 1000
      //if (direct === false) {
      //  target = target * -1
      //}
      
      data[label][attr] = {
        target,
        direct
      }
    })
    
    // ----------------------------------
    
    labels.sort()
    attrs.sort()
    
    let maxMinInterval = max - min
    
    // ----------------------------------
    
    let rows = []
    
    rows.push(["Attributes"].concat(labels.map(l => "Label " + l)).join("\t"))
    
    attrs.forEach(attr => {
      let row = [attr]
      
      labels.forEach(label => {
        if (data[label] 
                && typeof(data[label][attr]) === "object") {
          
          let { target, direct } = data[label][attr]
          
          target = (target - min) / maxMinInterval
          target = 1 - target
          //target = Math.log(target)
          
          target = Math.round(target * 1000000) / 10000
          
          if (direct === false) {
            target = target * -1
          }
          
          //console.log(target)
          row.push(target)
        }
        else {
          row.push("")
        }
      })
      
      rows.push(row.join("\t"))
    })
    
    return rows.join("\n")
  }
}