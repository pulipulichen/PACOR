
````html
<annotation-panel v-bind:config="config"
        v-bind:status="status"
        v-bind:lib="lib"
        v-bind:pinSelection="pinSelection"
        v-on:hide="unpin"
        v-bind:rangy="$refs.RangyManager"
        v-bind:annotationModule="annotationModule"
        v-bind:findAnnotation="findAnnotation"
        v-bind:findUser="findUser"
        v-bind:findType="findType"
        v-bind:listPositions="listPositions"
        ref="AnnotationPanel"></annotation-panel>
````