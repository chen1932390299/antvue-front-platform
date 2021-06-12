<template>
  <div>
    <a-radio-group style="margin-right: 8px" :default-value="placement" @change="onChange">
      <a-radio value="top">
        top
      </a-radio>
    </a-radio-group>
    <a-button type="primary" @click="showDrawer">
      Open
    </a-button>
    <a-drawer
      title="Basic Drawer"
      :placement="placement"
      :closable="false"
      :visible="visible"i
      @close="onClose"
      :drawerStyle="{
        height:'400',
        width:'600'
      }"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      placement: 'top',
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(e) {
      this.placement = e.target.value;
    },
  },
};
</script>