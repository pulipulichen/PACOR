/* global XLSX, lda, appData, appComputed, appWatch, appMethods, appMounted */

var app = {
  el: '#app',
  data: appData,
  computed: appComputed,
  mounted: appMounted,
  watch: appWatch,
  methods: appMethods
}

app = new Vue(app)