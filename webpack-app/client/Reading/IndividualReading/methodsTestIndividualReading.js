export default function (IndividualReading) {


  // -----------------------------------------------------

  IndividualReading.methods._testSearch = function () {
    if (!this.lib.AnnotationPanel) {
      setTimeout(() => {
        this._testSearch()
      }, 100)
      return
    }

    this.status.search.keyword = "我"

    // 先設定篩選條件
    this.lib.AnnotationPanel.findKeyword(this.status.search.keyword)

    // 再來顯示
    this.lib.AnnotationPanel.setAnchorPositions()
  }

  IndividualReading.methods._testTutorial = async function () {

    await this.lib.VueHelper.sleep(3000)

    this.lib.TutorialManager.start()
  }

}