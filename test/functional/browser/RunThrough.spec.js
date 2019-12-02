/* global __filename */

'use strict'
/**
 * https://www.chaijs.com/api/assert/
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
const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'

let webpage
let user
let userID
let annotation
let annotationID

let page

let config = {
  '0. RandomTextHelper': async function ( { assert, client, browser } ) {
    let text = RandomTextHelper()
    console.log(text)
    assert.isString(text)
  },
  'a. open web page browser': async function ( { assert, client, browser } ) {
    page = await browser.visit('http://localhost/projects-nodejs/PACOR/website-cors/public/index.html')
    //console.log(page)
    await page.assertTitle('Chap APP Test')
    //user = 1
  },
  'b. login': async function ( { assert, client, browser } ) {
    //console.log(user)
    await page.waitForElement('#loginUsername')
            .type('#loginUsername', '布丁' + (new Date()).getTime())
            .waitForElement('div.ui.button.login-submit:not(.disabled)')
            .click('div.ui.button.login-submit:not(.disabled)')
  },
  'c. pre image': async function ( { assert, client, browser } ) {
    await page.waitForElement('textarea.answer')
            .type('textarea.answer', 'asas as as as a sqww')
            .waitForElement('.ui.button.questionnaire-submit:not(.disabled)')
            .click('.ui.button.questionnaire-submit:not(.disabled)')
    
    //let count = await page.getText('div.at-custom-sidebar-count')
    //assert.isNumber(parseInt(count, 10))
  },
  
}

TestBrowser(title, config)

// Reset database
//trait('DatabaseTransactions')