export default function (PACORTestManager) {
    
  PACORTestManager.methods.getRandomInt = function (min, max) {
    if (min && !max) {
      max = min
      min = 0
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
}