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
      
      let direct = true
      if (cells[2] === "1") {
        direct = true
      }
      else if (cells[2] === "0" || cells[2] === "-1") {
        direct = false
      }
      else {
        direct = (cells[2] === "TRUE")
      }
      
      let conf = Number(cells[3])
      let sup = Number(cells[4])
      
      
      //console.log(target)
      
      //target = 1 / Math.log(target)
      //target = 1 / Math.sqrt(target)
      //target = Math.round(target * 1000) / 1000
      //if (direct === false) {
      //  target = target * -1
      //}
      
      data[label][attr] = {
        target,
        direct,
        conf,
        sup
      }
    })
    
    // ----------------------------------
    
    labels.sort()
    attrs.sort()
    
    let maxMinInterval = max - min
    
    // ----------------------------------
    
    let rows = []
    
    let labelsRow = ["Attributes"].concat(labels.map(l => "Label " + l))
            .concat(["Fit Avg.","Conf Avg.", "Sup Avg.", ""])
            .concat(labels.map(l => "Label " + l + " Conf"))
            .concat([""])
            .concat(labels.map(l => "Label " + l + " Sup"))
    
    rows.push(labelsRow.join("\t"))
    
    attrs.forEach(attr => {
      let row = [attr]
      
      let sum = 0
      let count = 0
      let max = 0
      labels.forEach(label => {
        if (data[label] 
                && typeof(data[label][attr]) === "object") {
          
          let { target, direct } = data[label][attr]
          
          target = (target - min) / maxMinInterval
          target = 1 - target
          //target = Math.log(target)
          
          sum = sum + target
          count++
          
          if (target > max) {
            max = target
          }
          
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
      
      /*
      if (count > 0) {
        let avg = sum / count
        avg = Math.round(avg * 10000) / 10000
        row.push(avg)
      }
      else {
        row.push(0)
      }
      */
      max = Math.round(max * 1000000) / 10000
      row.push(max)
      
      // 再來計算最大conf
      sum = 0
      count = 0
      max = 0
      labels.forEach(label => {
        if (data[label] 
                && typeof(data[label][attr]) === "object") {
          
          let { conf } = data[label][attr]
          
          if (typeof(conf) === 'number') {
            sum = sum + conf
            count++
            
            if (conf > max) {
              max = conf
            }
          }
        }
      })
      
      /*
      if (count > 0) {
        let avg = sum / count
        avg = Math.round(avg * 10000) / 10000
        row.push(avg)
      }
      else {
        row.push(0)
      }
       */
      max = Math.round(max * 1000) / 1000
      row.push(max)
      
      // 再來計算平均sup
      sum = 0
      count = 0
      max = 0
      labels.forEach(label => {
        if (data[label] 
                && typeof(data[label][attr]) === "object") {
          
          let { sup } = data[label][attr]
          
          if (typeof(sup) === 'number') {
            sum = sum + sup
            count++
            
            if (sup > max) {
              max = sup
            }
          }
        }
      })
      
      /*
      if (count > 0) {
        let avg = sum / count
        avg = Math.round(avg * 10000) / 10000
        row.push(avg)
      }
      else {
        row.push(0)
      }
      */
      max = Math.round(max * 1000) / 1000
      row.push(max)
     
      // ------------------------
      // 分隔線
      
      row.push("")
      
      // ------------------------
      // 再來取得conf
      labels.forEach(label => {
        if (data[label] 
                && typeof(data[label][attr]) === "object") {
          
          let { conf } = data[label][attr]
          conf = Math.round(conf * 1000) / 1000
          //console.log(target)
          row.push(conf)
        }
        else {
          row.push("")
        }
      })
      
      row.push("")
      
      // 再來取得conf
      labels.forEach(label => {
        if (data[label] 
                && typeof(data[label][attr]) === "object") {
          
          let { sup } = data[label][attr]
          sup = Math.round(sup * 1000) / 1000
          //console.log(target)
          row.push(sup)
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