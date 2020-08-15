/**
 * @param {Array} sequenceArray 
 * @param {Object} options
 * {
 *  codes: ['1','2', '3'],
 *  lag: 1,
 *  mergeRepeat: false,
 *  exportMode: 'flat-json' || 'nest-json' || 'array'
 * } 
 * 
 * let data = [1, 2, 2, 1]
    
    console.log(SequenceHelper(data, {
      mergeRepeat: true,
      exportMode: 'nest-json'
    }))
 */
const SequenceHelper = function (sequenceArray, options = {}) {
  sequenceArray = parseSequenceArray(sequenceArray)
  
  let fixedCode = false
  let codes = []
  if (Array.isArray(options.codes) === true) {
    codes = options.codes
    fixedCode = true
  }
  
  let exportMode = 'flat-json'
  if (typeof(options.exportMode) === 'string') {
    exportMode = options.exportMode.toLowerCase()
  }
  
  let nestData = {}
  
  let buffer = []
  let bufferMaxLength = 2
  if (typeof(options.lag) === 'number') {
    bufferMaxLength = options.lag
  }
  
  // -------------------
  sequenceArray.forEach(sequence => {
    sequence.forEach(s => {
      if (fixedCode === false 
              && codes.indexOf(s) === -1) {
        codes.push(s)
      }
      
      if (options.mergeRepeat === true 
              && buffer.length > 0) {
        let lastCode = buffer[(buffer.length - 1)]
        if (Array.isArray(lastCode) === true
                && Array.isArray(s) === true) {
          if (lastCode.join(',') === s.join(',')) {
            return false
          }
        }
        else if (lastCode === s) {
          return false
        }
      }
      
      buffer.push(s)
      if (buffer.length === bufferMaxLength) {
        // 這邊還沒有考慮到高lag跟多重編碼的情況
        addCountNestedData(nestData, buffer)
        buffer.shift() // 移除第一個
      }
    })
    
    buffer = []
  })
  
  // ------------------------------
  if (fixedCode === false) {
    codes.sort()
  }
  
  let output
  if (exportMode === 'array') {
    output = []
  }
  else {
    output = {}
  }
  
  let codesLagList = buildCodesLagList(codes, bufferMaxLength)
  
  //console.log(codesLagList)
  
  
  codesLagList.forEach(list => {
    // 把0的部分填滿
    let count = getNestDataRecursive(nestData, list)
   
    if (exportMode === 'array') {
      output.push(count)
    } 
    else if (exportMode === 'flat-json') {
      output[list.join(',')] = count
    }
    else {
      setNestDataRecursive(output, list, count)
    }
  })
  
  return output
}

let parseSequenceArray = function (sequenceArray) {
  if (typeof(sequenceArray) === 'string') {
    return [sequenceArray.split('')]
  }
  else if (Array.isArray(sequenceArray) === false || sequenceArray.length === 0) {
    throw new Error('sequenceArray should be array:' + sequenceArray)
    return false
  }
  
  if (Array.isArray(sequenceArray[0]) === false) {
    return [sequenceArray]
  }
  else {
    return sequenceArray
  }
}

let addCountNestedData = function (nestData, buffer) {
  let lagList = bufferToLagList(buffer)
  
  lagList.forEach(list => {
    setNestDataRecursive(nestData, list)
  })
}

let setNestDataRecursive = function (baseData, list, addCount = true) {
  let code = list[0]
  if (list.length === 1) {
    if (typeof(baseData[code]) !== 'number') {
      if (typeof(addCount) === 'number') {
        baseData[code] = addCount
      }
      else {
        baseData[code] = 0
      }
    }
    
    if (addCount === true) {
      baseData[code]++
    }
  }
  else {
    if (typeof(baseData[code]) !== 'object') {
      baseData[code] = {}
    }
    
    let nextList = list.slice(1)
    let nextBaseData = baseData[code]
    setNestDataRecursive(nextBaseData, nextList, addCount)
  }
}

let getNestDataRecursive = function (baseData, list) {
  let code = list[0]
  if (list.length === 1) {
    if (typeof(baseData[code]) !== 'number') {
      return 0
    }
    else {
      return baseData[code]
    }
  }
  else {
    if (typeof(baseData[code]) !== 'object') {
      baseData[code] = {}
    }
    
    let nextList = list.slice(1)
    let nextBaseData = baseData[code]
    return getNestDataRecursive(nextBaseData, nextList)
  }
}

let bufferToLagList = function (buffer) {
  let lagList = []
  
  buffer.forEach(b => {
    if (Array.isArray(b) === false) {
      if (lagList.length === 0) {
        lagList.push([b])
        return true
      }
      else {
        lagList.forEach(l => {
          l.push(b)
        })
      }
    }
    else {
      if (lagList.length === 0) {
        lagList.push(b)
        return true
      }
      else {
        let newLagList = []
        b.forEach(code => {
          lagList.forEach(l => {
            l.push(code)
            newLagList.push(l)
          })
        })
        lagList = newLagList
      }
    }
  })
  
  return lagList
}

let buildCodesLagList = function (codes, bufferMaxLength = 2) {
  let output = []
  codes.forEach(c => {
    output.push([c])
  })
  
  //console.log(output)
  //console.log('-----------')
  
  //console.log()
  while (output[0].length < bufferMaxLength) {
    let temp = [].concat(output)
    //console.log('temp')
    //console.log(temp)
    output = []
    codes.forEach(c => {
      //console.log('c', c)
      temp.forEach(t => {
        output.push(t.concat(c))
      })
    })
  }
  
  //console.log(output)
  
  return output
}


module.exports = SequenceHelper