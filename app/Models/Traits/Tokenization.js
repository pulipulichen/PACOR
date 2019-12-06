'use strict'

const TokenizationHelper = use('App/Helpers/TokenizationHelper')

const tokenize = function (html) {
  let properties = {}
  if (typeof(html) !== 'string') {
    return false
  }
  //console.log('Tokenization', 1)
  properties.rawText = TokenizationHelper.htmlToText(html)
  properties.rawText = TokenizationHelper.removePunctuations(properties.rawText)
  //console.log('Tokenization', 2)
  properties.charFrequency = TokenizationHelper.parseCharFrequency(properties.rawText)
  properties.wordFrequency = TokenizationHelper.parseWordFrequency(properties.rawText, ['n', 'v', 'adj'])
  //console.log('Tokenization', 3)
  return properties
}

class Tokenization {

  register(Model, {fromField, toField}) {
    if (typeof(fromField) !== 'string' || typeof(toField) !== 'string') {
      throw 'Lost fromField and toField'
    }
    
    /**
     * 這似乎是不能用的
     */
//   Model.addHook('afterSave', async (instance) => {
//      if (!instance[toField]) {
//        return false
//      }
//      let html = instance[fromField]
//      
//      let properties = tokenize(html)
//      instance[toField] = properties
//      await instance.save()
//      //console.log('Tokenization', 4)
//    })
    
    /**
     * 似乎是不能這樣做...
     */
    Model.addHook('afterSave', async (instance) => {
      //console.log(instance[toField])
      if (instance[toField]
              || (typeof(instance[toField]) === 'object' && Object.keys(instance[toField]).length > 0)) {
        return false
      }
      let html = instance[fromField]
      
      let properties = tokenize(html)
      instance[toField] = properties
      await instance.save()
      //console.log('Tokenization', 4)
    })
    
//    Model.addHook('beforeSave', async (instance) => {
//      console.log(instance[toField])
////      if (!instance[toField]
////              || (typeof(instance[toField]) === 'object' && Object.keys(instance[toField]).length === 0)) {
////        return false
////      }
//      let html = instance[fromField]
//      
//      let properties = tokenize(html)
//      instance[toField] = properties
//      //console.log('Tokenization', 4)
//    })
  } // register (Model) {
}

module.exports = Tokenization
