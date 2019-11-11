
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

# Events

可能有的事件有幾個
- cancel: 什麼都不處理，直接關閉
- delete: 刪除了一些東西
- add: 增加了一些東西
- update: 更新了一些東西

一次查詢應該只能設定一組事件