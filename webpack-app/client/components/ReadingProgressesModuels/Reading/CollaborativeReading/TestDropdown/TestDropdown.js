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
    $('#dropdown')
      .dropdown({
        // you can use any ui transition
        transition: 'drop'
      })
    ;
  },
  methods: {
  } // methods
}

export default Template