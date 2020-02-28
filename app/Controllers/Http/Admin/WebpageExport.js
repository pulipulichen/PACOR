'use strict'

const DomainModel = use('App/Models/Domain')
const WebpageModel = use('App/Models/Webpage')
const WebpageGroupModel = use('App/Models/WebpageGroup')
const UserModel = use('App/Models/User')

const Config = use('Config')
const Cache = use('Cache')

const { HttpException } = use('@adonisjs/generic-exceptions') 
const dayjs = use('dayjs')
const XLSX = use('xlsx')

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
    
    
    let filename = `webpage_` + webpageID + `_all_${dayjs().format('YYYYMMDD-HHmm')}.ods`
    return this._downloadSpreadsheet(data, filename, response)
  }
  
  _downloadSpreadsheet (data, filename, response) {
    // A workbook is the name given to an Excel file
    var wb = XLSX.utils.book_new() // make Workbook of Excel

    // add Worksheet to Workbook
    // Workbook contains one or more worksheets
    Object.keys(data).forEach(key => {
      let sheet = XLSX.utils.json_to_sheet(data[key])
      XLSX.utils.book_append_sheet(wb, sheet, key) // sheetAName is name of Worksheet
    }) 
    
    // export Excel file
    //XLSX.writeFile(wb, './book.xlsx') // name of the file is 'book.xlsx'
    
    var wbbuf = XLSX.write(wb, {
      type: 'base64'
    });
    //response.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
    
    response.header('Content-Disposition', `attachment; filename="${filename}"`)
    response.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    //response.end( new Buffer(wbbuf, 'base64') );
    
    //return webpageID
    return new Buffer(wbbuf, 'base64')
  }
  
}

module.exports = WebpageExport
