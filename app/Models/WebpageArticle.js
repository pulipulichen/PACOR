/* global use */

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const TokenizationHelper = use('App/Helpers/TokenizationHelper')

class WebpageArticle extends Model {
  static boot () {
    super.boot()
    
    this.addTrait('JSONCase', 'article')
    this.addTrait('JSONCase', 'idea_units')
    
    this.addHook('afterSave', async (instance) => {
      //console.log('@TODO WebpageArticle.beforeSave')
      let changed = false
      if (!instance.idea_units) {
        if (await instance.analyzeIdeaUnits()) {
          changed = true
        }
      }
      if (!instance.idea_units_note) {
        if (await instance.analyzeIdeaUnitsNote()) {
          changed = true
        }
      }
      
      if (changed) {
        await instance.save()
      }
    })
  }
          
  async analyzeIdeaUnits () {
    //this.idea_units = this.article
    let idea_units = []
    let ideaUnitPosList = ['adj', 'v', 'n', 'm']
    //console.log(this.article)
    let paragraphs = JSON.parse(this.article.paragraphs)
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i]
      paragraph = TokenizationHelper.removePunctuations(paragraph)
      
      let segment = TokenizationHelper.parseSegment(paragraph)
      
      let idea_unit = segment.filter(word => word.w.trim() !== '').map(word => {
        let isIdeaUnit = false
        
        for (let j = 0; j < ideaUnitPosList.length; j++) {
          if (word.p.indexOf(ideaUnitPosList[j]) > -1) {
            isIdeaUnit = true
            break
          }
        }
        
        return {
          word: word.w,
          isIdeaUnit: isIdeaUnit
        }
      })
      idea_units.push(idea_unit)
    }
    this.idea_units = {
      paragraphs: idea_units
    }
    return true
  }
  
  async analyzeIdeaUnitsNote () {
    this.idea_units_note = this.idea_units.paragraphs.map((idea_unit) => {
      return idea_unit.map(word => {
        let w = word.word
        if (word.isIdeaUnit) {
          w = '*' + w
        }
        return w
      }).join(' ') 
    }).filter(l => l.trim() !== '').join('\n\n')
    //console.log(this.idea_units_note)
    return true
  }
  
  webpage () {
    return this.belongsTo('App/Models/Webpage')
  }
  
}

module.exports = WebpageArticle