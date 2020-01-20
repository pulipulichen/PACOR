'use strict'

let TypeHelper = {
  parseInt: function (value) {
    if (typeof (value) === 'string'
            && isNaN(value) === false) {
      value = parseInt(value, 10)
    }

    if (typeof (value) === 'number') {
      return value
    }
  },
  mergeDeep: function (...objects) {
    const isObject = obj => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
      if (obj) {
        Object.keys(obj).forEach(key => {
          const pVal = prev[key];
          const oVal = obj[key];

          if (Array.isArray(pVal) && Array.isArray(oVal)) {
            //prev[key] = pVal.concat(...oVal);
            prev[key] = oVal  // Array 直接取代
          } else if (isObject(pVal) && isObject(oVal)) {
            prev[key] = this.mergeDeep(pVal, oVal);
          } else {
            prev[key] = oVal;
          }
        });
      }

      return prev;
    }, {});
  }
}

module.exports = TypeHelper