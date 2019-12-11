
````html
<digital-countdown-timer 
  v-bind:config="config"
  v-bind:status="status"
  v-bind:lib="lib"

  v-bind:pauseAtStart="true"
  v-bind:remainingSeconds="remainingSec"
  v-on:timeup="timeup">
</digital-countdown-timer>
````