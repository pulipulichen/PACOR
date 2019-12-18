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
    
    let name = await window.PACORTestManagerName()
    //console.log(name)
    await this.typeInput('#loginUsername', name)
    
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
}