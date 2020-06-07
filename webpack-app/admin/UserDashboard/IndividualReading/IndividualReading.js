import StepUsersCount from './../components/StepUsersCount/StepUsersCount.vue'
import StepUsersRatesCount from './../components/StepUsersRatesCount/StepUsersRatesCount.vue'

let StepModule = {
  data() {    
    this.$i18n.locale = this.config.locale
    return {
      stepName: 'IndividualReading'
    }
  },
  components: {
    StepUsersCount: StepUsersCount,
    StepUsersRatesCount: StepUsersRatesCount,
  },
  computed: {}, // 轉移到computedStepModule
  // mounted() {},  // 轉移到mountedStepModule
  methods: {} // 轉移到methodsStepModule
}

import propStepModule from './../components/propStepModule.js'
propStepModule(StepModule)

import computedStepModule from './../components/computedStepModule.js'
computedStepModule(StepModule)

import mountedStepModule from './../components/mountedStepModule.js'
mountedStepModule(StepModule)

import methodsStepModule from './../components/methodsStepModule.js'
methodsStepModule(StepModule)
 
export default StepModule