const NumberHelper = {
  parseRoughNumber: function ($t, number) {
    if (typeof($t) === 'function') {
      return number
    }
    
    if (number > 100000) {
      number = '!'
    }
    else if (number > 10000) {
      number = Math.floor(number / 10000)
      number = $t('{0}0K', [number])
    }
    else if (number > 1000) {
      number = Math.floor(number / 1000)
      number = $t('{0}K', [number])
    }
    else if (number > 100) {
      number = Math.floor(number / 100)
      number = $t('.{0}K', [number])
    }
    return number
  }
}

export default NumberHelper