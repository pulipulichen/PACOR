'use strict'

const StringHelper = use('App/Helpers/StringHelper')

let AnchorPositionMapHelper = {
  calcDenseDegree: function (annotations, usersCount) {
    let anchorPositions = this._extractAnchorPositions(annotations)
    if (anchorPositions.length === 0) {
      return 0
    } 
    
    // -------------------------
    
    let map = {}
    
    let userList = []
    
    anchorPositions.forEach(({user_id, seq_id, start_pos, end_pos}) => {
      if (userList.indexOf(user_id) === -1) {
        userList.push(user_id)
      }
      
      if (!map[seq_id]) {
        map[seq_id] = {
          minPos: start_pos,
          maxPos: end_pos,
          usersBitMap: {}
        }
      }
      
      if (map[seq_id].minPos > start_pos) {
        map[seq_id].minPos = start_pos
      }
      if (map[seq_id].maxPos < end_pos) {
        map[seq_id].maxPos = end_pos
      }

      for (let i = start_pos; i <= end_pos; i++) {
        if (Array.isArray(map[seq_id].usersBitMap[i]) === false) {
          map[seq_id].usersBitMap[i] = []
        }
        
        if (map[seq_id].usersBitMap[i].indexOf(user_id) === -1) {
          map[seq_id].usersBitMap[i].push(user_id)
        }
      }
    })
    
    // --------------------------
    if (typeof(usersCount) !== 'number') {
      usersCount = userList.length
    }
    
    let denseDegreeArray = []
    Object.keys(map).forEach(seqID => {
      let {minPos, maxPos, usersBitMap} = map[seqID]
      
      for (let i = minPos; i <= maxPos; i++) {
        let userCount = usersBitMap[i].length
        let prop = (userCount - 1) / (usersCount - 1)
        denseDegreeArray.push(prop)
      }
    })
    
    let degree = StringHelper.average(denseDegreeArray)
    return degree
    //return StringHelper.round(degree, 4)
  },
  annotationsToMap: function (annotations) {
    annotations = this._filterAnnotations(annotations)
    if (Array.isArray(annotations) === false) {
      return {}
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
  },
  _extractAnchorPositions: function (annotations) {
    if (Array.isArray(annotations) === false) {
      if (typeof(annotations.toJSON) === 'function') {
        annotations = annotations.toJSON()
      }
      else {
        return []
      }
    }
    
    let anchorPositions = []
    annotations.forEach(annotation => {
      if (Array.isArray(annotation.anchorPositions) === false) {
        return false
      }
      
      annotation.anchorPositions.forEach(anchorPosition => {
        if (anchorPosition.type !== 'textContent') {
          return false
        }
        
        anchorPositions.push({
          user_id: annotation.user_id,
          seq_id: anchorPosition.seq_id,
          start_pos: anchorPosition.start_pos,
          end_pos: anchorPosition.end_pos
        })
      })
    })
    
    return anchorPositions
  } 
}

module.exports = AnchorPositionMapHelper