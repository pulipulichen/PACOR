import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.writeQuestionnaireSplit = async function (page) {
    
    //this.retry(3, async () => {
    try {
      let textarea = await this.waitForElementVisible('textarea.answer')

      if ($('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

      await this.sleep(500)
      
      if ($('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

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
  
  PACORTestManager.methods.writeQuestionnairePage = async function (page) {
    
    //this.retry(3, async () => {
    try {
      await this.waitForElementVisibleClick('.ui.button.open-answer-page')
      
      let textarea = await this.waitForElementVisible('textarea.answer')

      if ($('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

      await this.sleep(500)
      
      if ($('textarea.answer:visible') === 0) {
        return
      }

      await this.typeInput('textarea.answer', this.createRandomText(), false)

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
  
  PACORTestManager.methods.writeQuestionnairePageKeyword = async function (page) {
    
    //this.retry(3, async () => {
    try {
      await this.waitForElementVisibleClick('.ui.button.open-answer-page')
      
      let input = await this.waitForElementVisible('.ui.search input')

      if ($('.ui.search input') === 0) {
        return
      }

      for (let i = 0; i < this.getRandomInt(2, 5); i++) {
        await this.typeInput('.ui.search input', this.createRandomKeyword(), false)
        await this.sleep(100)
        await this.waitForElementVisibleClick('.ui.search .submit-button')
        await this.sleep(100)
      }
      
      await this.waitForElementVisibleClick('.ui.button.questionnaire-submit:not(.disabled)')
    }
    catch (e) {
      console.log('對話框似乎已經不見了...')
    }
    //})
  }
}