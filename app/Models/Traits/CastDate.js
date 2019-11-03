// https://forum.adonisjs.com/t/default-castdate-to-unix-timestamp/759/2

class CastDate {
  register(Model, customOptions = {}) {
    const defaultOptions = {
      format: 'x' // milliseconds (unix timestamp)
    }

    const options = Object.assign(defaultOptions, customOptions)


    Model.castDates = function (field, value) {
      //return value.format(options.format)
      if (options.format === 'x') {
        return value.unix() * 1000
      }
      else {
        return value.format(options.format)
      }
    }

  }
}

module.exports = CastDate