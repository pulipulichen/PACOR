let StepUserCount = {
  props: ['lib', 'status', 'config', 'item'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
//  components: {
//  },
  computed: {
    isShow () {
      //let count = 0
      for (let anchor in this.item.value) {
        if (Object.keys(this.item.value[anchor]).length > 0) {
          return true
        }
      }
      return false
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default StepUserCount