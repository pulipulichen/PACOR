import $ from 'jquery'

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
    
    window.scrollTo({
      top: 1500
    })
    
    await this.lib.VueHelper.sleep(1000)
    this.lib.TutorialManager.start()
  }
  
  IndividualReading.methods._testTutorialClick = async function () {

    await this.lib.VueHelper.sleep(3000)

    this.lib.TutorialManager.showClick($('.SectionChecklist:first'))
  }

  IndividualReading.methods._testTutorialShowClick = async function () {
    
    await this.lib.VueHelper.sleep(1000)
    
    let paragraph = await this.lib.RangyManager.selectDemoText()
    this.lib.RangyManager.onselect()
        
    var sel = await this.lib.RangyManager.rangy.getSelection();
    var range = sel.getRangeAt(0).cloneRange();
    var rect = range.getBoundingDocumentRect();
    
    rect.windowHeight = window.innerHeight
    rect.pageYOffset = window.pageYOffset
    //alert(JSON.stringify(rect, null, 2))

    this.lib.TutorialManager.showClick(rect)
    
    return
    
    let icon = {
      top: window.innerHeight - 40,
      left: window.innerWidth - 50,
      //top: 50,
      //left: 50,
      width: 10,
      height: 10
    }
    await this.lib.TutorialManager.showClick(icon)
  }
  
  IndividualReading.methods._testDetect = async function () {
    console.log({
      os: this.lib.style.detectOS,
      browser: this.lib.style.detectBrowser,
    })
  }
  
  IndividualReading.methods._testSelectRandom = async function () {
    await this.lib.VueHelper.sleep(1000)
    
    await this.lib.RangyManager.selectDemoText()
    
    await this.lib.VueHelper.sleep(1000)
    
    //$('.fab-cantainer.MainIdea .fabMask').click()
    //$('.fab-cantainer.MainIdea').click()
    //await this.lib.RangyManager.onselect()
  }
}