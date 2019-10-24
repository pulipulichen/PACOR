'use strict'

const WebpageModel = use('App/Models/Webpage')

const { HttpException } = use('@adonisjs/generic-exceptions') 

const Cache = use('Cache')

class Webpage {
  async agreement ({ webpage }) {
    return await webpage.getAgreement()
  }
}

module.exports = Webpage
