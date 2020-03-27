import $ from 'jquery'

export default function (PACORTestManager) {
  
  PACORTestManager.methods.waitTutorial = async function () {
    let timeout = this.status.readingConfig.readingProgressModules.reading.tutorialDefaultTimeout
    
    await this.sleep(3000)
    
    let bg = $('.jquery-guide-bg:visible')
    
    let tutorialWaitCount = 0
    while (bg.length > 0) {
      tutorialWaitCount++
      console.log('等待導覽結束... ' + tutorialWaitCount)
      await this.waitForElementHidden('.jquery-guide-bg')
      await this.sleep(timeout)
      bg = $('.jquery-guide-bg:visible')
    }
  }
  
  PACORTestManager.methods.confirmInstructionMessage = async function () {
    await this.sleep(5000)
    
    await this.waitForElementVisibleClick('.ui.modal.InstructionMessage .actions > .button.start-tutorial', {
      timeout: 60 * 1000,
      errorMessage: '是不是傳送給end花太多時間了？'
    })
    
    
    await this.waitTutorial()
    //await this.waitForElementVisibleClick('.finish-modal')
    
    await this.sleep(5000)
  }
}