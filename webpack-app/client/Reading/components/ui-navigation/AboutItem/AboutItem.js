let AboutItem = {
  props: ['lib', 'status', 'config'],
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
//  mounted() {
//  },
  methods: {
    show () {
      console.error('@AboutItem')
    }
  } // methods
}

export default AboutItem