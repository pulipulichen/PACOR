
let confirm = await this.lib.ConfirmModal.show(this.$t('Are you sure to delete this comment?'))

````html
<template 
  ref="auth"
  v-bind:config="config"
  v-bind:status="status"
  v-bind:lib="lib">
</template>
````