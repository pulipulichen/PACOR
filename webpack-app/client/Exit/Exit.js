import './jquery.fireworks/jquery.fireworks.mute.js'
import $ from 'jquery'

let Exit = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
//  computed: {
//  },
//  watch: {
//  },
  mounted() {
    this.$refs.ExitModal.show()
    this.startFirework()
  },
  methods: {
    logout: async function () {
      
      this.$refs.ExitModal.hide()
      this.lib.auth.logout()
    },
    exit: async function () {
      await this.lib.AxiosHelper.get('/client/auth/logout')
      window.close()
    },
    startFirework: async function () {
      //await this.lib.VueHelper.sleep(1000)
      //console.log('startFirework')
      //$('.non-invasive-web-style-framework .ui.dimmer .niwsf-overlay:first').fireworks({ 
      $(this.$refs.FireworkOverlay).fireworks({ 
        //sound: true, 
        opacity: 0.9, 
        //width: '100%', 
        //height: '300px'
      });
    } 
  } // methods
}

export default Exit