let Auth = {
  props: ['lib', 'status', 'config', 'progress', 'error'],
  data() {
    return {}
  },
  watch: {
  },
  computed: {
  },
  methods: {
  } // methods
}

import watch from './watchAuth'
watch(Auth)

import methodsAuth from './methodsAuth'
methodsAuth(Auth)

import mountedAuth from './mountedAuth'
mountedAuth(Auth)

import computedAuth from './computedAuth'
computedAuth(Auth)

export default Auth