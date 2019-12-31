````html
<HTMLEditor 
  v-bind:lib="lib"
  v-bind:status="status"
  v-bind:config="config"

  v-bind:contents="note"
  v-bind:editable="true"
  v-on:input="(v) => {note = v}"
  v-bind:height="computedEditorHeight">
</HTMLEditor>
````
