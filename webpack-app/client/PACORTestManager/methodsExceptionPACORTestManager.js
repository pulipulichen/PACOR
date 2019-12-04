export default function (PACORTestManager) {
  
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
  
  PACORTestManager.methods.getStackTraceString = function () {
    return '\n  ' + this.getStackTrace().join('\n  ')
  }
}