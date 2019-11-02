'use strict'

class DateUnixMSCase {

  register (Model, attrs) {
    
    Model.prototype.getCreatedAt = function (moment) {
      return moment.unix() * 1000
    }
  
    Model.prototype.getUpdatedAt = function (moment) {
      return moment.unix() * 1000
    }
  }
}

module.exports = DateUnixMSCase
