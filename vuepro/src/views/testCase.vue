<template>
  <div id="app">
    <div id="map" style="width:100%;height:500px"></div>
    <div>
      <button type="primary" @click="exportXmind">导出</button>
    </div>
  </div>

</template>

<script>
import MindElixir, { E } from "mind-elixir";

export default {
  name: "App",
  data() {
    return {
      ME: null
    };
  },
  mounted() {
    this.ME = new MindElixir({
      el: "#map",
      direction: MindElixir.LEFT,
      data: MindElixir.new("new topic"),
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true // default true
    });
    this.ME.init();
  },
  methods: {
    exportXmind(){
    console.log("xxxxxxxxx")
    let datas =  this.ME.getAllDataString();
    console.log(datas);
  　if ("download" in document.createElement("a")) {
　　　　let eleLink = document.createElement("a");
　　　　eleLink.download = 'test.xmind';
　　　　eleLink.style.display = "none";
　　　　let blob = new Blob([datas])
　　　　eleLink.href = URL.createObjectURL(blob)

　　　　//兼容firefox,元素添加到页面才能触发点击
　　　　document.body.appendChild(eleLink)
　　　　eleLink.click()
　　　　document.body.removeChild(eleLink)
　　}
  }
}
}

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
