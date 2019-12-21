import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.adminLogin = async function (page) {
  
    await this.waitForElementVisible('#loginUsername')
    
    await this.interact('clear', '#loginUsername')
    
    let name = await this.getAdminName()
    //console.log(name)
    await this.typeInput('#loginUsername', name)
    
    // 接下來要加入切換管理者登入的下拉選單...
    
    throw new Error('@underconstruction')
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
}