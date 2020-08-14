/**
 * @param {Array} sequenceArray 
 * @param {Object} options
 * {
 *  codes: ['1','2', '3'],
 *  lag: 1 // 固定這個
 *  exportMode: 'flat-json' || 'nest-json' || 'array'
 * } 
 */
const SequenceHelper = function (sequenceArray, options = {}) {
  sequenceArray = parseSequenceArray
  
  let fixedCode = false
  let codes = []
  if (Array.isArray(options.codes) === true) {
    codes = options.codes
    fixedCode = true
  }
  
  let exportMode = 'flat-json'
  if (typeof(options.exportMode) === 'string') {
    exportMode = options.exportMode
  }
  
  let nestData = {}
  
  let buffer = []
  
  // -------------------
  sequenceArray.forEach(sequence => {
    sequence.forEach(s => {
      if (fixedCode === false 
              && codes.indexOf(s) === -1) {
        codes.push(s)
      }
      
      buffer.push(s)
      
    })
    
    buffer = []
  })
  
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

module.exports = SequenceHelper