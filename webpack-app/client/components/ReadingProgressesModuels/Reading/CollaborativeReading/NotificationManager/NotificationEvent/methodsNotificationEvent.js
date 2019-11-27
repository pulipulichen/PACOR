export default {
  read() {
    throw new Error('read' + this.notification)
  }
} // methods