// api/models/Product.js
module.exports = {
  attributes: {
    nameOnMenu: { type: 'string', required: true },
    price: { type: 'string', required: true },
    percentRealMeat: { type: 'number', defaultsTo: 20, columnType: 'FLOAT' },
    numCalories: { type: 'number' },
  },
};