'use strict'

const Sleep = (second) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, second * 1000)
  })
}

module.exports = Sleep