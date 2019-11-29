let SectionChecklist = {
  props: ['lib', 'status', 'config'
    , 'sectionSeqID', 'sectionsData'],
  computed: {},
  mounted() {
    //this.initData()
    this.checkIsChecklistCompleted()
  },
  methods: {} // methods
}

import data from './dataSectionChecklist'
data(SectionChecklist)

import computed from './computedSectionChecklist'
computed(SectionChecklist)

import methods from './methodsSectionChecklist'
methods(SectionChecklist)

export default SectionChecklist