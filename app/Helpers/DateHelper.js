const dayjs = use('dayjs')

let DateHelper = {
  parseAtUnixms (at_unixms) {
    return dayjs(parseInt(at_unixms, 10))
  }
}

module.exports = DateHelper