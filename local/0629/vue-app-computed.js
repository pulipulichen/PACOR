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
      
      //console.log(target)
      target = Math.round(target * 1000) / 1000
      
      data[label][attr] = target
    })
    
    // ----------------------------------
    
    labels.sort()
    attrs.sort()
    
    // ----------------------------------
    
    let rows = []
    
    rows.push(["Attributes"].concat(labels.map(l => "Label " + l)).join("\t"))
    
    attrs.forEach(attr => {
      let row = [attr]
      
      labels.forEach(label => {
        if (data[label] 
                && typeof(data[label][attr]) === "number") {
          row.push(data[label][attr])
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