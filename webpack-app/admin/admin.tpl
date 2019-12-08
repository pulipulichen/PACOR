<div class="non-invasive-web-style-framework">
  <auth v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:lib="lib"
        ref="auth"></auth>

  <template v-if="progress.display === true && status.needLogin === false">
    <navigation-items v-bind:config="config"
                v-bind:status="status"
                v-bind:progress="progress"
                v-bind:lib="lib"></navigation-items>
  </template>

  <error-handler v-bind:config="config"
                 v-bind:lib="lib"
                 v-bind:errors="errors"
                 ref="ErrorHandler"></error-handler>

  <StyleManager 
    v-bind:config="config"
    v-bind:status="status"
    v-bind:lib="lib"
    ref="style">
  </StyleManager>
  
  <!-- ========================================== -->

  <template v-if="progress.display === false">
    <loading></loading>
  </template>
  <template v-else>
    <template v-if="status.needLogin === true">
      <login v-bind:config="config"
             v-bind:status="status"
             v-bind:progress="progress"
             v-bind:lib="lib"></login>
    </template>
    <template v-else>

      <router-view v-bind:config="config"
                   v-bind:status="status"
                   v-bind:progress="progress"
                   v-bind:lib="lib"></router-view>
    </template>
  </template>
  
  
</div>