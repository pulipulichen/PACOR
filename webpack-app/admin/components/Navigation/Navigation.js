import Items from './Items/Items.vue'

let Navigation = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      sideMenuDisplay: false
    }
  },
  components: {
    'items': Items
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    showSideMenu: function () {
      this.sideMenuDisplay = true
    },
    hideSideMenu: function () {
      this.sideMenuDisplay = false
    }
    
  } // methods
}

export default Navigation