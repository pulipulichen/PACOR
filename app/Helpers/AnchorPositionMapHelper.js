'use strict'

const StatisticHelper = use('App/Helpers/StatisticHelper')

let AnchorPositionMapHelper = {
  calcDenseDegree: function (annotations, users) {
    let anchorPositions = this._extractAnchorPositions(annotations)
    if (anchorPositions.length === 0) {
      return 0
    } 
    
    // -------------------------
    
    let {map, userList} = this._buildMap(anchorPositions)

    // --------------------------
    let usersCount = this._calcUsersCount(users, userList)
    
    //console.log('usersCount', usersCount)
    if (usersCount === 0) {
      return 0
    }
    
    if (Array.isArray(users) === false) {
      users = userList
    }

    let denseDegreeArray = []
    Object.keys(map).forEach(seqID => {
      let {minPos, maxPos, usersBitMap} = map[seqID]

      for (let i = minPos; i <= maxPos; i++) {
        if (Array.isArray(usersBitMap[i]) === false) {
          continue
        }

        let userCount = usersBitMap[i].length
        let prop = 0
        if ((usersCount - 1) > 0) {
          prop = (userCount - 1) / (usersCount - 1)
        }
        denseDegreeArray.push(prop)
      }
    })
    console.log(denseDegreeArray)
    let degree = StatisticHelper.average(denseDegreeArray)
    return degree
      
  },
  calcOverlapVector: function (annotations, users, exportType = 'count') {
    let anchorPositions = this._extractAnchorPositions(annotations)
    if (anchorPositions.length === 0) {
      return []
    } 
    
    // -------------------------
    
    let {map, userList} = this._buildMap(anchorPositions)

    // --------------------------
    let usersCount = this._calcUsersCount(users, userList)
    if (usersCount === 0) {
      return []
    }
    
    if (Array.isArray(users) === false) {
      users = userList
    }
    
    // --------------------------

    let vector = users.map(userID => {
      let list = []
      Object.keys(map).forEach(seqID => {
        let {minPos, maxPos, usersBitMap} = map[seqID]

        for (let i = minPos; i <= maxPos; i++) {
          if (Array.isArray(usersBitMap[i]) === false) {
            continue
          }

          let userBitMap = usersBitMap[i]

          if (userBitMap.indexOf(userID) === -1) {
            continue
          }

          if (userBitMap.length > 1) {
            list.push(1)
          }
          else {
            list.push(0)
          }
        }
      })

      if (list.length === 0) {
        return 0
      }

      if (exportType === 'prop') {
        return StatisticHelper.average(list)
      }
      else if (exportType === 'count') {
        return StatisticHelper.sum(list)
      }
    })

    return vector
  },
  _buildMap: function (anchorPositions) {
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

      for (let i = start_pos; i < end_pos; i++) {
        if (Array.isArray(map[seq_id].usersBitMap[i]) === false) {
          map[seq_id].usersBitMap[i] = []
        }
        
        if (map[seq_id].usersBitMap[i].indexOf(user_id) === -1) {
          map[seq_id].usersBitMap[i].push(user_id)
        }
      }
    })
    
    return {
      map,
      userList
    }
  },
  _calcUsersCount: function (users, userList) {
    let usersCount
    if (Array.isArray(users) === false) {
      usersCount = userList.length
    }
    else {
      usersCount = users.length
    }
    if (usersCount < 2) {
      console.log('usersCount is less than 2: ', usersCount)
      return 0
    }
    return usersCount
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
    //console.log(annotations.length)
    annotations.forEach(annotation => {
      //console.log(Array.isArray(annotation.anchorPositions))
      if (Array.isArray(annotation.anchorPositions) === false) {
        return false
      }
      
      annotation.anchorPositions.forEach(anchorPosition => {
        //console.log(anchorPosition.type)
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
    //console.log(anchorPositions)
    
    return anchorPositions
  } 
}

module.exports = AnchorPositionMapHelper