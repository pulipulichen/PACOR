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
  }
}

module.exports = SpreadsheetHelper