'use strict'

const XLSX = use('xlsx')

let SpreadsheetHelper = {
  download: function (data, filename, response) {
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
      bookType: 'ods',
      type: 'base64'
    });
    //response.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
    
    response.header('Content-Disposition', `attachment; filename="${filename}"`)
    response.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    //response.end( new Buffer(wbbuf, 'base64') );
    
    //return webpageID
    return Buffer.from(wbbuf, 'base64')
  },
  parseFileToJSON: function (filePath) {

    let workbook = XLSX.readFile(filePath);
    let sheet_name_list = workbook.SheetNames
    let sheet = workbook.Sheets[sheet_name_list[0]]

    // -------------------------------
    //let keys = parseAttributes(sheet)

    //console.log(sheet['A999'])
    let sheetJSON = XLSX.utils.sheet_to_json(sheet)
    
    // 把類別轉換一下
    sheetJSON = sheetJSON.map(lineJSON => {
      Object.keys(lineJSON).forEach(key => {
        let value = lineJSON[key]
        
        if (isNaN(value) === false) {
          lineJSON[key] = Number(value)
          return true
        }
        
        value = value.toLowerCase()
        if (value === 'false') {
          lineJSON[key] = false
          return true
        }
        else if (value === 'true') {
          lineJSON[key] = true
          return true
        }
        else if (value === 'null') {
          lineJSON[key] = null
          return true
        }
      })
      
      return lineJSON
    })
    
    return sheetJSON
  }
}

module.exports = SpreadsheetHelper