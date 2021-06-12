<template>

    <a-card  title="全局变量">
      <a-button type="primary" class="add-variable" @click="addVariable">
        <a-icon type="plus" />新增变量
      </a-button>
      <a-button type="danger" @click="batDeleteVariable"  class="delete-variable">批量删除</a-button>
      <a-table :columns="columns" :data-source="data" 
      bordered :pagination="false"
      rowKey="id"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <template
          v-for="col in ['name', 'value']"
          :slot="col"
          slot-scope="text, record, index"
        >
          <div :key="col">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.id, col)"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.id)">Save</a>
              <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.id)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.id)">Edit</a>
            </span>
          </div>
        </template>
      </a-table>
      <a-modal
       v-model="visible"  
      :destroyOnClose="true"
      title="新增变量"
      @ok="handleOk" 
       width="60%">

          <a-form layout="inline"  :form="form" >
            <a-form-item  label="Variable Name">
              <a-input  style="width: 350px;"
              v-decorator="['name', { rules: [{ required: true, message: 'Please input your Variable Name!' }] }]"
          
               />
            </a-form-item>
            <a-form-item   label="Value">
              <a-input 
              style="width: 350px;"
              v-decorator="['variable_value', { rules: [{ required: true, message: 'Please input your Value!' }] }]"
              
               />
            </a-form-item>

          </a-form>

      </a-modal>
      <a-pagination
      show-size-changer
      :current="page_param.page"
      :default-current="1"
      :total="total"
      :show-total="total => `Total ${total} items`"
      @showSizeChange="onShowSizeChange"
      @change="onCurrentChange"
      class="pagination-item"
    />
    </a-card>

</template>
  <script>
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '10%'
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '20%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: 'value',
      dataIndex: 'value',
      width: '20%',
      ellipsis:true,
      scopedSlots: { customRender: 'value' },
    },
    {
      title: 'create_time',
      dataIndex: 'create_time',
    
    },
    {
      title: 'update_time',
      dataIndex: 'update_time',
    
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
      width: '15%'
    },
  ];
  export default {
  
    created () {
      
     this.getVariables();
    }
    ,
    data() {
      return {
        form: this.$form.createForm(this, { name: 'variableCreate' }),
        data:[],
        visible: false,
        selectedRowKeys: [],
        columns,
        editingKey: '',
        // pagination 
        page_param:{
        page_size: 10,
        page: 1,
      },
      total:10
      };
    },
    methods: {
      showModal() {
      this.visible = true;
    },
    handleNameChange(value){
      this.form.setFieldsValue({
        name:value
      });
    },
    handleNameChange(value){
      this.form.setFieldsValue({
        variable_value:value
      });
    },
    // submit 
    handleOk(e){
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$axios({
            method:'post',
            url:"demo-service/api/variables",
            data:values

          }).then(res =>{
            let msg =res.data.msg 
            if (res.data.success == true && res.data.code==200){
              this.$message.success("create success!")
              this.getVariables()
            }else{
              let msg = JSON.parse(JSON.stringify(res.data.msg))
              let err=''
              for (let key in msg){
                err = key +msg[key][0]+'\n'
              }
              this.$message.error(err)
            }
          }).catch(err =>{
            console.log(err)
          })
          this.visible = false;
          
        }else{
          
        }
      });
     
    },
      // variable list 
      getVariables(){
        this.$axios({
          method:'get',
          url:"demo-service/api/variables",
          params:{...this.page_param}
        }
        ).then(res=>{
          let newdata=[]
          let ret =res.data.data
          for (let item of ret ){
            newdata.push({
              id:item.id,
              name:item.name,
              value:item.variable_value,
              create_time:item.create_time,
              update_time:item.update_time
            })
          }
          this.data=newdata
          this.total=res.data.totals
  

        }).catch(err=>{
          console.log(err)
        })

      },
      // add variable
      addVariable(){
          this.visible=true
      },
      batDeleteVariable(){
        this.$axios( 
                {
                    url: `demo-service/api/variables/batch`,
                    method: 'delete',
                    params:{"variable_ids":this.selectedRowKeys.join(',')}
                }).then(res=>{
                  
                    if(res.data.success === true && res.data.code ==200 ){
                      this.$message.success('删除成功！')
                      this.getVariables()
                    }else{
                      this.$message.error(JSON.stringify(res.data.msg));
                    }
                }).catch(err=>{
                  console.log(err)
                })

      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
      handleChange(value, id, column) {
        const newData = [...this.data];
      const target = newData.filter(item => id === item.id)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
      console.log(this.data)

      },
      edit(key) {
        const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
      },
      save(id) {
         
          const newData = [...this.data];
         
          const target = newData.filter(item => id === item.id)[0];
        
          if (target ) {
            delete target.editable;
            // this.data = newData;
          }
          this.editingKey = '';
          this.$axios({
                    method:'patch',
                    url:`demo-service/api/variables/${target.id}`,
            data:{name:target.name,variable_value:target.value}

            }).then(res =>{
              if (res.data.success == true && res.data.code ==200 ){
                this.$message.success("更新成功")
                this.getVariables()
              }else{
                this.$message.error("更新失败")
              }
            }).catch(err=>{
              console.log(err)
            })
      },
      cancel(key) {
        const newData = [...this.data];
      const target = newData.filter(item => key === item.id)[0];
      this.editingKey = '';
      if (target) {
        delete target.editable;
        this.data = newData;
      }
      },
      // page 
      onShowSizeChange(current, pageSize){
        this.page_param.page_size=pageSize
        this.page_param.page=current
        this.getVariables();
      },
      onCurrentChange(page){
        this.page_param.page = page;
        this.getVariables();
      }
    
    },
  };
  </script>
  <style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  .pagination-item{
    margin-top: 20px;
    float: right;
  }
  .add-variable{
    margin-bottom: 10px;
  }
  .delete-variable{
    margin-left: 12px;
  }
  .text-value{
    cols:27 
  }


  </style>