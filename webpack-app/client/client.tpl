<div class="non-invasive-web-style-framework">

  <auth 
    v-bind:config="config"
    v-bind:status="status"
    v-bind:lib="lib"
    ref="auth">
  </auth>
  
  <StyleManager 
    v-bind:config="config"
    v-bind:status="status"
    v-bind:lib="lib"
    ref="style">
  </StyleManager>
  
  <PACORTestManager 
    v-bind:config="config"
    v-bind:status="status"
    v-bind:lib="lib"
    ref="TestManager">
  </PACORTestManager>

  <error-handler 
    v-bind:config="config"
    v-bind:lib="lib"
    v-bind:errors="errors"
    ref="ErrorHandler">
  </error-handler>
  
  <confirm-modal
    v-bind:config="config"
    v-bind:lib="lib"
    v-bind:status="status"
    
    ref="ConfirmModal">
  </confirm-modal>

  <!-- ================================ -->
  
  <component 
    v-bind:is="status.view"
    v-bind:config="config"
    v-bind:status="status"
    v-bind:progress="progress"
    v-bind:lib="lib">
  </component>
</div>