import $ from 'jquery'

export default function (PACORTestManager) {
  //console.log('@TEST $ adminConfig')
  //window.$ = $
    
  PACORTestManager.methods.adminPanel = async function (page) {
    //let webpageConfig = await this.getWebpageConfig()
    //console.log(webpageConfig)
    //return
    
    await this.waitForElementVisibleClick('.NavigationHeaderItem .step')
    
    // ---------------------------------
    //await this.adminConfig(page)
    await this.adminGroup(page)
  }
  
  PACORTestManager.methods.adminConfig = async function (page) {
    await this.waitForElementVisible('.header-menu')
    //console.log($('.header-menu .more.item:visible').length)
    if ($('.header-menu .more.item:visible').length > 0) {
      await this.waitForElementVisibleClick('.header-menu .more.item')
      await this.lib.VueHelper.sleep(500)
    }
    
    let webpageConfig = await this.getWebpageConfig()
    //console.log(webpageConfig)
    if (webpageConfig && webpageConfig !== '' && webpageConfig !== '{}') {
      await this.waitForElementVisibleClick('.WebpageConfigEditor')

      await this.lib.VueHelper.sleep(1000)
     
      await this.waitForElementVisible('.webpage-config-textarea')
      
      $('.webpage-config-textarea').val('')
      await this.typeInput('.webpage-config-textarea:visible:first', webpageConfig)


      await this.lib.VueHelper.sleep(500)
      await this.waitForElementVisibleClick('.webpage-config-submit')

      //await this.pressEsc()

      await this.waitForElementVisibleClick('.ConfirmModal .cancel.button')
      await this.sleep(3000)
    }
  }
  
  PACORTestManager.methods.adminGroup = async function (page) {
    await this.waitForElementVisible('.header-menu')
    if ($('.header-menu .more.item:visible').length > 0) {
      await this.waitForElementVisibleClick('.header-menu .more.item')
      await this.lib.VueHelper.sleep(500)
    }
    
    let webpageGroup = await this.getWebpageGroup()
    //console.log(webpageGroup)
    if (webpageGroup && webpageGroup !== '' && webpageGroup !== '{}') {
      
      await this.waitForElementVisibleClick('.WebpageGroupEditor')

      await this.lib.VueHelper.sleep(1000)
      await this.waitForElementVisible('.webpage-group-textarea')

      //$('.webpage-group-textarea').val(webpageGroup)
      //$('.webpage-group-textarea').val('')
      
      await this.lib.VueHelper.sleep(500)
      
      $('.webpage-group-textarea').val('')
      await this.typeInput('.webpage-group-textarea:visible:first', webpageGroup)

      await this.lib.VueHelper.sleep(500)
      await this.waitForElementVisibleClick('.webpage-group-submit')

      //await this.pressEsc()

      await this.waitForElementVisibleClick('.ConfirmModal .cancel.button')
      await this.sleep(3000)
    }
  }
}