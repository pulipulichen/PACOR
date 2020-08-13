let StatisticHelper = {
  /**
   * @author: https://pjchender.blogspot.com/2017/09/mean-median-mode.html
   * @param {Array} arr
   */
  median: function (arr) {
    arr = arr.sort((a, b) => a - b)
    let median
    if (arr.length % 2 === 0) {
      // 數目為偶數
      median = (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2
    } else {
      // 數目為奇數
      median = arr[(arr.length - 1) / 2 ]
    }
    return median
  },
  /**
   * @author https://blog.yowko.com/javascript-array-sum/
   * @param {type} arr
   * @returns {unresolved}
   */
  sum: function (arr) {
    return arr.reduce((a,b)=>a+b);  
  }
}

module.exports = StatisticHelper