<template>
<div>
  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form"  :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"   @submit="handleSearch" :headers="headers">
      <a-row :gutter="3">
        <a-col
          v-for="v,i in headers"
          :key="i"
          :span="7"
          :style="{ display: i < count ? 'block' : 'none' }"
        >
          <a-form-item :label="`${v}`" >
            <a-input
              v-decorator="[
                `${v}`,
                {
                  rules: [
                    {
                      required: false,
                      message: 'Input something!',
                    },
                  ],
                  initialValue: ''
                },
              ]"
              placeholder="placeholder"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">
            查询
          </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            清除
          </a-button>
          <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            收起 <a-icon :type="expand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form>

  </div>
  <div>
    <a-button type="primary" @click="showaddModal" class="addbtn">
      add
    </a-button>
    <a-modal v-model="isadd" title="新增页面" @ok="addRow" class="add-mask">
      <a-form name="add_form" :form="formadd" id="addform">
       <a-form-model-item label="name" >
         <a-input placeholder="input placeholder" 
         v-decorator="[
         'name',
         { rules: [{ required: true, message: 'Please input your name!' }],initvalue:{} },
       ]"
         />
       </a-form-model-item>
       <a-form-model-item label="age">
         <a-input  placeholder="input placeholder" 
         v-decorator="[
         'age',
         { rules: [{ required: true, message: 'Please input your age!' }],initvalue:{} },

       ]"
         />
       </a-form-model-item>
       <a-form-model-item label="address" >
         <a-input  placeholder="input placeholder" 
         v-decorator="[
         'address',
         { rules: [{ required: true, message: 'Please input your address!' }],initvalue:{} },
       ]"
         />
       </a-form-model-item>
      </a-form>
   </a-modal>

  </div>

  <div>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1300,y:1500}" class="tb_list" ref="table"
    :pagination="pagination"
    :row-selection="rowSelection"
    rowKey="id"
    :loading="loading"
    @change="handleTableChange"
  >


  
  <span slot="action" slot-scope="text, record" class="sup">
      <a-button type="link" @click="showModal(record)" >  编辑<a-icon type="edit" theme="twoTone" two-tone-color="#52c41a" />  </a-button>
      <a-popconfirm
      placement="bottomRight"
      title="Are you sure delete it?"
      ok-text="Yes"
      cancel-text="No"
      @confirm="confirm(record)"
      @cancel="cancel"
      >
      <a href="#" >删除 <a-icon type="delete" theme="twoTone"  two-tone-color="#eb2f96" /></a>
      </a-popconfirm> 

  </span>
  </a-table>
  <div >
    <a-modal v-model="visible" title="Basic Modal" @ok="updateRow" class="edit-mask">
       <a-form name="edit_form" :form="formedit" id="editform">
        <a-form-model-item label="name" >
          <a-input placeholder="input placeholder" 
          v-decorator="[
          'name',
          { rules: [{ required: true, message: 'Please input your name!' }],initvalue:{} },
        ]"
          />
        </a-form-model-item>
        <a-form-model-item label="age" >
          <a-input  placeholder="input placeholder" 
          v-decorator="[
          'age',
          { rules: [{ required: true, message: 'Please input your age!' }],initvalue:{} },

        ]"
          />
        </a-form-model-item>
        <a-form-model-item label="address" >
          <a-input  placeholder="input placeholder" 
          v-decorator="[
          'address',
          { rules: [{ required: true, message: 'Please input your address!' }],initvalue:{} },
        ]"
          />
        </a-form-model-item>
       </a-form>
    </a-modal>
  </div>
  </div>


</div>




</template>
      

<script>

