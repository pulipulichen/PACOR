
````html
<countdown-timer 
  v-bind:config="config"
  v-bind:status="status"
  v-bind:lib="lib"
  v-bind:remainingSec="remainingSec"
  v-on:timeup="timeup">
</countdown-timer>
````