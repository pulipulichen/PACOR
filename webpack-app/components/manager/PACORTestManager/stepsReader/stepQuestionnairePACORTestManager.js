import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeQuestionnaire = async function (page) {
    
    //this.retry(3, async () => {
    try {
      let textarea = await this.waitForElementVisible('textarea.answer')

      if ($('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText())

      await this.sleep(500)
      
      if ($('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText())

  //    textarea.val(this.createRandomText())
  //            .trigger('input')
  //            .trigger('change')

      if ($('textarea.answer:visible') === 0) {
        return
      }

      await this.waitForElementVisibleClick('.ui.button.questionnaire-submit:not(.disabled)')
    }
    catch (e) {
      console.log('對話框似乎已經不見了...')
    }
    //})
      
  }
}