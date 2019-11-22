//import rangy from 'rangy-updated'

import data from './Traits/data.js'

let RangyManager = {
  props: ['lib', 'status'],
  data() {
    //console.log(this.status)
    //this.$i18n.locale = this.config.locale
    return data
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

import computed from './Traits/computed'
computed(RangyManager)

import watch from './Traits/watch'
watch(RangyManager)

import AnchorPosition from './Traits/methods/AnchorPosition'
AnchorPosition(RangyManager)

import Highlight from './Traits/methods/Highlight'
Highlight(RangyManager)

import Hover from './Traits/methods/Hover'
Hover(RangyManager)

import Search from './Traits/methods/Search'
Search(RangyManager)

import Selection from './Traits/methods/Selection'
Selection(RangyManager)

import Event from './Traits/methods/Event'
Event(RangyManager)

import Load from './Traits/methods/Load'
Load(RangyManager)

import Annotation from './Traits/methods/Annotation'
Annotation(RangyManager)

import Init from './Traits/methods/Init'
Init(RangyManager)

export default RangyManager