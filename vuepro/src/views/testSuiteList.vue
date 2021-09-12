<!DOCTYPE html>
<template>

<a-tabs :default-active-key="suiteKey" @change="clicktask">
  <a-tab-pane tab="测试套件" key="1">
    <div style="margin-top: 10px;">
      <div style="margin-bottom: 16px">
        <a-button type="primary" @click="addSuite"><a-icon type="plus" />New Suite</a-button>
        <a-button type="danger" :disabled="!hasSelected" :loading="loading" @click="start" class="excute-btn"><a-icon type="play-circle"  />执行 </a-button>
        <a-button type="danger"  @click="batchDelete" class="btn-groups">批量删除</a-button>
        <a-button type="primary" @click="newTask"  class="btn-groups">New Task</a-button>
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
        class="suite-list"
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
      <div tyle="link" slot="suiteName" slot-scope="text, record,index">
      
        <div  type="link"  @click="showDeatil(record)"  class="text-wrapper">{{text}}</div>
      
      </div>
      <div slot="cases" slot-scope="text, record,index">
     

          <div v-for="(item,index) in JSON.parse(record.cases)" 
          class="overflowStyle"
          > 
            <span  :title="`用例名称:${item.name}`">用例名称: {{item.name}} </span>
            
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
  </a-tab-pane>
  <a-tab-pane key="2" tab="任务列表">
        <div style="margin-top: 20px;">
          <a-table :columns="columns_task" 
          :data-source="data_task"
          rowKey="taskid"
          >
          <div tyle="link" slot="taskid" slot-scope="text, record,index">
      
            <div  type="link"  @click="showTaskDetail(record)"  class="text-wrapper">{{text}}</div>
          
          </div>
          <div  slot="suites" slot-scope="text, record,index">
      
            <div v-for="(item,index) in JSON.parse(record.suites)" 
            class="overflowStyle"
           > 
              <span  :title="`套件名称:${item.suite_name}`">套件名称: {{item.suite_name}} </span>
              
            </div>
          
          </div>

          </a-table>
          <div>
            <a-pagination
              show-size-changer
              :current="pagination_task.page"
              :default-current="1"
              :total="total_task"
              :show-total="total => `Total ${total} items`"
              @showSizeChange="taskPageSizeChange"
              @change="taskOnCurrentChange"
              class="pagination-item"
            />
          </div>
        </div>

  </a-tab-pane>


</a-tabs>

</template>


  <script>
  const columns_task=[
    {
      title: 'taskid',
      dataIndex: 'taskid',
      scopedSlots: { customRender: 'taskid' }
    },
    {
      title: 'suites',
      dataIndex: 'suites',
      width:200,
      scopedSlots: { customRender: 'suites' }
    },
    {
      title:'status',
      dataIndex:'status'
    },
    {
      title: 'create_by',
      dataIndex: 'create_by',
    },
    {
      title: 'create_time',
      dataIndex: 'create_time'
    },
  ]
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '套件名称',
      dataIndex: 'suiteName',
      scopedSlots: { customRender: 'suiteName' },
      
    },
    {
      title: '用例集',
      dataIndex: 'cases',
      scopedSlots: { customRender: 'cases' },
      width:250
    },
    {
      title: '执行状态',
      dataIndex: 'status',
      key: 'status',
      scopedSlots: { customRender: 'status' },
    },
    {
    title: ' 操作 ',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
  ];


  export default {
    
    data() {
      return {
        suiteKey:this.$store.state.suiteKey,
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
      total:10,
      pagination_task:{        
        page_size: 10,
        page: 1
      },
      total_task:10,
        data:[],
        data_task:[],
        columns,
        columns_task,
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
      if (this.$store.state.suiteKey=='2'){
        this.GetTaskList();
      }else{
      this.getSuiteList();
      }
        
    },
    methods: {
      //  new task 
      newTask(){
        this.$router.push({
          'name':"add-task"
        })
      },
      clicktask(key){
        
        if(key=='2'){
          this.GetTaskList();}
         
        if (key =='1'){
          this.getSuiteList()
        }

        
      },
      // show task record  detail 
      showTaskDetail(record){
        
          this.$router.push( {     
          name: 'task-record',
          params: {
            id: record.taskid
          }})
      },

      // show suite detail 
      showDeatil(record){
         
          this.$router.push( {     
          name: 'suite-detail',
          params: {
            id: record.id
          }})
      },
      // get task list 
       GetTaskList(){
        this.$axios({
      url:"demo-service/api/runsuite",
      method:"get",
      params:{...this.pagination_task}
    }
    ).then(res=>{
        let newData=[]
        let items = res.data.data
        for( let item of items){
          
          newData.push({
          id:item.id,
          suites:JSON.stringify(item.suite_items),
          taskid:item.taskid,
          status:item.status_name,
          create_by:item.create_by,
          create_time:item.create_time
        })
        }
        this.data_task=newData
        this.total_task=res.data.totals
  
    }).catch(err=>{
     console.log(err)
    })
        
      },
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
          cases: JSON.stringify(item.cases_list),
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
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
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
          this.$router.push({name:"add-suite"})

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
        this.page_param.page_size=pageSize
        this.page_param.page=current
        this.getSuiteList()
      },
      taskPageSizeChange(current, pageSize){
        this.pagination_task.page_size=pageSize
        this.pagination_task.page=current
        this.GetTaskList()
      },
      taskOnCurrentChange(page){
        this.pagination_task.page = page;
        this.GetTaskList()
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
    text-overflow:ellipsis;

    margin-left: 6px;
    margin-top: 6px;
  }
  .btn-groups{
  margin-left: 10px;
  }
  .suite-list  .ant-table-row  {
    height: 120px;
  }
  .text-wrapper{
  color:cornflowerblue;
  font-size: 13px;
  font-weight: 600;
}
.elips{
  padding-left: 5px;
    text-align: left;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.ant-table{
  table-layout:fixed;
}
.ant-table-tbody > tr > td {
  max-width:200px;
  min-width:70px;
  height:70px;
  max-height: 70;
  border-bottom:0;
  /*text-align: center !important;*/
  white-space:nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
}
 .overflowStyle{
    max-width:180px !important;
    max-height:70px;
    white-space:nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
    word-wrap: break-word;
    word-break: break-all;
}
</style>
  