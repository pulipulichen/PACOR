
````html
<annotation-editor-modules ref="auth"
        v-bind:config="config"
        v-bind:status="status"
        v-bind:lib="lib"
        v-bind:annotationModule="annotationModule"
        v-bind:pinSelection="pinSelection"
        v-bind:annotationInstance="findAnnotation"
        v-bind:annotationConfig="annotationConfig"
        v-bind:rangy="rangy"
        v-bind:heightPX="heightPX"
        v-on:hide="hide"></annotation-editor-modules>
````