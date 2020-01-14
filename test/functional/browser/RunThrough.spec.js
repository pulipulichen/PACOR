/* global __filename */

'use strict'

let webpageConfig = use('./../../test-config/reading-fastLimitTime')
//console.log(webpageConfig)

const TestOptions = {
  threads: 1,
  //threads: 3, // ok 完全運作正常
  //threads: 5,  // ?個錯誤
  //threads: 10,  // ?個錯誤
  //threads: 15,  // 10個錯誤
  //threads: 20,  // 10個錯誤
  //threads: 30,  // ?個錯誤
  //threads: 40,  // 10個錯誤
  maxShowThreads: 9,
  mode: 'parallel',
  headless: false,
  //headless: false,
  //stopAt: 'c1. pre image',
  //stopAt: 'e2. 隨意寫標註',
  //stopAt: '0a. setup webpage config',
  //stopAt: 'c2. 中場確認 is PACORTestManager work?',
  //stopAt: 'd1. 專注閱讀: 確認視窗',
  //stopAt: 'd2. 隨意寫標註',
  displayDevTools: true,
  //groupSize: 6,
  //webpageConfig,
  //manualReader: true,
  //manualAdmin: true
}

// ------------------------

/**
 * https://www.chaijs.com/api/assert/
 * https://adonisjs.com/docs/4.1/browser-tests
 * @type type
 */

let title = __filename

const TestBrowser = use('TestBrowser')
//const TestConfig = use('TestConfig')

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const UserModel = use('App/Models/User')

const AnnotationModel = use('App/Models/Annotation')

const ReadingActivityLog = use('App/Models/ReadingActivityLog')

const Sleep = use('Sleep')
const RandomTextHelper = use('App/Helpers/RandomTextHelper')

//const url = 'http://blog.pulipuli.info/'
//const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'

const Env = use('Env')

const uri = '/test-lorem-ipsum?r=' + (new Date()).getTime().toString(36)
const url = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT') + uri
//console.log(url)

let webpage
let user
let userID
let annotation
let annotationID

//let page

let config = {
  'b1. login': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    //console.log(user)
    
//    await page.waitForElement('#loginUsername')
//            .clear('#loginUsername')
//            .type('#loginUsername', '布丁' + (new Date()).getTime())
//            .waitForElement('div.ui.button.login-submit:not(.disabled)')
//            .click('div.ui.button.login-submit:not(.disabled)')

    await page.assertFn(async function () {
      await PACORTestManager.login()
    })
    
    //throw new Error('測試錯誤')
  },
  'c1. pre image': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.writeQuestionnaire()
    })
  },
  'd1. 專注閱讀: 確認視窗': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.confirmInstructionMessage()
    })  // await page.assertFn(async function () {
  },
  'd2. 隨意寫標註': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    //let writeAnnotations = Math.random()
    await page.assertFn(async function () {
      await PACORTestManager.waitForElementVisible('[data-pacor-paragraph-seq-id]')
      await PACORTestManager.waitForElementVisible('.CompactNavigation .CompactMenu')
      
      await PACORTestManager.writeAnnotations()
    })  // await page.assertFn(async function () {
  },
  'd3. 處理檢核單': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.completeChecklists()
    })
  },
  'e1. 協助閱讀: 確認視窗': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.confirmInstructionMessage()
    })  // await page.assertFn(async function () {
  },
  'e2. 隨意寫標註': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    //let writeAnnotations = Math.random()
    await page.assertFn(async function () {
      //PACORTestManager.log('呃，怎麽不能運作了...')
      await PACORTestManager.waitForElementVisible('.Navigation.menu', 30 * 1000)
      // Navigation
      await PACORTestManager.sleep(3000)
      await PACORTestManager.writeAnnotations()
      
      //await PACORTestManager.sleep(1000 * 60 * 30)
    })  // await page.assertFn(async function () {
  },
  'e9. 強制進入下一個階段': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    //let writeAnnotations = Math.random()
    await page.assertFn(async function () {
      await PACORTestManager.nextStep()
    })  // await page.assertFn(async function () {
  },
  'f1. post recall': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.writeQuestionnaire()
    })
  },
  'g1. exit': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      // first 是登出
      // last 是關閉
      //await PACORTestManager.waitForElementVisibleClick('.ExitModal .actions .button:last')
      await PACORTestManager.waitForElementVisible('.ExitModal .actions .button:last')
    })
    
  },
}

TestBrowser(title, url, config, TestOptions)

// Reset database
//trait('DatabaseTransactions')