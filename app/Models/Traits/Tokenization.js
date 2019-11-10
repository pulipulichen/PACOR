'use strict'

const TokenizationHelper = use('App/Helpers/TokenizationHelper')

class Tokenization {

  register(Model, field) {
    Model.addHook('afterSave', async (instance) => {
      let properties = {}
      
      properties.rawText = TokenizationHelper.htmlToText(instance.note)
      properties.rawText = TokenizationHelper.removePunctuations(properties.rawText)
      
      properties.charFrequency = TokenizationHelper.parseCharFrequency(properties.rawText)
      properties.wordFrequency = TokenizationHelper.parseWordFrequency(properties.rawText, ['n', 'v', 'adj'])
      
      instance[field] = properties
      await instance.save()
    })
  } // register (Model) {
}

module.exports = Tokenization
