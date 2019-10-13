'use strict'

const Asset = use('App/Models/MaterialAsset')
const Drive = use('Drive')
const Helpers = use('Helpers')
const fs = require('fs')

class MaterialAsset {
  async upload({auth, request}) {
    let user = await auth.getUser()
    
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
    asset.domain_id = user.domain_id
    
    let domain = await user.domain().fetch()
    await domain.assets().save(asset)

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
    let user = await auth.getUser()
    
    let query = Asset
            .query()
            .orderBy('filename', 'asc')
    
    if (user.role === 'domain_admin') {
      let domain = await user.domain().fetch()
      query.where('domain_id', domain.id)
    }
    return await query.fetch()
  }
  
  async remove ({auth, request}) {
    let user = await auth.getUser()
    
    const { assetID } = request.all()
    
    if (isNaN(assetID) === true) {
      return 0
    }
    
    let asset = await Asset.find(assetID)
    if (asset.isEditable(user) === false) {
      return 0
    }
    
    let assetPath = Helpers.appRoot() + `/storage/Material/${asset.id}.zip`
    if (fs.existsSync(assetPath)) {
      fs.unlinkSync(assetPath)
    }
    await asset.delete()
    
    return 1
  }
  
  async edit ({auth, request}) {
    let user = await auth.getUser()
    
    const { assetID, filename } = request.all()
    
    //console.log(assetID, filename)
    if (isNaN(assetID) === true 
            || typeof(filename) !== 'string'
            || filename === '') {
      return 0
    }
    
    let asset = await Asset.find(assetID)
    if (asset.isEditable(user) === false) {
      return 0
    }
    asset.filename = filename
    await asset.save()
    
    return 1
  }
}

module.exports = MaterialAsset
