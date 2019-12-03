import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeQuestionnaire = async function (ms) {
    //throw new Error('Questionnaire')
    
    let textarea = await this.waitForElementVisible('textarea.answer')
    textarea.val(RandomTextHelper())
    await this.waitForElementVisibleClick('.ui.button.questionnaire-submit:not(.disabled)')
  }
}