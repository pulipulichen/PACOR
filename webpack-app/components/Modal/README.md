# Model

````html
  <modal ref="ModelEditConfig"
         v-bind:config="config"
         v-bind:status="status"
         v-bind:progress="progress"
         v-bind:error="error"
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