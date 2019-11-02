<div class="non-invasive-web-style-framework">

  <auth v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        ref="auth"></auth>
  
  <error-handler v-bind:config="config"
                 v-bind:lib="lib"
                 v-bind:errors="errors"
                 ref="ErrorHandler"></error-handler>
  
  <component v-bind:is="status.view"
      v-bind:config="config"
      v-bind:status="status"
      v-bind:progress="progress"
      v-bind:lib="lib"></component>
</div>