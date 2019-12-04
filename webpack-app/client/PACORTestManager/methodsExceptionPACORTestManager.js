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
  
  /**
   * https://gist.github.com/karlgroves/7544592
   */
  PACORTestManager.methods.getDomPath = function (el) {
    var stack = [];
    while (el.parentNode != null) {
      console.log(el.nodeName);
      var sibCount = 0;
      var sibIndex = 0;
      for (var i = 0; i < el.parentNode.childNodes.length; i++) {
        var sib = el.parentNode.childNodes[i];
        if (sib.nodeName == el.nodeName) {
          if (sib === el) {
            sibIndex = sibCount;
          }
          sibCount++;
        }
      }
      if (el.hasAttribute('id') && el.id != '') {
        stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
      } else if (sibCount > 1) {
        stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
      } else {
        stack.unshift(el.nodeName.toLowerCase());
      }
      el = el.parentNode;
    }
    return stack.slice(1); // removes the html element
  }
}