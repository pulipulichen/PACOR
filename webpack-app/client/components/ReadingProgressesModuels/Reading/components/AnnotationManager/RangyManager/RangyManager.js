//import rangy from 'rangy-updated'
import rangy from './rangy/rangy-webpack.js'
import $ from 'jquery'

import AnchorPosition from './AnchorPosition/AnchorPosition.vue'
import Selection from './Selection/Selection.vue'
import Highlight from './Highlight/Highlight.vue'
import Hover from './Hover/Hover.vue'
import Search from './Search/Search.vue'

let RangyManager = {
  props: ['lib', 'status', 'rangyConfig'],
  data() {
    return {
      rangy
    }
  },  // data() {
  computed: {
    isSelecting () {
      return (rangy.getSelection().toString() !== '')
    }
  },  // computed: {
  component: {
    'anchor-position': AnchorPosition,
    selection: Selection,
    hover: Hover,
    highlight: Highlight,
    search: Search,
  },
  watch: {
    
  },  // watch: {
  mounted() {
    //console.log('ok')
    //console.log(rangy)
    //window.rangy = rangy
    
    //this._initHighlighter()
    
    //console.log(rangy)
    
    //document.addEventListener('selectionchange', () => {
    //console.log(document.getSelection());
    //});
    
//    this._initOnSelectEventListener()
//    
//    this._initSearch()
    
    //this.status.search.keyword = '天' // for test
    this.initRangy()
  },  // mounted() {
  methods: {
    initRangy () {
      
    }

    
    
    
    
    
    
    // -----------------------------------------------------------------
    
    
    
    
    
    
    // -----------------------------------------------------------------
    
    
    
    
    // -----------------------------
    
    
    searchInArticle (searchTerm) {
      this.$refs.Search.searchInArticle(searchTerm)
    }
  } // methods
}

export default RangyManager