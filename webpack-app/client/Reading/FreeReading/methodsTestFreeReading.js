import $ from 'jquery'

export default function (FreeReading) {

  //window.$ = $

  FreeReading.methods._testArticleInformation = async function () {
    console.log('@TEST _testArticleInformation')
    await this.lib.VueHelper.sleep(1000)

    $('.show-side-menu-item:first i').click()

    await this.lib.VueHelper.sleep(1000)
    //this.lib.UserFilter.show()
    $('.article-information-item:first i').click()
    
    await this.lib.VueHelper.sleep(1000)
    $('section.preImaginary-instruction:first').click()
  }

}