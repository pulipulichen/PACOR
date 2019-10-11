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
  
  <keep-alive>
    <component v-bind:is="view"
        v-bind:config="config"
        v-bind:status="status"
        v-bind:progress="progress"
        v-bind:error="error"
        v-bind:lib="lib"
        v-bind:view="view"></component>
  </keep-alive>
  
  {{ message }}
  
  <div>
    ?origin=URL: <br />
    <a v-bind:href="$route.query.origin" target="origin">
      {{ $route.query.origin }}
    </a>
  </div>
  
  <div class="ui list" v-for="user in users">
      {{ user.id }}: {{ user.username }}
  </div>
</div>