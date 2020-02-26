/* global __dirname */

require('dotenv').config()
const {exec} = require("child_process")
const path = require('path')
const dayjs = require('dayjs')

let execCommand = function (command, env) {
  console.log('EXEC:\t' + command)
  return new Promise(function (resolve, reject) {
    exec(command, {env: env}, (error, stdout, stderr) => {
      if (error) {
        //console.log(`error: ${error.message}`);
        reject(error.message)
        return;
      }
      if (stderr) {
        //console.log(`stderr: ${stderr}`);
        reject(stderr)
        return;
      }
      
      console.log(`${stdout}`);
      resolve(stdout)
    });
  })
}

let backup = async function () {
  
  let sqlPath = path.join(__dirname, 'backup', process.env.DB_DATABASE + '_' + dayjs().format('YYYYMMDD-HHmm') + '.sql')
  //console.log(sqlPath)
  
  await execCommand(`"${process.env.PG_DUMP}" -U ${process.env.DB_USER} -f "${sqlPath}" ${process.env.DB_DATABASE}`, {
    PGPASSWORD: process.env.DB_PASSWORD
  })
}

let main = async function () {
  
  await backup()
  
  await execCommand("adonis migration:refresh")
  await execCommand("adonis seed")
}

main()
