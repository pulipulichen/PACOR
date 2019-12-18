import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.login = async function (page) {
    
//    await page.waitForElement('#loginUsername')
//          .clear('#loginUsername')
//          .type('#loginUsername', '布丁' + (new Date()).getTime())
//          .waitForElement('div.ui.button.login-submit:not(.disabled)')
//          .click('div.ui.button.login-submit:not(.disabled)')
  
    await this.waitForElementVisible('#loginUsername')
    
    await this.interact('clear', '#loginUsername')
    
    let name = await this.getName()
    //console.log(name)
    await this.typeInput('#loginUsername', name)
    
    let index = await this.getIndex()
    //if (index === 0) {
    if (false) {
      await this.waitForElementVisibleClick('div.ui.button.login-submit1111:not(.disabled)', {
        timeout: 100
      })
    }
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
}