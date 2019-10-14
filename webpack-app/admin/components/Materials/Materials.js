let Materials = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      filename: '',
      file: null,
      assets: [],
      changedIDs: [],
      editUploadAssetID: null,
      pageConfig: {
        page: 1,
        maxPage: 1
      },
    }
  },
  computed: {
    enableUpload: function () {
      return (this.filename !== '' 
              && this.file !== null)
    },
  },
  watch: {
  },
  mounted() {
    this.initPage()
    
    this.status.title = this.$t('Material Assets Management')
    this.list()
  },
  methods: {
    initPage: function () {
      if (isNaN(this.$route.params.page) === true) {
        let lastPage = localStorage.getItem('Materials.page')
        if (isNaN(lastPage) === false) {
          this.pageConfig.page = lastPage
        }
        else {
          this.pageConfig.page = 1
        }
        this.$router.push(`/materials/${this.pageConfig.page}`)
        //localStorage.setItem('Materials.page', this.page)
      }
      else {
        this.pageConfig.page = parseInt(this.$route.params.page, 10)
      }
    },
    
    list: async function () {
      let result = await this.lib.AxiosHelper.get('/Admin/MaterialAsset/list')
      if (Array.isArray(result)) {
        this.assets = result
      }
    },
    checkEnableUpload: function () {
      this.file = this.$refs.FileInput.files[0]
    },
    reset: function () {
      this.filename = ''
      this.file = null
      this.$refs.FileInput.value = ''
    },
    upload: async function () {
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/upload', {
        asset: this.file,
        filename: this.filename
      })
      //console.log(result)
      this.assets.unshift({
        id: result,
        filename: this.filename
      })
      this._sortAssets()
      this.reset()
    },
    _sortAssets: function () {
      this.assets = this.assets.sort(function (a, b) {
        return a.filename > b.filename ? 1 : -1
      })
    },
    change: function (assetID) {
      for (let i = 0; i < this.assets.length; i++) {
        let asset = this.assets[i]
        if (asset.id === assetID && asset.filename === '') {
          return false
        }
      }
      
      if (this.changedIDs.indexOf(assetID) === -1) {
        this.changedIDs.push(assetID)
      }
    },
    isAssetChanged: function (assetID) {
      for (let i = 0; i < this.assets.length; i++) {
        let asset = this.assets[i]
        if (asset.id === assetID && asset.filename === '') {
          return false
        }
      }
      
      return (this.changedIDs.indexOf(assetID) > -1)
    },
    edit: async function (assetIndex) {
      let asset = this.assets[assetIndex]
      
      if (asset.filename === '') {
        return false
      }
      
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/edit', {
        assetID: asset.id,
        filename: asset.filename
      })
      
      if (result === 0 || result === null) {
        return false
      }
      
      this.changedIDs = this.changedIDs.filter((id) => {
        return id !== asset.id
      })
      this._sortAssets()
    },
    remove: async function (assetIndex) {
      let asset = this.assets[assetIndex]
      
      if (asset.filename === '') {
        return false
      }
      
      let confirmMessage = this.$t('Are you sure to remove {0}?', [asset.filename])
      if (window.confirm(confirmMessage) === false) {
        return false
      }
      
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/remove', {
        assetID: asset.id
      })
      
      if (result === 0 || result === null) {
        return false
      }
      
      this.changedIDs = this.changedIDs.filter((id) => {
        return id !== asset.id
      })
      this.assets.splice(assetIndex, 1)
    },
    editUploadTrigger: function (assetID) {
      this.editUploadAssetID = assetID
      this.$refs.EditUploadInput.click()
    },
    editUpload: async function () {
      let result = await this.lib.AxiosHelper.upload('/Admin/MaterialAsset/editUpload', {
        assetID: this.editUploadAssetID,
        asset: this.$refs.EditUploadInput.files[0]
      })
      
      if (result === 1) {
        window.alert(this.$t('File uploaded.'))
      }
      
      this.editUploadAssetID = null
      this.$refs.EditUploadInput.value = ''
    }
  } // methods
}

export default Materials