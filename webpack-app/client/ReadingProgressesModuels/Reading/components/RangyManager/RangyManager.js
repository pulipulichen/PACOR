//import rangy from 'rangy-updated'

import dataRangyManager from './dataRangyManager.js'

let RangyManager = {
  props: ['lib', 'status'],
  data() {
    //console.log(this.status)
    //this.$i18n.locale = this.config.locale
    return dataRangyManager
  },  // data() {
  computed: {
  },  // computed: {
  watch: {
  },  // watch: {
  mounted() {
    
    this._initRangy()
    
    //console.log('ok')
    //console.log(rangy)
    //window.rangy = rangy
    //console.log(rangy)
    
    //document.addEventListener('selectionchange', () => {
    //console.log(document.getSelection());
    //});
    this._initAnchorPosition()
    this._initOnSelectEventListener()
    //this._initSearch()
    this._initHighlighter()
    
    //this._initSearch()
    
    //this.status.search.keyword = '天' // for test
  },  // mounted() {
  methods: {
    _initRangy () {
      this.rangy.init()
    }
  } // methods
}

import computedRangyManager from './computedRangyManager.js'
computedRangyManager(RangyManager)

import watchRangyManager from './watchRangyManager.js'
watchRangyManager(RangyManager)

import AnchorPosition from './methodsAnchorPositionRangyManager.js'
AnchorPosition(RangyManager)

import Highlight from './methodsHighlightRangyManager.js'
Highlight(RangyManager)

import Hover from './methodsHoverRangyManager.js'
Hover(RangyManager)

import Search from './methodsSearchRangyManager.js'
Search(RangyManager)

import Selection from './methodsSelectionRangyManager.js'
Selection(RangyManager)

import Event from './methodsEventRangyManager.js'
Event(RangyManager)

import Load from './methodsLoadRangyManager.js'
Load(RangyManager)

import Annotation from './methodsAnnotationRangyManager.js'
Annotation(RangyManager)

import Init from './methodsInitRangyManager.js'
Init(RangyManager)

export default RangyManager