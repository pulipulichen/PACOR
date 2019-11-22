import $ from 'jquery'

let Template = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    setTimeout(() => {
      $(this.$refs.icon)
        .popup({
          //inline     : true,
          hoverable  : true,
          on    : 'click'
      })
    }, 100)
      
  },
  methods: {
  } // methods
}

export default Template