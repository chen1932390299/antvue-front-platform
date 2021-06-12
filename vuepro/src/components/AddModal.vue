<template>
    <div class="modal_template" ref="replayModal">
      <a-button type="primary" @click="showModal">
        add
      </a-button>
      <a-modal v-model="visible" title="Basic Modal" @ok="handleOk" width="800px" class="modal-box" 
      name='modal-box'
      :getContainer = '()=>$refs.replayModal'
      >

      <a-form-model :layout="form.layout" :model="form" v-bind="formItemLayout">
   
        <a-form-model-item label="name">
          <a-input v-model="form.name" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="age">
          <a-input v-model="form.age" placeholder="input placeholder" />
        </a-form-model-item>
        <a-form-model-item label="address">
          <a-input v-model="form.address" placeholder="input placeholder" />
        </a-form-model-item>
      </a-form-model>


      </a-modal>
    </div>
  </template>
<script>
 
    export default {
        data() {
          return {
              visible: false,
              form: {
                layout: 'horizontal',
                name: '',
                age: '',
                address:''
                    },
              
                }

        },
        computed: {
        formItemLayout() {
            const { layout } = this.form;
            return layout === 'horizontal'
              ? {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 14 },
                }
              : {};
            }
          },
        methods: {
        showModal() {
            this.visible = true;
        },
        handleOk(e) {
            console.log(e);
            this.visible = false;
        },
        },
        components: {
          
        }
    };
</script>

<style lang="less" scoped>
      .modal_template{
        margin-top: 30px;
        margin-bottom: 20px;
      }
    div /deep/ .ant-modal-body{
            height: 500px;
   
      }

</style>