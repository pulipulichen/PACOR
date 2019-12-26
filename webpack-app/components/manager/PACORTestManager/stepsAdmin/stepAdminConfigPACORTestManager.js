import $ from 'jquery'

export default function (PACORTestManager) {
  console.log('@TEST $ adminConfig')
  window.$ = $
    
  PACORTestManager.methods.adminConfig = async function (page) {
    await this.waitForElementVisibleClick('.NavigationHeaderItem .step')
    
    await this.waitForElementVisible('.header-menu')
    
    // ---------------------------------
    
    if ($('.header-menu .more.item:visible').length > 1) {
      await this.waitForElementVisibleClick('.NavigationHeaderItem .header-menu .more.item')
    }
    
    await this.waitForElementVisibleClick('.NavigationHeaderItem .WebpageConfigEditor')
    
    await this.lib.VueHelper.sleep(1000)
    await this.waitForElementVisible('.webpage-config-textarea')
    
    
    // ----------------
    
    await this.lib.VueHelper.sleep(300 * 1000)
    throw new Error('@underconstruction')
    
    // ---------------------------------
    
    
    
    await this.interact('clear', '#loginUsername')
    
    let config = await this.getAdminConfig()
    //console.log(name)
    await this.typeInput('#loginUsername', config.username)
    await this.typeInput('#loginPassword', config.password)
    
    // 接下來要加入切換管理者登入的下拉選單...
    
    
    await this.waitForElementVisibleClick('div.ui.button.login-submit:not(.disabled)')
    
  }
}