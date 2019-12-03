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
const RandomTextHelper = use('App/Helpers/RandomTextHelper')

//const url = 'http://blog.pulipuli.info/'
//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'
const url = '/test-lorem-ipsum'

let webpage
let user
let userID
let annotation
let annotationID

const Env = use('Env')

//let page

let config = {
//  '0. RandomTextHelper': async function ( { assert, client, browser } ) {
//    let text = RandomTextHelper()
//    //console.log(text)
//    assert.isString(text)
//  },
//  'a1. open web page browser': async function ( { assert, client, browser } ) {
//    page = await browser.visit(url)
//    //console.log(page)
//    await page.assertTitle('test-lorem-ipsum')
//    //user = 1
//  },
  '0a. setup webpage config': async function ( { assert, client, browser, page } ) {
    webpage = await WebpageModel.findByURL(url)
    
    let config = use('./../../test-config/reading-fastLimitTime')
    console.log(config)
    assert.isObject(config)
    webpage.config = config
    await webpage.save()
  },
  'b1. login': async function ( { assert, client, browser, page } ) {
    //console.log(user)
    await page.waitForElement('#loginUsername')
            .clear('#loginUsername')
            .type('#loginUsername', '布丁' + (new Date()).getTime())
            .waitForElement('div.ui.button.login-submit:not(.disabled)')
            .click('div.ui.button.login-submit:not(.disabled)')
  },
  'c1. pre image': async function ( { assert, client, browser, page } ) {
    await page.assertFn(async function () {
      await PACORTestManager.writeQuestionnaire()
    })
  },
  
  'c2. 中場確認 is PACORTestManager work?': async function ( { assert, client, browser, page } ) {
    const dimensions = await page.page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });
    
    assert.isNumber(dimensions.width)
    

    let result = await page.page.evaluate(async function () {
      //console.log(window.PACORTestManager)
      //PACORTestManager = window.PACORTestManager
      return window.PACORTestManager.status.username
    })
    
    //console.log(result)
    assert.isString(result)
    assert.isTrue(result.startsWith('布丁'))
    
    //console.log('開始準備sleep')
    let result2 = await page.page.evaluate(async function () {
      
      await window.PACORTestManager.lib.VueHelper.sleep(100)
      
      //console.log(window.PACORTestManager)
      //PACORTestManager = window.PACORTestManager
      return window.PACORTestManager.status.username
    })
    
    //console.log(result2)
    assert.isString(result2)
    assert.isTrue(result2.startsWith('布丁'))
  },
  'd1. 專注閱讀: 確認視窗': async function ( { assert, client, browser, page } ) {
    await page.assertFn(async function () {
      await PACORTestManager.confirmInstructionMessage()
    })  // await page.assertFn(async function () {
  },
  'd2. 隨意寫標註': async function ( { assert, client, browser, page } ) {
    //let writeAnnotations = Math.random()
    await page.assertFn(async function () {
      await PACORTestManager.waitForElementVisible('[data-pacor-paragraph-seq-id]')
    
      await PACORTestManager.writeAnnotations()
    })  // await page.assertFn(async function () {
  },
  'd3. 處理檢核單': async function ( { assert, client, browser, page } ) {
    await page.waitForElement('.SectionChecklist')
    await page.assertFn(async function () {
      await PACORTestManager.completeChecklists()
    })
  },
  'e1. 協助閱讀: 確認視窗': async function ( { assert, client, browser, page } ) {
    await page.assertFn(async function () {
      await PACORTestManager.confirmInstructionMessage()
    })  // await page.assertFn(async function () {
  },
  'e2. 隨意寫標註': async function ( { assert, client, browser, page } ) {
    //let writeAnnotations = Math.random()
    await page.assertFn(async function () {
      //PACORTestManager.log('呃，怎麽不能運作了...')
      await PACORTestManager.waitForElementVisible('.Navigation.menu')
      // Navigation
      await PACORTestManager.sleep(1000)
      await PACORTestManager.writeAnnotations()
    })  // await page.assertFn(async function () {
  },
  'e9. 強制進入下一個階段': async function ( { assert, client, browser, page } ) {
    //let writeAnnotations = Math.random()
    await page.assertFn(async function () {
      await PACORTestManager.nextStep()
    })  // await page.assertFn(async function () {
  },
  'f1. post recall': async function ( { assert, client, browser, page } ) {
    await page.assertFn(async function () {
      await PACORTestManager.writeQuestionnaire()
      
      await PACORTestManager.sleep(3000)
      await PACORTestManager.waitForElementVisibleClick('.ExitModal .actions .button:first')
    })
  },
  'z999. 結束前等一下吧': async function ( { assert, client, browser, page } ) {
    await page.assertFn(async function () {
      await PACORTestManager.lib.VueHelper.sleep(60 * 3 * 1000)
    })
  },
//  'd1. 專注閱讀: 確認視窗': async function ( { assert, client, browser } ) {
//  },
}

TestBrowser(title, url, config)

// Reset database
//trait('DatabaseTransactions')