let ClipboardHelper = {
  /**
   * https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
   * @param {type} str
   * @returns {undefined}
   */
  copy: function (str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  },
}

export default ClipboardHelper