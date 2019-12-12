import WebpageConfigEditor from './../../../../../../components/admin/WebpageConfigEditor/WebpageConfigEditor.vue'
import WebpageGroupEditor from './../../../../../../components/admin/WebpageGroupEditor/WebpageGroupEditor.vue'

let WebpageAdminModal = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    
    let contentURL = this.config.baseURL + '/admin#/referer/?url=' + location.href
    //console.log(contentURL)
    return {
      contentURL,
      webpage: null
    }
  },
  components: {
    'webpage-config-editor': WebpageConfigEditor,
    'webpage-group-editor': WebpageGroupEditor
  },
//  computed: {
//  },
//  watch: {
//  },
//  mounted() {
//    this.initWebpageDashboard()
//  },
  methods: {
    show () {
      this.initWebpageDashboard()
      this.$refs.Modal.show()
    },
    initWebpageDashboard: async function () {
      if (this.webpage) {
        return null
      }
      //console.log('initWebpageDashboard')
      let query = {
        'referer': location.href
      }
      
      let result = await this.lib.AxiosHelper.post('/Admin/WebpageDashboard/info', query)
      
      //console.log(result)
      this.webpage = result.webpage
    },
    reload: async function () {
      //console.log(this.$t('You need reload to active the change. Do you want to reload now?'))
      let confirm = await this.lib.ConfirmModal.show(this.$t('You need reload to active the change. Do you want to reload now?'))
      if (confirm === true) {
        location.reload()
      }
    }
  } // methods
}

export default WebpageAdminModal