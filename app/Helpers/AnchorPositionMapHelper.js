'use strict'

let AnchorPositionMapHelper = {
  annotationsToMap: function (annotations) {
    if (Array.isArray(annotations) === false) {
      if (typeof(annotations.toJSON) === 'function') {
        annotations = annotations.toJSON()
      }
      else {
        return {}
      }
    }
    
    // ------------
    
    let map = {}
    
    annotations.forEach(annotation => {
      if (Array.isArray(annotation.anchorPositions) === false) {
        return false
      }
      
      annotation.anchorPositions.forEach(anchorPosition => {
        if (anchorPosition.type !== 'textContent') {
          return false
        }
        
        let seqID = anchorPosition.seq_id
        let startPos = anchorPosition.start_pos
        let endPos = anchorPosition.end_pos
        
        if (typeof(map[seqID]) === 'undefined') {
          map[seqID] = {
            minPos: startPos,
            maxPos: endPos,
            bitMap: {}
          }
        }
        
        if (map[seqID].minPos > startPos) {
          map[seqID].minPos = startPos
        }
        if (map[seqID].maxPos < endPos) {
          map[seqID].maxPos = endPos
        }
        
        for (let i = startPos; i <= endPos; i++) {
          map[seqID].bitMap[i] = true
        }
      })
    })
    
    // ------------
    let mergeMap = {}
    
    Object.keys(map).forEach(seqID => {
      let {minPos, maxPos, bitMap} = map[seqID]
      
      let ranges = []
      let startPos = null
      for (let i = minPos; i <= maxPos; i++) {
        if (bitMap[i] === true) {
          if (startPos === null) {
            startPos = i
          }
        }
        else {
          if (startPos !== null) {
            let endPos = i - 1
            ranges.push([startPos, endPos])
            startPos = null
          }
        }
      }
    })
    
    return mergeMap
  }
}

module.exports = AnchorPositionMapHelper