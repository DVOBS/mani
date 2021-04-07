<template>
  <!-- <Test :name1="123" :name2="456"></Test> -->
  <ApplicationEditor id="app">
  </ApplicationEditor>
  <!-- <button @click="handleBtnClick">测试</button> -->
  <!-- <button @click="handleBtnClick2">解压</button> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ApplicationEditor } from '@/index'
import { saveAs } from 'file-saver'
import localforage from 'localforage'
import Jszip from 'jszip'
import Test from './Test.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log(Test as any)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.log((Test as any).options)
console.log(new Test())

@Component({
  components: {ApplicationEditor, Test },
})
export default class App extends Vue {
  handleBtnClick () {
    const zip = new Jszip()
    zip.file('Hello.txt', 'Hello World\n')
    zip.generateAsync({type:"blob"}).then(function(content) {
        // see FileSaver.js
        localforage.setItem('example.zip', content)
        saveAs(content, "example.zip");
    })
  }

  async handleBtnClick2 () {
    const zip = new Jszip()
    const blob = await localforage.getItem('example.zip')
    const file = new File([blob as Blob], 'example.zip')
    const res = await zip.loadAsync(file)
    console.log(res)
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  // background-image: url('./参考.jpg');
}

body {
  margin: 0;
  font-family: Microsoft YaHei, Avenir, Helvetica, Arial, sans-serif;
}
</style>
