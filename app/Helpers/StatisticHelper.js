const correlationCoefficientR = use('correlation-coefficient-r')
const KrippendorffHelper = use('./venders/krippendorff-alpha/KrippendorffHelper.js')

let StatisticHelper = {
  /**
   * @author https://blog.yowko.com/javascript-array-sum/
   * @param {type} arr
   * @returns {unresolved}
   */
  sum: function (arr) {
    return arr.reduce((a, b) => a + b);
  },
  /**
   * @author: https://pjchender.blogspot.com/2017/09/mean-median-mode.html
   * @param {Array} arr
   */
  median: function (arr, round = 4) {
    arr = arr.sort((a, b) => a - b)
    let median
    if (arr.length % 2 === 0) {
      // 數目為偶數
      median = (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2
    } else {
      // 數目為奇數
      median = arr[(arr.length - 1) / 2 ]
    }
    
    if (typeof(round) === 'number') {
      median = this.round(median, round)
    }
    
    return median
  },
  /**
   * @Author https://github.com/compute-io/iqr/blob/master/lib/index.js
   * @param {type} arr
   * @param {type} opts
   * @returns {Number}
   */
  iqr: function (arr, opts) {
    if (!Array.isArray(arr)) {
      throw new TypeError('iqr()::invalid input argument. Must provide an array.');
    }
    if (arguments.length > 1) {
      if (opts && typeof (opts) !== 'object') {
        throw new TypeError('iqr()::invalid input argument. Options should be an object.');
      }
    } else {
      opts = {
        'sorted': false
      };
    }
    if (!opts.sorted) {
      arr = arr.slice();
      arr.sort((a, b) => a - b);
      opts.sorted = true;
    }
    return this.quantile(arr, 0.75, opts) - this.quantile(arr, 0.25, opts);
  }, // end FUNCTION iqr()
  /**
   * @Author https://github.com/compute-io/quantile/blob/master/lib/index.js
   */
  quantile: function (arr, p, opts) {
    if (!Array.isArray(arr)) {
      throw new TypeError('quantile()::invalid input argument. First argument must be an array.');
    }
    if (typeof p !== 'number' || p !== p) {
      throw new TypeError('quantile()::invalid input argument. Quantile probability must be numeric.');
    }
    if (p < 0 || p > 1) {
      throw new TypeError('quantile()::invalid input argument. Quantile probability must be on the interval [0,1].');
    }
    if (arguments.length > 2) {
      if (opts && typeof(opts) !== 'object') {
        throw new TypeError('quantile()::invalid input argument. Options must be an object.');
      }
      if (opts.hasOwnProperty('sorted') && typeof opts.sorted !== 'boolean') {
        throw new TypeError('quantile()::invalid input argument. Sorted flag must be a boolean.');
      }
      if (opts.hasOwnProperty('method') && typeof opts.method !== 'string') {
        throw new TypeError('quantile()::invalid input argument. Method must be a string.');
      }
      // TODO: validate that the requested method is supported. list.indexOf( method )
    } else {
      opts = {};
    }
    var len = arr.length,
            id;

    if (!opts.sorted) {
      arr = arr.slice();
      arr.sort((a, b) => a - b);
    }

    // Cases...

    // [0] 0th percentile is the minimum value...
    if (p === 0.0) {
      return arr[ 0 ];
    }
    // [1] 100th percentile is the maximum value...
    if (p === 1.0) {
      return arr[ len - 1 ];
    }
    // Calculate the vector index marking the quantile:
    id = (len * p) - 1;

    // [2] Is the index an integer?
    if (id === Math.floor(id)) {
      // Value is the average between the value at id and id+1:
      return (arr[ id ] + arr[ id + 1 ]) / 2.0;
    }
    // [3] Round up to the next index:
    id = Math.ceil(id);
    return arr[ id ];
  }, // end FUNCTION quantile()
  round: function (float, length = 0) {
    if (isNaN(float) === false) {
      float = Number(float)
    }
    
    if (typeof(float) !== 'number') {
      return float
    }
    
    let base = Math.pow(10, length)
    
    return Math.round(float * base) / base
  },
  /**
   * https://www.npmjs.com/package/correlation-coefficient-r
   * https://github.com/diversen/correlation-coefficient-r/blob/HEAD/test.js
   */
  correlationCoefficientR: function (x, y) {
    return correlationCoefficientR(x, y)
  },
  krippendorffAlpha: function (arrayData, dataType = 4) {
    return KrippendorffHelper.calcAlpha(arrayData, dataType)
  },
  /**
   * https://stackoverflow.com/a/41452260/6645399
   * @param {type} arrayData
   * @returns {Number}
   */
  average: function (arrayData, round = 4) {
    let average = arrayData.reduce((a, b) => a + b) / arrayData.length
    
    
    if (typeof(round) === 'number') {
      average = this.round(average, round)
    }
    
    return average
  }
}

module.exports = StatisticHelper