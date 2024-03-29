import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.completeChecklists = async function () {
    await this.waitForElementVisible('.SectionChecklist', {
      timeout: 3000,
      errorMessage: '是不是沒有讀取到section init啊？壞掉了嗎？'
    })
    
    let panels = await this.waitForElementVisible('body > article > .SectionPanel', {
      timeout: 3000,
      errorMessage: '是不是section init讀取太久了？'
    })
    //let checklists = await PACORTestManager.waitForElementVisible('body > article > .SectionPanel .SectionChecklist', 1000)

    if (panels.length !== 2) {
      throw new Error('.SectionPanel .SectionChecklist not found')
    }

    //PACORTestManager.log('checklists.length', checklists.length)

    for (let i = 0; i < panels.length; i++) {
      await this.sleep(100)

      //this.log('completeChecklists panel', i, 1)

      let panel = panels.eq(i)
      let checklist = panel.find('.SectionChecklist')
      let items = checklist.find('input[type="checkbox"]')
      if (items.length !== 3) {
        throw new Error('input[type="checkbox"] not found: ' + checklist.html())
      }
      
      //this.log('completeChecklists panel', i, 2)

      for (let j = 0; j < items.length; j++) {
        await this.sleep(100)

        let item = items.eq(j)
        item[0].scrollIntoView({
          behavior: 'smooth'
        })
        item.focus().click()
      } // for (let j = 0; j < items.length; j++) {

      this.sleep(3000)

      //this.log('completeChecklists panel', i, 3)

      //item.parents('.item:first').find('label').click()
      let retry = 0
      
      // 強制讓沒選到的地方重新選3次的做法
      let writeSectionNote = async () => {
        try {
          let editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', {
            timeout: 3000,
            errorMessage: '有出現寫標註的地方嗎？'
          })
          
          // 等待導覽....
          await this.waitTutorial()
          
          //$('.html-editor-container .note-editable').html(this.createRandomHtml())
          await this.typeInput(editor, this.createRandomText())
          await this.sleep(500)
          await this.typeInput(editor, this.createRandomText())

          await this.sleep(100)
          await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', {
            timeout: 3000,
            errorMessage: '似乎不能儲存小節關鍵詞，是不是沒有寫文字？'
          })
        }
        catch (e) {
          retry++
          if (retry < 3) {
            console.log('再試一次', e)
            await writeSectionNote()
          }
          else {
            throw e
          }
        }
      }
      
      await writeSectionNote()
      
      await this.sleep(1000)

      await this.waitForElementVisibleClick('.ui.fluid.button.positive', {
        baseElement: checklist,
        timeout: 6000,
        errorMessage: '呃，是不是整個列表都不見了？發生什麼事情了嗎？也可能是create annotation需要的時間過長...？'
      })


      if (i < panels.length - 1) {
        await this.sleep(1000)

        //let editButton = await PACORTestManager.waitForElementVisible('body > article > .SectionPanel .', 1000)

        let editButton = await this.waitForElementVisible('.SectionAnnotationList > .ui.fluid.button:last', {
          baseElement: panel,
          timeout: 10000,
          errorMessage: '有看到撰寫小節關鍵詞嗎？是不是送出小節checklist的時間太久了？'
        })
        //PACORTestManager.log('editButton', editButton.text().trim())
        if (editButton.text().indexOf('撰寫小節關鍵詞') > -1) {
          throw new Error('Should not be 撰寫小節關鍵詞')
        }
      }
    } // for (let i = 0; i < checklists.length; i++) {
  }

}