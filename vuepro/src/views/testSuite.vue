<template>
    <div>
      <div style="margin-bottom: 16px">
        <a-button type="primary" @click="addSuite"><a-icon type="plus" />New Suite</a-button>
        <a-button type="danger" :disabled="!hasSelected" :loading="loading" @click="start" class="excute-btn"><a-icon type="play-circle"  />执行 </a-button>
        <a-button type="danger"  @click="batchDelete" class="btn-groups">批量删除</a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>
        </span>
      </div>
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :data-source="data"
        rowKey="id"
        :pagination="false"
      >
      <span slot="status" slot-scope="text, record,index">
        <a-tag
          v-if="text"
          :key="index" 
          :color="text == '2' ? 'green' : text == '0' ? 'blue' : text == '1' ? 'red' : text=='3' ?'orange':'' "
        >
          {{ status_obj[text] }}
        </a-tag>
      </span>
      <div slot="case_id" slot-scope="text, record,index">

          <div v-for="(item,index) in JSON.parse(record.case_id)"> 
            <a-tag class="case-text1"> 用例ID: {{item.id}} </a-tag>
            <a-tag class="case-text1">用例名称: {{item.name}} </a-tag>
          </div>

      </div>

      <template slot="operation" slot-scope="text, record,index">
      
        <a-icon type="edit" theme="twoTone"  two-tone-color="#2E64FE" @click="editChange(index,record)"></a-icon>
        
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="data.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record)"
        >
        <a-icon type="delete" theme="twoTone"  two-tone-color="#eb2f96"/>
        </a-popconfirm>
      </template>
      </a-table>
      <div>
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
      </div>

    </div>
  </template>


  <script>
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'SuiteName',
      dataIndex: 'suiteName',
    },
    {
      title: 'case_ids',
      dataIndex: 'case_id',
      scopedSlots: { customRender: 'case_id' },
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      scopedSlots: { customRender: 'status' },
    },
    {
    title: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
  ];

  
  export default {
    data() {
      return {

        status_obj:{
          '0':"全部未执行",
          '1':"全部失败",
          '2':'全部成功',
          '3':'部分失败'
        },
        page_param:{
        page_size: 10,
        page: 1,
      },
      total:100,
        data:[],
        columns,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      };
    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
    created () {
        this.getSuiteList()
    },
    methods: {

    //  getSuitelist
      getSuiteList(){
        this.$axios({
      url:"demo-service/api/testsuite",
      method:"get",
      params:{...this.page_param}
    }
    ).then(res=>{
        let newData=[]
        let items = res.data.data
        for( let item of items){
          
          newData.push({
          id:item.id,
          suiteName:item.suite_name,
          case_id: JSON.stringify(item.case_id),
          status:item.status
        })
        }
        this.data=newData
        this.total=res.data.totals
  
    }).catch(err=>{
     console.log(err)
    })


      },
      start() {
        this.loading = true;
        // ajax request after empty completing
        this.$axios({
          url:"demo-service/api/runsuite",
          method:"post",
          data:{suite_ids:this.selectedRowKeys}
        }).then(res=>{
          if (res.data.code ==200 && res.data.success == true ){
            this.$message.success(res.data.msg)

          }else{
            this.$message.error(res.data.msg)

          }
         
        }).catch(err=>{
          console.log(err)
        })
        setTimeout(() => {
          this.loading = false;
          this.selectedRowKeys = [];
        }, 1000);
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },

      editChange(){

      },
      onDelete(record){
        this.$axios({
          url:`demo-service/api/testsuite/${record.id}`,
          method:"delete"
        }).then(res=>{
          if (res.data.code ==200 && res.data.success == true ){
        
            this.$message.success("删除ok")
            this.getSuiteList()
            

          }else{
            this.$message.error(res.data.msg)

          }
         
        }).catch(err=>{
          console.log(err)
        })

      },
      addSuite(){
          this.$router.push({name:"drag"})

      },
      // 批量删除
      batchDelete(){
        let suite_ids=  this.selectedRowKeys.join(',')
        this.$axios({
          url:`demo-service/api/testsuite/batch`,
          method:"delete",
          params:{"suite_ids":suite_ids}
        }).then(res=>{
          if (res.data.code ==200 && res.data.success == true ){
        
            this.$message.success(res.data.msg)
            this.getSuiteList()
            

          }else{
            this.$message.error(res.data.msg)

          }
         
        }).catch(err=>{
          console.log(err)
        })

      },

      onShowSizeChange(current, pageSize){
        console.log(current, pageSize);
        this.page_param.page_size=pageSize
        this.page_param.page=current
        this.getSuiteList()
      },
      onCurrentChange(page){
        this.page_param.page = page;
        this.getSuiteList()
      }
    },
  };
  </script>


<style>

    .excute-btn{
        margin-left: 10px;
        /* font-size: 16px; */
    }
    .excute-btn:hover{
       
        color: white;
    }
    .pagination-item{
    float: right;
    margin-top: 10px;
  }
  .case-text1{
 
    margin-left: 6px;
    margin-top: 6px;
  }
  .btn-groups{
  margin-left: 10px;
  }
</style>
  