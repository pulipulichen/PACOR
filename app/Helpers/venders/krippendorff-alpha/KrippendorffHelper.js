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
  calcAlpha: function (arrayData, dataType = 4) {
    let kripCal = new Krippendorff();
    kripCal.setArrayData(arrayData, dataType);
    kripCal.calculate();
    let alpha = kripCal._KrAlpha
    if (isNaN(alpha)) {
      alpha = 1
    }
    return alpha
  }
}

module.exports = KrippendorffHelper