import _ from 'lodash';
import FormSearch from '@/components/FormSearch.vue'
import modalbox from '@/components/AddModal.vue'
const columns = [
  { title: 'id', dataIndex: 'id', key: 'id', width: 150},
  { title: 'address', dataIndex: 'address', key: 'address' ,width: 150,ellipsis: true},
  { title: 'age', dataIndex: 'age', key: 'age',width: 150 },
  { title: 'name', dataIndex: 'name', key: 'name',width: 150 , 

  },
  {title: 'operate',key: 'operation',fixed: 'right', width:'auto',scopedSlots: { customRender: 'action' },
  },
];


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  name:'tablelist',
  computed: {
    count() {
      return this.expand ? 4 : 3;
    },
  },
  data() {
    return {
      formscopeattr:{
        name:'',
        age:'',
        address:''
      },
      loading: false,
      formadd:this.$form.createForm(this,{name:'add_form'}),
      formedit: this.$form.createForm(this, { name: 'edit_form' }),
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      expand: false,
      headers:["name","age"],
      visible:false,
      isadd:false,
      data:[],
      queryInfo:{
        page_size:10,
        page:1

      },
      columns,
      rowSelection,
      pagination:{
                defaultPageSize:10,
                defaultCurrent:1,
                total:20,
                showTotal: total => `共 ${total} 条数据`,
       
                showSizeChanger:true,

                pageSizeOptions: [ '10', '20', '30','50'],

                onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize

                }


    };
  },

  created () {
    this.getUserList()

    },

  methods: {

    // showadd modal 新增弹窗
    showaddModal(){
      this.isadd = true;
      this.$nextTick(()=>{
        this.formadd.resetFields()
      })
   

    },
    // addRow
    addRow(){
  
      this.$nextTick(()=>{
      let v=  this.formadd.getFieldsValue()
      console.log("获取新增后数据：\n"+v);
      this.$axios({   url: '/demo-service/api/vue',
                      method: 'post',
                      data:v
                    }).then(res=>{
        if (res.data.success == true ){
          this.$message.success("新增成功")
          this.getUserList()
        }else{
          this.$message.error("add失败")
        }
      }).catch(res=>{
        this.$message.error("add失败")
      })          
      
      this.isadd = false;
    
    });
      


    },

    // getUserList when enter table Page

    getUserList(){
      this.$axios({
        url:  '/demo-service/api/vue',
        method: 'get',
        params: this.queryInfo
      
      }).then(res => {
      
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total =res.data.totals ;
        this.loading = false;
        this.data = res.data.data;
        this.pagination = pagination;
      });

    },

    

    // chage  table page num  or  pagesize 
    handleTableChange(pagination, filters, sorter) {
     
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        page_size: pagination.pageSize,
        page: pagination.current,

      });
    },
    fetch(params = {}) {
      console.log('params:', params);
      this.loading = true;
      this.$axios({
        url:'/demo-service/api/vue',
        method: 'get',
        params: {...params},
   
      }).then(res => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total =res.data.totals ;
        this.loading = false;
        this.data = res.data.data;
        this.pagination = pagination;
      });
    },
  

  
    // query table 
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
       
        this.$axios(
        {
                    url: '/demo-service/api/vue',
                    method: 'get',
                    params: 
                      values
                  ,
                }
      ) .then( (response)=> {
           
            this.data=response.data.data
            this.pagination.total=response.data.totals

            
          }
          

      ).catch(function (error) {
              console.log(error);});
        
       
        
      });
    },
    // reset form search 
    handleReset() {
      this.form.resetFields();
    },
    // expand control 
    toggle() {
      this.expand = !this.expand;
    },

    // excute axios delete call 
    confirm(record) {
      this.$axios(        {
                    url: '/demo-service/api/vue/'+record.id,
                    method: 'delete',
                }).then(res=>{
                    console.log(res.data.success)
                    if(res.data.success === true){
                      this.$message.success('删除成功！')
                      this.getUserList()
                    }else{
                      console.log("进入失败")
                      this.$message.error('删除失败！');
                    }
                }).catch(
                  res=>{ this.$message.error('删除失败！'+record.id);}
                )
     
    },
    //do nothing 
    cancel(e) {
     
    },
    getoneRow(record){
      this.$axios( {url:'/demo-service/api/vue/'+record.id
      ,method:'get'
        }).then(res=>{
          this.markid=record.id
        }).catch(res=>{
          console.log(this.$route);
        })

        
    },
    // edit showmodal 
    showModal(record) {
      this.visible = true;
        this.formscopeattr=record
        // 读取list接口数据赋值给编辑页面
        this.getoneRow(record)
        this.$nextTick(()=>{
        this.formedit.setFieldsValue({name:record.name,age:record.age,address:record.address})
                           });
    

    },
    updateRow() {
      // 读取修改后表单并编辑数据
      this.$nextTick(()=>{
      let v=  this.formedit.getFieldsValue()
      // console.log(this.formscopeattr.id);
      this.$axios({   url: `/demo-service/api/vue/${this.formscopeattr.id}`,
                      method: 'patch',
                      data:v
      }).then(res=>{
        if (res.data.success == true ){
          this.$message.success("修改成功")
          this.getUserList()
        }else{
          this.$message.error("修改失败")
        }
      }).catch(res=>{
        this.$message.error("修改失败")
      })  
                           
    });
        
      
      this.visible = false;
    
    },
  
  },
  components:{'formsearch':FormSearch,modalbox},

};
</script>
<style lang="less" scoped>
.sup{
  margin-left: -13px;
  
}
.addbtn{
margin-top: 5px;
margin-bottom: 15px;
}

</style>
