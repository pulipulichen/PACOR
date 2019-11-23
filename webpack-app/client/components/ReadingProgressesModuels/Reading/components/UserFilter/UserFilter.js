let UserSelector = {
  props: ['lib', 'status', 'config'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
    }
  },
  components: {
  },
  computed: {
    peer () {
      return
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  } // methods
}

export default UserSelector