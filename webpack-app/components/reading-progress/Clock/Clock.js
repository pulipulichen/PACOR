let Clock = {
  data() {
    return {
      hour: 0,
      minute: 0
    }
  },
  mounted() {
    this.refreshClock()
  },
  methods: {
    refreshClock () {
      let d = new Date()
      
      let h = d.getHours()
      if (h < 10) {
        h = '0' + h
      }
      this.hour = h
      
      let m = d.getMinutes()
      if (m < 10) {
        m = '0' + m
      }
      this.minute = m
    }
  }
}

export default Clock