````html
<HTMLEditor ref="editor"
              v-bind:contents="note"
              v-on:input="(v) => {note = v}"
              v-bind:height="computedEditorHeight"></HTMLEditor>
````
