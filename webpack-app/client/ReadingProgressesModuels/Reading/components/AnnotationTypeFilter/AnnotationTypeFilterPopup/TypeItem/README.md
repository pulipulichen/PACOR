
````html
<type-item 
  v-for="typeData in typeDataList"
  v-bind:typeData="typeData"

  v-bind:config="config"
  v-bind:status="status"
  v-bind:lib="lib">
</type-item>
````