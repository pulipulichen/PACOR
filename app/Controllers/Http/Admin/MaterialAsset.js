'use strict'

const Asset = use('App/Models/MaterialAsset')
const Drive = use('Drive')
const Helpers = use('Helpers')
const fs = require('fs')

class MaterialAsset {
  async upload({auth, request}) {
    await auth.check()
    
    const {filename} = request.all()
    if (typeof(filename) !== 'string' 
            || filename === '') {
      return 0
    }
    
    const assetFile = request.file('asset', {
      types: ['zip', 'x-zip-compressed'],
      size: '10mb'
    })

    if (assetFile === null) {
      return 0
    }

    let asset = new Asset()
    asset.filename = filename
    await asset.save()

    let name = `${asset.id}.zip`
    await assetFile.move(Helpers.appRoot() + `/storage/Material`, {
      name: name,
      overwrite: true,
    },)

    if (!assetFile.moved()) {
      return assetFile.error()
    }
    
    return asset.id
  }
  
  async list ({auth}) {
    await auth.check()
    
    return Asset
            .query()
            .orderBy('filename', 'asc')
            .fetch()
  }
  
  async remove ({auth, request}) {
    await auth.check()
    
    const { assetID } = request.all()
    
    if (isNaN(assetID) === true) {
      return 0
    }
    
    let asset = await Asset.find(assetID)
    let assetPath = Helpers.appRoot() + `/storage/Material/${asset.id}.zip`
    if (fs.existsSync(assetPath)) {
      fs.unlinkSync(assetPath)
    }
    await asset.delete()
    
    return 1
  }
  
  async edit ({auth, request}) {
    await auth.check()
    
    const { assetID, filename } = request.all()
    
    //console.log(assetID, filename)
    if (isNaN(assetID) === true 
            || typeof(filename) !== 'string'
            || filename === '') {
      return 0
    }
    
    let asset = await Asset.find(assetID)
    asset.filename = filename
    await asset.save()
    
    return 1
  }
}

module.exports = MaterialAsset
