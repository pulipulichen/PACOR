<div class="non-invasive-web-style-framework">
  <auth v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        v-bind:error="error"
        ref="auth"></auth>
  
  <error-handler v-bind:config="config"
                 v-bind:error="error"
                 ref="ErrorHandler"></error-handler>

  
  <template v-if="progress.display === false">
    <loading></loading>
  </template>
  <template v-else>
    <template v-if="status.needLogin === true">
      <login v-bind:config="config"
          v-bind:status="status"
          v-bind:progress="progress"
          v-bind:error="error"
          v-bind:lib="lib"></login>
    </template>
    <template v-else>
      <navigation v-bind:config="config"
          v-bind:status="status"
          v-bind:progress="progress"
          v-bind:error="error"
          v-bind:lib="lib"></navigation>

      <router-view v-bind:config="config"
                   v-bind:status="status"
                   v-bind:progress="progress"
                   v-bind:lib="lib"
                   v-bind:error="error"></router-view>
    </template>
  </template>
</div>