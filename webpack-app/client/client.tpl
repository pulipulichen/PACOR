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
  
  <!--
  <rangy-manager v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        v-bind:error="error"
        v-bind:view="view"></rangy-manager>
  
  <note-editor-manager v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        v-bind:error="error"
        v-bind:view="view"></note-editor-manager>
  -->
  <template v-if="status.needLogin === true">
    <Login v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        v-bind:error="error"></Login>
  </template>
  <template v-else>
    <component v-bind:is="status.view"
        v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        v-bind:error="error"></component>
  </template>
</div>