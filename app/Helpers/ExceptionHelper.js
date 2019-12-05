const ExceptionHelper = {
  getStackTrace: function (spliceStart = 3) {

    var stack;

    try {
      throw new Error('');
    } catch (error) {
      stack = error.stack || '';
    }

    stack = stack.split('\n').map(function (line) {
      return line.trim();
    });
    return stack.splice(stack[0] === 'Error' ? spliceStart : 1);
  },
  
  getStackTraceString: function (spliceStart) {
    return '\n  ' + this.getStackTrace(spliceStart).join('\n  ')
  }
}

module.exports = ExceptionHelper
