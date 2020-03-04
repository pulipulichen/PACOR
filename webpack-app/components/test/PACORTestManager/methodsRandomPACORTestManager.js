export default function (PACORTestManager) {
    
  PACORTestManager.methods.getRandomInt = function (min, max) {
    if (min && !max) {
      max = min
      min = 0
    }
    
    if (max === 0) {
      return 0
    }
    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * 給於一個0到1之間的數值，返回跟這個一樣的機率
   */
  PACORTestManager.methods.isRandomTrue = function (float) {
    return (Math.random() < float)
  }
  
  /**
   * @return Array 亂數順序的Array
   */
  PACORTestManager.methods.buildRandomIndexList = function (limit) {
    let list = []
    for (let i = 0; i < limit; i++) {
      list.push(i)
    }
    
    list.sort(() => Math.random() - 0.5)
    
    return list
  }
  
  PACORTestManager.methods.getRandomElement = function (elements) {
    if (!elements) {
      return undefined
    }
    else if (elements.length === 1) {
      return elements.eq(0)
    }
    
    let max = elements.length - 1
    let i = this.getRandomInt(max)
    return elements.eq(i)
  }
}