let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  watch: {},  // watchAuth.js
  computed: {}, // computedAuth.js
  methods: {} // methodsAuth.js
}

import watch from './watchAuth.js'
watch(Auth)

import methodsAuth from './methodsAuth.js'
methodsAuth(Auth)

//import mountedAuth from './mountedAuth.js'
//mountedAuth(Auth)

import computedAuth from './computedAuth.js'
computedAuth(Auth)

import computedArticleAuth from './computedArticleAuth.js'
computedArticleAuth(Auth)

export default Auth