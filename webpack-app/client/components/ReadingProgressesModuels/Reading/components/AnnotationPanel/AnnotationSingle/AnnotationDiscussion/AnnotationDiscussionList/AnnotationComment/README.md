
````html
<annotation-comment 
  v-for="comment in comments"
  v-bind:key="comment.id"

  v-bind:config="config"
  v-bind:status="status"
  v-bind:lib="lib"
  
  v-bind:comment="comment">
</annotation-comment>
````