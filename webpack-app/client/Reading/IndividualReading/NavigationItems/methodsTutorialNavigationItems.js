import $ from 'jquery'

export default function (NavigationItems) {
  NavigationItems.methods.setupTutorial = function () {
    this.lib.TutorialManager.addAction({
      //backgroundFadeOut: true,
      beforeCallback: async () => {
        //let compactMenuElement = this.$refs.nav.$refs.Menu
        //console.log(compactMenuElement.getBoundingClientRect())
        
        let menu = {
          top: window.innerHeight - 20,
          left: 40,
          width: 10,
          height: 10
        }
        
        await this.lib.TutorialManager.showClick(menu)
        await this.lib.VueHelper.sleep(1000)
        this.$refs.nav.showNormalMenu()
      },
      element: () => {
        return $('.NavigationHeaderItem:visible:first')
      },
      afterClick: () => {
        this.$refs.nav.hideNormalMenu()
      },
      content: this.$t(`Click here to read instruction again.`),
      //scroll: 'start',
      order: 62
    })
  }
}