'use strict'

const Asset = use('App/Models/MaterialAsset')
//const Drive = use('Drive')
const Helpers = use('Helpers')
const fs = require('fs')

const Config = use('Config')
const ItemsInPage = Config.get('view.itemsPerPage')

const Domain = use('App/Models/Domain')

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
    
    let date = asset.created_at
    date = date.slice(0, date.indexOf(' '))
    
    return {
      assetID: asset.id,
      domainID: domain.id,
      date: date
    }
  }
  
  async editUpload({auth, request}) {
    let user = await auth.getUser()
    
    const {assetID} = request.all()
    if (isNaN(assetID) === true) {
      return 0
    }
    
    const assetFile = request.file('asset', {
      types: ['zip', 'x-zip-compressed'],
      size: '10mb'
    })

    if (assetFile === null) {
      return 0
    }

    let asset = await Asset.find(assetID)
    if (asset === null) {
      return 0
    }
    
    let name = `${asset.id}.zip`
    await assetFile.move(Helpers.appRoot() + `/storage/Material`, {
      name: name,
      overwrite: true,
    },)

    if (!assetFile.moved()) {
      return assetFile.error()
    }
    
    return 1
  }
  
  async list ({auth, request}) {
    let user = await auth.getUser()
    
    let {page} = request.all()
    
    if (isNaN(page) === true) {
      page = 1
    }
    else {
      page = parseInt(page, 10)
    }
    
    let offset = (page - 1) * ItemsInPage
    
    let query = Asset
            .query()
            .offset(offset)
            .limit(ItemsInPage)
            .orderBy('filename', 'asc')
    
    if (user.role === 'domain_admin') {
      let domain = await user.domain().fetch()
      query.where('domain_id', domain.id)
    }
    
    let assets = await query.fetch()
    
    // --------------------
    let assetsCount = await Asset.getCount()
    let maxPage = Math.ceil(assetsCount / ItemsInPage)
    
    return {
      maxPage: maxPage,
      assets: assets
    }
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
