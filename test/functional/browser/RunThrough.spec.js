/* global __filename */

'use strict'
/**
 * https://www.chaijs.com/api/assert/
 * https://adonisjs.com/docs/4.1/browser-tests
 * @type type
 */

let title = __filename

const TestBrowser = use('TestBrowser')

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')

const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')
const PACORTestHelper = use('PACORTestHelper')
const RandomTextHelper = use('App/Helpers/RandomTextHelper')

//const url = 'http://blog.pulipuli.info/'
//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const url = '/test-lorem-ipsum'

let webpage
let user
let userID
let annotation
let annotationID

let page

let config = {
  '0. RandomTextHelper': async function ( { assert, client, browser } ) {
    let text = RandomTextHelper()
    //console.log(text)
    assert.isString(text)
  },
  'a1. open web page browser': async function ( { assert, client, browser } ) {
    page = await browser.visit(url)
    //console.log(page)
    await page.assertTitle('test-lorem-ipsum')
    //user = 1
  },
  'b1. login': async function ( { assert, client, browser } ) {
    //console.log(user)
    await page.waitForElement('#loginUsername')
            .type('#loginUsername', '布丁' + (new Date()).getTime())
            .waitForElement('div.ui.button.login-submit:not(.disabled)')
            .click('div.ui.button.login-submit:not(.disabled)')
  },
  'c1. pre image': async function ( { assert, client, browser } ) {
    await page.waitForElement('textarea.answer')
            .type('textarea.answer', 'asas as as as a sqww')
            .waitForElement('.ui.button.questionnaire-submit:not(.disabled)')
            .click('.ui.button.questionnaire-submit:not(.disabled)')
    
    //let count = await page.getText('div.at-custom-sidebar-count')
    //assert.isNumber(parseInt(count, 10))
    
    //assert.equal(PACORTestManager.status.username.startsWith('布丁'), true)
  },
  
  'c2. 中場確認 is PACORTestManager work?': async function ( { assert, client, browser } ) {
    //Sleep(3)
//    
//    //console.log('準備測試')
//    
//    await page.waitFor(async function () {
//      //console.log(window.PACORTestManager.status.username)
//      //PACORTestManager = window.PACORTestManager
//      //return window.PACORTestManager.status.username.startsWith('布丁')
//      PACORTestManager = window.PACORTestManager
//      return true
//    })
//    //user = 1
//    
//    //assert.equal(result, true)
//    
//    console.log(PACORTestManager)
    //assert.isObject(PACORTestManager)
    
    const dimensions = await page.page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });
    
    assert.isNumber(dimensions.width)
    
//    PACORTestManager = await page.page.evaluate(() => {
//      return window.PACORTestManager
//    });
    
    let result = await page.page.evaluate(async function () {
      //console.log(window.PACORTestManager)
      //PACORTestManager = window.PACORTestManager
      return window.PACORTestManager.status.username
    })
    
    console.log(result)
    assert.isString(result)
    assert.isTrue(result.startsWith('布丁'))
    
    // -----------------
    
//    let username = await PACORTestHelper(page, (PACORTestManager) => {
//      return PACORTestManager.status.username
//    })
//    //assert.isObject(result.PACORTestManager.status)
//    
//    console.log(username)
//    assert.isString(username)
//    assert.isTrue(username.startsWith('布丁'))

//    let result2 = await page.page.evaluateHandle(async function () {
//      //console.log(window.PACORTestManager)
//      //PACORTestManager = window.PACORTestManager
//      return window.PACORTestManager
//    })
//    
//    console.log(result2)

    console.log('開始準備sleep')
    let result2 = await page.page.evaluate(async function () {
      
      await window.PACORTestManager.lib.VueHelper.sleep(100)
      
      //console.log(window.PACORTestManager)
      //PACORTestManager = window.PACORTestManager
      return window.PACORTestManager.status.username
    })
    
    console.log(result2)
    assert.isString(result2)
    assert.isTrue(result2.startsWith('布丁'))
  },
  'd1. 專注閱讀: 確認視窗': async function ( { assert, client, browser } ) {
    await page.waitForElement('.ui.modal.InstructionMessage')
    await page.assertFn(async function () {
      $('.ui.modal.InstructionMessage .actions > .button:last').click()
      return true
    }, true)
  },
  'd2. 處理檢核單': async function ( { assert, client, browser } ) {
    await page.waitForElement('.SectionChecklist')
    await page.assertFn(async function () {
      let checklists = $('.SectionPanel .SectionChecklist')
      
      for (let i = 0; i < checklists.length; i++) {
        await PACORTestManager.lib.VueHelper.sleep(3000)
        
        let items = checklists.eq(i).find('.item input[type="checkbox"]')
        
        for (let j = 0; j < items.length; j++) {
          await PACORTestManager.lib.VueHelper.sleep(1000)
          
          items.eq(j).click()
          
          if (j === items.length -1) {
            
          }
        }
      }
    })
    
    
  },
  'z999. 結束前等一下吧': async function ( { assert, client, browser } ) {
    await page.assertFn(async function () {
      await PACORTestManager.lib.VueHelper.sleep(3000)
    })
  },
//  'd1. 專注閱讀: 確認視窗': async function ( { assert, client, browser } ) {
//  },
}

TestBrowser(title, config)

// Reset database
//trait('DatabaseTransactions')