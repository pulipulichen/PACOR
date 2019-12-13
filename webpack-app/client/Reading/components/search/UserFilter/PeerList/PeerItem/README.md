https://semantic-ui.com/views/item.html

````html
<peer-item 
  v-for="user in users"
  v-bind:key="user.id"

  v-bind:config="config"
  v-bind:status="status"
  v-bind:lib="lib"

  v-bind:filterData="filterData"
  v-bind:user="user"
  v-on:click="onPeerItemClick(user)">
</peer-item>
````