import $ from 'jquery'

export default function (PACORTestManager) {
  //window.$ = $
    
  PACORTestManager.methods.adminLogin = async function (page) {
    
    await this.waitForElementVisible('.header-menu')
    await this.sleep(500)
    //await this.sleep(3000 * 1000)
    if ($('.header-menu .more.item:visible').length > 0) {
      await this.waitForElementVisibleClick('.header-menu .more.item')
      //console.log('有點到嗎？')
      await this.sleep(500)
    }
    
    await this.waitForElementVisibleClick('.switch-mode-item')
    await this.interact('clear', '#loginUsername')
    
    let config = await this.getAdminConfig()
    //console.log(config)
    //console.log(name)
    await this.typeInput('#loginUsername', config.username)
    await this.typeInput('#loginPassword', config.password)
    
    // 接下來要加入切換管理者登入的下拉選單...
    
    //throw new Error('@underconstruction')
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
}