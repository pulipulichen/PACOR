
````html
<step-progress-bar v-bind:config="config"
        v-bind:lib="lib"
        steps=steps></step-progress-bar>
````

````js
steps = [
  {
    name: "Step 1",
    isCompleted: true,
    timestamp: 1571434457978
  },
  {
    name: "Step 2",
    isCompleted: false,
    timestamp: 1571434555578
  }
]
````