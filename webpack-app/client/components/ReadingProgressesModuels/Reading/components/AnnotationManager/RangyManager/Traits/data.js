import rangy from './../rangy/rangy-webpack.js'
import $ from 'jquery'

export default {
  $: $,
  rangy: rangy,
  //serializedHighlights: null,

  //articleSelector: this.status.readingConfig.articleSelector,
  //sectionSelector: this.status.readingConfig.sectionSelector,
  articleNode: null,
  sectionNodes: null,
  paragraphNodes: null,

  selectionApplier: null,
  selectionHighlighter: null,
  selection: null,
  selectionSaved: null,

  highlighter: null,
  highlightClasses: [],

  hoverHighlighter: null,
  hoverAnnotation: null,
  hoverAnnotationLock: false,

  searchResultApplier: null,
  searchResultTimer: null
}