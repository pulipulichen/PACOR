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

//const url = 'http://blog.pulipuli.info/'
const url = 'http://localhost/projects-nodejs/PACOR/website-cors/public/index.html'

let webpage
let user
let userID
let annotation
let annotationID

let page

let config = {
  'a. test browser': async function ( { assert, client, browser } ) {
    page = await browser.visit('http://blog.pulipuli.info/')
    //console.log(page)
    await page.assertHas('布丁布丁吃什麼？')
    //user = 1
  },
  'b. go to about page': async function ( { assert, client, browser } ) {
    //console.log(user)
    await page.waitForElement('a.about')
            .click('a.about')
            .waitForNavigation()
            .assertPath('/p/about_38.html')
            .assertHas('關於布丁')
  },
  'c. sidebar': async function ( { assert, client, browser } ) {
    await page.waitForElement('div.at-custom-sidebar-count')
    
    let count = await page.getText('div.at-custom-sidebar-count')
    assert.isNumber(parseInt(count, 10))
  },
  
}

TestBrowser(title, config)

// Reset database
//trait('DatabaseTransactions')