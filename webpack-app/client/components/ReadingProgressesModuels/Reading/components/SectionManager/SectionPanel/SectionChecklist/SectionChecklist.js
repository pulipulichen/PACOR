let SectionChecklist = {
  props: ['lib', 'status', 'config'
    , 'sectionSeqID', 'sectionsData'],
  //data:
  
//  components: {
//  },
  computed: {
    
//    isChecklistAnnotationSubmitted () {
//      return (typeof(this.annotation.id) === 'number')
//    }
  },
//  watch: {
//    /*
//    checklistAnnotationIndex (checklistAnnotationIndex) {
//      if (checklistAnnotationIndex !== -1 
//              && this.annotation) {
//        //console.log(this.checked, typeof(this.checked))
//        this.checked.splice(checklistAnnotationIndex, 1, (typeof(this.annotation.id) === 'number'))
//      } 
//    }
//    */
//  },
  mounted() {
    //this.initData()
    this.checkIsChecklistCompleted()
  },
  methods: {
  } // methods
}

import data from './dataSectionChecklist'
data(SectionChecklist)

import computed from './computedSectionChecklist'
computed(SectionChecklist)

import methods from './methodsSectionChecklist'
methods(SectionChecklist)

export default SectionChecklist