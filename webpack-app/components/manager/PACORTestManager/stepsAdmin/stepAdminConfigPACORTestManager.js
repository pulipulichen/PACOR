import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.adminConfig = async function (page) {
    
    await this.lib.VueHelper.sleep(300 * 1000)
    throw new Error('@underconstruction')
    
    // ---------------------------------
    
    await this.waitForElementVisibleClick('.switch-mode-item')
    
    await this.interact('clear', '#loginUsername')
    
    let config = await this.getAdminConfig()
    //console.log(name)
    await this.typeInput('#loginUsername', config.username)
    await this.typeInput('#loginPassword', config.password)
    
    // 接下來要加入切換管理者登入的下拉選單...
    
    
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
}