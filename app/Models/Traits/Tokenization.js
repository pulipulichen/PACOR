'use strict'

const TokenizationHelper = use('App/Helpers/TokenizationHelper')

class Tokenization {

  register(Model, fromField, toField) {
    Model.addHook('afterSave', async (instance) => {
      let properties = {}
      let html = instance[fromField]
      if (typeof(html) !== 'string') {
        return false
      }
      
      properties.rawText = TokenizationHelper.htmlToText(html)
      properties.rawText = TokenizationHelper.removePunctuations(properties.rawText)
      
      properties.charFrequency = TokenizationHelper.parseCharFrequency(properties.rawText)
      properties.wordFrequency = TokenizationHelper.parseWordFrequency(properties.rawText, ['n', 'v', 'adj'])
      
      instance[toField] = properties
      await instance.save()
    })
  } // register (Model) {
}

module.exports = Tokenization
