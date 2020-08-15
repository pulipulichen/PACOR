//import Krippendorff from './krippendorff.js';
const Krippendorff = use('./krippendorff.js')

let KrippendorffHelper = {
  /**
   * 
   * 
   * 
   * @param {type} arrayData
   * let arrayData = [
      [0, 1],
      [1, 1],
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0],
      [0, 0]
    ]
   * 最後結果是 0.09523809523809508
   * 
   * @param {type} dataType
   * 
   * const DATATYPE = {
  categorical: 1,
  ordinal: 2,
  interval: 3,
  ratio: 4,
};
   * 
   * @returns {Krippendorff._KrAlpha}
   */
  calcAlpha: function (arrayByItem, dataType = 4) {
    let kripCal = new Krippendorff();
    kripCal.setArrayData(arrayByItem, dataType);
    kripCal.calculate();
    let alpha = kripCal._KrAlpha
    if (isNaN(alpha)) {
      alpha = 1
    }
    return alpha
  },
  calcAlphaByRater: function (arrayByRater, dataType = 4) {
    let arrayByItem = this.convertArrayPivot(arrayByRater)
    return this.calcAlpha(arrayByItem, dataType)
  },
  convertArrayPivot: function (arrayByRater) {
    let arrayByItem = []
    
    for (let i = 0; i < arrayByRater.length; i++) {
      let list = arrayByRater[i]
      for (let j = 0; j < list.length; j++) {
        let score = list[j]
        
        if (Array.isArray(arrayByItem[j]) === false) {
          arrayByItem[j] = []
        }
        arrayByItem[j].push(score)
      }
    }
    
    return arrayByItem
  }
}

module.exports = KrippendorffHelper