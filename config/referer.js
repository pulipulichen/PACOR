'use strict'

const Config = use('Config')

module.exports = {
  /**
   * 以下列表的檔案會被取代為 "/"
   * @Author Pulipuli 20191007
   */
  directoryIndexMapping: [
    "/index.php",
    "/index.pl",
    "/index.cgi",
    "/index.asp",
    "/index.shtml",
    "/index.html",
    "/index.htm",
    "/default.php",
    "/default.pl",
    "/default.cgi",
    "/default.asp",
    "/default.shtml",
    "/default.html",
    "/default.htm",
    "/home.php",
    "/home.pl",
    "/home.cgi",
    "/home.asp",
    "/home.shtml",
    "/home.html",
    "/home.htm"
  ]
}