export default (List) => {
  List.methods.scrollList = function (event) {
    if (this.noMore === true) {
      return false
    }
    let element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      //console.log('scrolled');
      this.loadNextPage()
    }
  }
}