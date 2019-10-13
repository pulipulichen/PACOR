'use strict'

const clientScriptTag = `<script>alert('ok')</script>`

// ---------------

const Drive = use('Drive')
const Helpers = use('Helpers')

const path = require('path')
const StreamZip = require('node-stream-zip')
const { HttpException } = use('@adonisjs/generic-exceptions') 

const readAsStringExtList = [
  'html',
  'htm',
  'js',
  'css',
  'txt',
  'json'
]



class Asset {
  async get ({request, params}) {
    let id = params.id
    let zipPath = request.url().split('/').slice(4).join('/')
    let result = await this._readZipEntry(id, zipPath)
    return result
  }
  
  _readZipEntry (zipName, entryPath) {
    if (typeof(zipName) === 'undefined') {
      throw new HttpException(`No file.`, 404)
    }
    else if (entryPath.startsWith('/')) {
      entryPath = entryPath.slice(1)
    }
    
    if (entryPath === '') {
      entryPath = null
    }
    
    let isStringFile = true
    if (typeof(entryPath) === 'string') {
      entryPath = decodeURI(entryPath)

      if (/^[A-Za-z0-9/.\-_#\?=]*$/.test(entryPath) === false) {
        //throw new HttpException(`Path is allowed only english, number and . - _ # ? = :  ${zipName}.zip/${entryPath}`, 404)
        return ''
      }
    
      let ext = ''
      if (entryPath.lastIndexOf('.') > 0) {
        ext = entryPath.slice(entryPath.lastIndexOf('.') + 1)
      }
      isStringFile = (readAsStringExtList.indexOf(ext) > -1)
    }
    return new Promise ((resolve, reject) => {
      const zip = new StreamZip({
        file: path.resolve(Helpers.appRoot(), `./storage/Material/${zipName}.zip`),
        storeEntries: true,
        //skipEntryNameValidation: false,
      })

      // Handle errors
      zip.on('error', err => { 
        throw new HttpException(`${zipName}.zip/${entryPath} got error: ${err}`, 404)
        return reject(err);
      })

      zip.on('ready', () => {
        
        const data = this._onZipReady(zip, entryPath, isStringFile)
        resolve(data)
          
        zip.close();
      })  // zip.on('ready', () => {
    })
  }
  
  _onZipReady (zip, entryPath, isStringFile) {
    if (typeof(entryPath) !== 'string') {
      for (const entry of Object.values(zip.entries())) {
        //const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
        //console.log(`Entry ${entry.name}: ${desc}`);
        if (entry.isDirectory === false
                && (entry.name.endsWith('.html') || entry.name.endsWith('.htm') )) {
          let data = zip.entryDataSync(entry.name)
          data = data.toString()
          // 在尾端插入程式碼
          data = this._appendClientJS(data)
          return data
        }
      }
    }
    else {
      let data = zip.entryDataSync(entryPath)
      if (isStringFile) {
        data = data.toString()
        
        if (entryPath.endsWith('html') 
                || entryPath.endsWith('htm')) {
          data = this._appendClientJS(data)
        }
      }
      return data
    }
  }
  
  _appendClientJS (html) {
    let pos = -1
    pos = html.lastIndexOf('</body>')
    if (pos === -1) {
      pos = html.lastIndexOf('</BODY>')
    }
    
    if (pos > -1) {
      let head = html.slice(0, pos)
      let foot = html.slice(pos)
      html = head + clientScriptTag + foot
    }
    
    return html
  }
}

module.exports = Asset
