const dayjs = use('dayjs')

let DateHelper = {
  parseAtUnixms (at_unixms) {
    return dayjs(parseInt(at_unixms, 10))
  },
  getTime () {
    let d = (new Date())
    return d.getTime() + (d.getTimezoneOffset() * 1000)
  }
}

module.exports = DateHelper