'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const dayjs = use('dayjs')
const SpreadsheetHelper = use('App/Helpers/SpreadsheetHelper')

class WebpageExport {
  
  async allData ({request, response, auth}) {
    let { webpageID, ideaUnits } = request.all()
    
    let webpage = await WebpageModel.find(webpageID)
    
    let data = {
      /*
      // We will make a Workbook contains 2 Worksheets
      'animals': [
                  {"name": "cat", "category": "animal"}
                  ,{"name": "dog", "category": "animal"}
                  ,{"name": "pig", "category": "animal"}
                ],
      'pokemons': [
                  {"name": "pikachu", "category": "pokemon"}
                  ,{"name": "Arbok", "category": "pokemon"}
                  ,{"name": "Eevee", "category": "pokemon"}
                ]
       */
    }
    
    data.Questionnaire = await webpage.exportQuestionnaire()
    data.SectionNote = await webpage.exportSectionNote()
    data.Annotation = await webpage.exportAnnotation()
    data.Comment = await webpage.exportComment()
    data.Rate = await webpage.exportRate()
    //console.log(data.Annotation)
    
    let filename = `webpage_` + webpageID + `_all_${dayjs().format('YYYYMMDD-HHmm')}.ods`
    return SpreadsheetHelper.download(data, filename, response)
  }
}

module.exports = WebpageExport
