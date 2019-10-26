
直接列出 select heading 的標題

````html
<table-of-contents v-bind:config="config"
                     v-bind:lib="lib"
                     headings="h3, h4"
                     ref='toc'></table-of-contents>
````