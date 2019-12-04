import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeQuestionnaire = async function (page) {
    //throw new Error('Questionnaire')
    
    let textarea = await this.waitForElementVisible('textarea.answer')
    
    await this.typeInput('textarea.answer', this.createRandomText())
    
//    textarea.val(this.createRandomText())
//            .trigger('input')
//            .trigger('change')
    
    await this.waitForElementVisibleClick('.ui.button.questionnaire-submit:not(.disabled)')
  }
}