'use strict'

const TokenizationHelper = use('App/Helpers/TokenizationHelper')

class Tokenization {

  register(Model, {fromField, toField}) {
    if (typeof(fromField) !== 'string' || typeof(toField) !== 'string') {
      throw 'Lost fromField and toField'
    }
    
    Model.addHook('beforeSave', async (instance) => {
      let properties = {}
      let html = instance[fromField]
      if (typeof(html) !== 'string') {
        return false
      }
      console.log('Tokenization', 1)
      properties.rawText = TokenizationHelper.htmlToText(html)
      properties.rawText = TokenizationHelper.removePunctuations(properties.rawText)
      console.log('Tokenization', 2)
      properties.charFrequency = TokenizationHelper.parseCharFrequency(properties.rawText)
      properties.wordFrequency = TokenizationHelper.parseWordFrequency(properties.rawText, ['n', 'v', 'adj'])
      console.log('Tokenization', 3)
      instance[toField] = properties
      //await instance.save()
      console.log('Tokenization', 4)
    })
  } // register (Model) {
}

module.exports = Tokenization
