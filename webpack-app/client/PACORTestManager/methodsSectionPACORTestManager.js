import $ from 'jquery'

export default function (PACORTestManager) {
  PACORTestManager.methods.completeChecklists = async function () {
    let panels = await this.waitForElementVisible('body > article > .SectionPanel', 1000)
    //let checklists = await PACORTestManager.waitForElementVisible('body > article > .SectionPanel .SectionChecklist', 1000)

    if (panels.length !== 2) {
      throw new Error('.SectionPanel .SectionChecklist not found')
    }

    //PACORTestManager.log('checklists.length', checklists.length)

    for (let i = 0; i < panels.length; i++) {
      await this.sleep(100)

      let panel = panels.eq(i)
      let checklist = panel.find('.SectionChecklist')
      let items = checklist.find('input[type="checkbox"]')
      if (items.length !== 3) {
        throw new Error('input[type="checkbox"] not found: ' + checklist.html())
      }

      for (let j = 0; j < items.length; j++) {
        await this.sleep(100)

        let item = items.eq(j)
        item[0].scrollIntoView({
          behavior: 'smooth'
        })
        item.focus().click()
      } // for (let j = 0; j < items.length; j++) {

      //item.parents('.item:first').find('label').click()
      let editor = await this.waitForElementVisible('.AnnotationPanel .html-editor-container .note-editable', 1000)
      //$('.html-editor-container .note-editable').html(this.createRandomHtml())
      await this.typeInput(editor, this.createRandomText())
      await this.sleep(500)
      await this.typeInput(editor, this.createRandomText())

      await this.sleep(100)
      await this.waitForElementVisibleClick('.AnnotationPanel .annotation-panel-buttons .ValidationButton:not(.disabled)', 3000)
      await this.sleep(100)

      await this.waitForElementVisibleClick(checklist, '.ui.fluid.button.positive', 3000)


      if (i < panels.length - 1) {
        await this.sleep(1000)

        //let editButton = await PACORTestManager.waitForElementVisible('body > article > .SectionPanel .', 1000)


        let editButton = await this.waitForElementVisible(panel, '.SectionAnnotationList > .ui.fluid.button:last', 10000)
        //PACORTestManager.log('editButton', editButton.text().trim())
        if (editButton.text().indexOf('撰寫小節重點') > -1) {
          throw new Error('Should not be 撰寫小節重點')
        }
      }
    } // for (let i = 0; i < checklists.length; i++) {
  }

}