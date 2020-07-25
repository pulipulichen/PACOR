var appComputed = {
  nodes: function () {
    let nodes = []
    this.inputTextareaNode.trim().split("\n").forEach((line, i) => {
      if (i === 0) {
        return false
      }
      
      let parts = line.split("\t")
      
      nodes.push({
        id: parts[0],
        size: Number(parts[1]),
      })
    })
    
    nodes.sort((a, b) => {
      return a.size - b.size
    })
    //console.log(nodes)
    return nodes
  },
  edges: function () {
    let edges = []
    
    let toList
    this.inputTextareaEdge.split("\n").forEach((line, i) => {
      let parts = line.split("\t")
      
      if (i === 0) {
        toList = parts.slice(1)
        //console.log(toList)
      }
      else {
        let source = parts[0]
        
        parts.slice(1).forEach((size, j) => {
          if (size === '0' || size === '') {
            return false
          }
          size = Number(size)
          let target = toList[j]
          
          //if (source === target) {
          //  return false
          //}
          
          edges.push({
            source,
            target,
            size
          })
        })
      }
    })
    
    //console.log(edges)
    
    return edges
  }
}