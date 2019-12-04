import RandomTextHelper from './lib/RandomTextHelper.js'

export default function (PACORTestManager) {
  
  /**
   * https://stackoverflow.com/a/28118170/6645399
   */
  PACORTestManager.methods.getStackTrace = function () {

    var stack;

    try {
      throw new Error('');
    } catch (error) {
      stack = error.stack || '';
    }

    stack = stack.split('\n').map(function (line) {
      return line.trim();
    });
    return stack.splice(stack[0] == 'Error' ? 3 : 1);
  }
  
}