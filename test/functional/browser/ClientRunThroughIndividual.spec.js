/* global __filename */

'use strict'

let webpageConfig = use('./../../test-config/reading-fastLimitTimeCollaborative')
let webpageConfigIndividual = use('./../../test-config/reading-fastLimitTimeIndividual')
//console.log(webpageConfig)

const TypeHelper = use('App/Helpers/TypeHelper')
webpageConfig = TypeHelper.mergeDeep(webpageConfig, webpageConfigIndividual)

let TestOptions = use('./../../browser-test-options.js')
TestOptions.webpageConfig = webpageConfig

// 每次大型功能開發完都要做這個確認
/*
TestOptions = {
  threads: 15,  // 10個錯誤
  mode: 'parallel',
  headless: false,
  displayDevTools: false,
  groupSize: 6,
  webpageConfig,
}
*/

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

//const uri = '/test-lorem-ipsum?r=' + (new Date()).getTime().toString(36)
const uri = '/demo-articles/test-lorem-ipsum-2sections.html?r=' + (new Date()).getTime().toString(36)
//const uri = '/admin'

//const url = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + Env.get('PORT') + uri
const url = Env.get('PROTOCOL') + '//' + Env.get('PUBLIC_HOST') + ':' + 3333 + uri
//const url = Env.get('PROTOCOL') + '//' + Env.get('HOST') + ':' + 3333 + uri
//const url = 'http://blog.pulipuli.info'

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
      // 要先等到PACORTestManager讀取完成
      //console.log({PACORTestManager: typeof(PACORTestManager)})
      
      let waitPACORTestManager = async () => {
        return new Promise ((resolve, reject) => {
          let loop = () => {
            if (!PACORTestManager || typeof(PACORTestManager.login) !== 'function' ) {
              setTimeout(() => {
                loop()
              }, 1000)
            }
            else {
              resolve(true)
            }
          }
          loop()
        })
      }
      
      await waitPACORTestManager()
      
      await PACORTestManager.login()
    })
    
    //throw new Error('測試錯誤')
  },
  'c1. pre image': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.writeQuestionnairePage()
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
      await PACORTestManager.waitForElementVisible('.CompactNavigation .CompactMenu', 60 * 1000)
      
      await PACORTestManager.writeAnnotations()
    })  // await page.assertFn(async function () {
  },
  'd3. 處理檢核單': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.completeChecklists()
    })
  },
  'f1. post recall': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      await PACORTestManager.writeQuestionnairePage()
    })
  },
//  'g1. exit': async function ( { assert, client, browser }, page ) {
//    //console.log('暫時跳過'); return
//    await page.assertFn(async function () {
//      // first 是登出
//      // last 是關閉
//      //await PACORTestManager.waitForElementVisibleClick('.ExitModal .actions .button:last')
//      await PACORTestManager.waitForElementVisible('.ExitModal .actions .button:last')
//    })
//    
//  },
  'g1. FreeReading': async function ( { assert, client, browser }, page ) {
    //console.log('暫時跳過'); return
    await page.assertFn(async function () {
      // first 是登出
      // last 是關閉
      //await PACORTestManager.waitForElementVisibleClick('.ExitModal .actions .button:last')
      await PACORTestManager.sleep(3000)
      
      await PACORTestManager.waitForElementVisible('.step-heading')
      await PACORTestManager.waitForElementClick('.close-button')
      
      await PACORTestManager.sleep(3000)
    })
    
  },
}

TestBrowser(title, url, config, TestOptions)

// Reset database
//trait('DatabaseTransactions')