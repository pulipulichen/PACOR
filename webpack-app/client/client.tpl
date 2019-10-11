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
  
  <router-view v-bind:config="config"
               v-bind:status="status"
               v-bind:progress="progress"
               v-bind:lib="lib"
               v-bind:error="error"></router-view>
  
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
  
  <keep-alive>
    <component v-bind:is="view"
        v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        v-bind:error="error"
        v-bind:view="view"></component>
  </keep-alive>
</div>