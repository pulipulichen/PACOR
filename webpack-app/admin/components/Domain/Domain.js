import DomainList from './DomainList/DomainList.vue'
import DomainAdd from './DomainAdd/DomainAdd.vue'

let Domain = {
  props: ['lib', 'status', 'config', 'progress', 'error', 'view'],
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      title: this.$t('Domain'),
      domainView: null
    }
  },
  components: {
    //'domain-list': DomainList,
    //'domain-add': DomainAdd,
  },
  computed: {
    /*
    displayTitle: function () {
      if (this.$route.path.startsWith('/domain/list')) {
        return this.$t('Domain Management')
      }
      else if (this.$route.path.startsWith('/domain/add')) {
        return this.$t('Domain Add')
      }
    }
     */
  },
  watch: {
    '$route.params.action': function () {
      switch (this.$route.params.action) {
        case 'list':
          this.domainView = DomainList
          break
        case 'add':
          this.domainView = DomainAdd
          break
      }
    }
  },
  mounted() {
    if (this.status.role === 'domain_admin') {
      this.$router.replace(`/webpage/${this.status.domainID}/list`)
      return
    }
    
    this.domainView = DomainList
  },
  methods: {
  } // methods
}

export default Domain