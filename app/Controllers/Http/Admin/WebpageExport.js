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
    }
    
    var animalWS = XLSX.utils.json_to_sheet(data.animals) 
    var pokemonWS = XLSX.utils.json_to_sheet(data.pokemons) 

    // A workbook is the name given to an Excel file
    var wb = XLSX.utils.book_new() // make Workbook of Excel

    // add Worksheet to Workbook
    // Workbook contains one or more worksheets
    XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet
    XLSX.utils.book_append_sheet(wb, pokemonWS, 'pokemons')   

    // export Excel file
    //XLSX.writeFile(wb, './book.xlsx') // name of the file is 'book.xlsx'
    
    var wbbuf = XLSX.write(wb, {
      type: 'base64'
    });
    //response.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
    let filename = `webpage-` + webpageID + `-all.ods`
    
    response.header('Content-Disposition', `attachment; filename="${filename}"`)
    response.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    //response.end( new Buffer(wbbuf, 'base64') );
    
    //return webpageID
    return new Buffer(wbbuf, 'base64')
  }
  
}

module.exports = WebpageExport
