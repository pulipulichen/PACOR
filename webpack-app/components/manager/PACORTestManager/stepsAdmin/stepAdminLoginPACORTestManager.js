import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.adminLogin = async function (page) {
  
    await this.waitForElementVisibleClick('.switch-mode-item')
    
    await this.interact('clear', '#loginUsername')
    
    let config = await this.getAdminConfig()
    //console.log(name)
    await this.typeInput('#loginUsername', config.username)
    await this.typeInput('#loginPassword', config.password)
    
    // 接下來要加入切換管理者登入的下拉選單...
    
    //throw new Error('@underconstruction')
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
}