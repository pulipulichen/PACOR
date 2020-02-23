# Model

讓元件的高度維持最高的className: .content-full-height

````html
  <modal ref="Modal"
         v-bind:config="config"
         v-bind:status="status"
         v-bind:lib="lib"
         v-bind:reset="editingConfig">
      <template v-slot:header>
        <a href="/admin/Database/admin?table=domains" 
           target="_blank"
           class="ui button">
          {{ $t('DATABASE') }}
        </a>
        # {{ editingConfig.id }}
        {{ editingConfig.domain }}
        <template v-if="editingConfig.title !== '' && editingConfig.title !== null">
          ({{ editingConfig.title }})
        </template>
      </template>
      <template v-slot:content>
        <div class="ui field">
          <label>
            {{ $t('Edit Config') }}
            ({{ $t('JSON format.') }}
             <a href="https://github.com/pulipulichen/PACOR/blob/master/help/ConfigExample.md" target="_blank">{{ $t('Example') }}</a>)
          </label>
          <textarea v-model="editingConfig.config"
                    v-on:input="editingConfig.isChanged = true"></textarea>
        </div>
      </template>
      <template v-slot:actions>
        <div class="ui button"
             v-bind:class="{disabled: !(editingConfig.isChanged === true)}"
             v-on:click="editConfigSubmit">{{ $t('OK') }}</div>
      </template>
  </modal>
````

----

````html
<fragment>
  <modal ref="Modal"
         v-bind:config="config"
         v-bind:status="status"
         v-bind:lib="lib"
         v-bind:reset="editingConfig"
         v-bind:contentURL="contentURL">
      <template v-slot:header>
        {{ $t(stepName) }}
      </template>
      <template v-slot:content
                v-if="!contentURL"
                v-html="message">
      </template>
      <template v-slot:actions>
        <div class="ui button"
             v-on:click="submit">{{ $t('OK') }}</div>
      </template>
  </modal>
</fragment>
````