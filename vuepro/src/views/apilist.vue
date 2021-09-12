<template>
  <div>

      <div>
        <a-card :bordered="true" style="width: 100%" title="接口列表">
          <div class="head-list">
            <a-card  :bordered="false" class="st-card">
              <a-form :form="queryform" @submit="handleSearch"  layout="inline" class="search-input"> 
                <a-form-item label="项目名称">
                  <a-select
                  @search="getProject"
                  :filter-option="false"
                  @change="changeprojectValue"
                  placeholder="支持搜索"
                  show-search
                  style="width: 200px;"
                    v-decorator="[
                      'project_id',
                      {
                        initialValue: ''
                      },
                    ]"
            
                  >
                  <a-select-option v-for="d in project_data" :value="d.id" :key="d.id">{{d.project_name}}</a-select-option>
                  </a-select>
                </a-form-item>
      
                <a-form-item label="执行状态">
                    <a-select
                    show-search
                    :filter-option="false"
                    style="width: 220px" @change="statusChange"
                        v-decorator="[
                        'status',
                        {
                            rules: [
                            {
                                required: false,
                                message: '',
                            },
                            ],
                            initialValue: ''
                        },
                        ]"
                        placeholder="请选择status"
                    >
                    <a-select-option v-for=" item in status_data" :key="item.id" :value="item.id">
                        {{item.value}}
                        </a-select-option>
                    </a-select>
                    </a-form-item>
      
                    <a-form-item style="float: right;">
                      <a-row>
                        <a-col :span="24" :style="{ textAlign: 'right' }">
                          <a-button type="primary" html-type="submit">
                            Search
                          </a-button>
                          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                            Clear
                          </a-button>
                        </a-col>
                      </a-row>
                    </a-form-item>
          </a-form>
            </a-card>
        </div>
          <a-button type="primary" class="new-case btn-operate" @click="addTestCase">
            <a-icon type="plus" />New Case
          </a-button>
          <a-button type="danger" class="btn-operate" @click="batRunTestCase">执行用例</a-button>
          <a-button type="danger"  class="btn-operate"  @click="batchDelete">批量删除</a-button>
          <a-table 
          :columns="columns" 
          :data-source="data" 
          rowKey="id"
          :pagination="false"
          :scroll="{ x: 1500}"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          class="api-list"
          >
      
      
          <div tyle="link" slot="casename" slot-scope="text, record,index">
      
                <div  type="link"  @click="showDeatil(record)"  class="text-wrapper">{{text}}</div>
              
          </div>
      
          <span slot="method" slot-scope="text, record,index">
            <a-tag
              v-if="text"
              :key="index" 
              :color="text === 'GET' ? 'green' : text == 'POST' ? 'blue' : text == 'DELETE' ? 'red' : 'orange' "
            >
              {{ text }}
            </a-tag>
          </span>
          <span slot="error_msg" slot-scope="text, record,index">
            <div v-for="item of JSON.parse(record.error_msg)">
              <a-tag :color="'red'" :title="item" class="err-msg">{{item}}</a-tag>
            </div>
          </span>
          <span slot="status" slot-scope="text, record,index">
            <a-tag
              v-if='text'
              :key="index" 
              :color="text == '1' ? 'red': text == '0' ? 'blue' : text == '2' ? 'green': '' "
            >
              {{status_color[text]}}
            </a-tag>
          </span>
      
      
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
      
        </a-card>
      </div>
  </div>
  


</template>
<script>
const columns = [
{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width:80,
 
  },
  {
    title: '接口名称',
    dataIndex: 'casename',
    key: 'casename',
    scopedSlots: { customRender: 'casename' },
    width:200
  },
  {
    title :'项目名称',
    dataIndex:'project_name',
    key:'project_name',
    width:200

  },
  {
    title: '请求方法',
    dataIndex: 'method',
    key: 'method',
    width:120,
    scopedSlots: { customRender: 'method' },
  },
  {
    title: '请求地址',
    dataIndex: 'url',
    key: 'url',
    width:300,
    ellipsis:false,
  },
   
  {
    title: '请求头',
    key: 'headers',
    dataIndex: 'headers',
    ellipsis:true,
    width:200,
  
  },
  
  {
    title: '请求parameter',
    key: 'params',
    dataIndex: 'params',
    ellipsis:true,
  },
  {
    title: '请求mine类型',
    key: 'minetype',
    dataIndex: 'minetype',
    ellipsis:true,
    customRender(text, record, index){
    if (text == "1"){
      text="none"
    }else if (text == '2'){
      text= "multipart/form-data"
    }else if ( text== "3"){
      text = "application/x-www-form-urlencoded"
    }else if (text =='4'){
      text = "application/json"
    }
  return text
}
    
  },
  {
    title: '请求体',
    key: 'body',
    dataIndex: 'body',
    ellipsis:true,
    width:200,

  },
  {
    title: '响应',
    key: 'response',
    dataIndex: 'response',
    ellipsis:true,
    width:200,
  },
  {
    title: '提取变量',
    key: 'extract',
    dataIndex: 'extract',
    width:200,
    
  },
  {
    title: '断言',
    key: 'assert_express',
    dataIndex: 'assert_express',
    width:200,
  },
  {
    title: '断言错误信息',
    key: 'error_msg',
    dataIndex: 'error_msg',
    width:200,
    scopedSlots: { customRender: 'error_msg' },
  },
  {
    title: '执行状态',
    key: 'status',
    dataIndex: 'status',
    width:160,
    scopedSlots: { customRender: 'status' },


  },
  {
    title: '创建时间',
    key: 'create_time',
    dataIndex: 'create_time',
    width:160
  },
  {
    title: '更新时间',
    key: 'update_time',
    dataIndex: 'update_time',
    width:160

  },
  {
    title: '操作',
    key: 'operation',
    width:100,
    scopedSlots: { customRender: 'operation' },

  },
];


export default {

  created () {
   
    this.getApiList()
    this.getProjectList()

  }
  ,
  data() {
    return {
      data:[],
      value:"",
      status_data:[],
      queryform: this.$form.createForm(this, { name: 'case_search' }),
      project_data:[],
      status_color:{
        "0":"未知",
        "1":"失败",
        "2":"成功"
        
      },
      init_filter:{project_id: '', status: ""},
      selectedRowKeys: [],
      columns,
      methodcolor:"green",
      page_param:{
        page_size: 10,
        page: 1,
      },
      total:10
    };
  },


  methods: {
  
    changeprojectValue(v){
      this.value =v 
    
    },
    getProject(value){
      this.value = value
      this.getProjectList();
    },
    getProjectList(){
      this.$axios({
        url:'demo-service/api/projects',
        method:'get',
        params:{...this.page_param,search:this.value}

      }).then(res=>{
        if (res.data.success ==true && res.data.code ==200 ){
          let newData = [] 
          for(let item of res.data.data){
            newData.push({
              id:item.id,
            project_name: item.project_name
            })
          }
          this.project_data = newData
         
          
        }

      }

      ).catch(err =>{
        console.log(err)
      })

    },
    // 筛选
    handleSearch(e) {
      e.preventDefault();
      this.queryform.validateFields((error, values) => {
        // console.log('Received values of form: ', values);
        this.init_filter = values
        this.page_param.page=1
        this.getApiList()
      });
    },

    handleReset() {
      this.queryform.resetFields();
      this.init_filter={project_id: '', status: ""}
      this.getApiList()
    },
    statusChange(value){
       // console.log(value)
    },
    // add Case
    addTestCase(){
      this.$router.push({

        name:"api-add"
      })

    },
    getApiList(){
  
    this.$axios({
      url:"demo-service/api/testcase",
      method:"get",
      params:{...this.page_param,...this.init_filter}
    }
    ).then(res=>{
        let newData=[]
        var items = res.data.data
        // console.log(items,typeof(items))
        if(items){
          for( let item of items){
         
         newData.push({
         id:item.id,
         casename:item.case_name,
         project_name:item.project_name,
         method: item.method,
         url: item.url,
         headers:JSON.stringify(item.headers),
         params:item.params,
         minetype:item.mine_type,
          body:JSON.stringify(item.body),
          response:JSON.stringify(item.response),
          extract:JSON.stringify(item.extract),
          assert_express:JSON.stringify(item.assert_express),
          error_msg:JSON.stringify(item.error_msg),
          status:item.status,
          create_time:item.create_time,
          update_time:item.update_time


       })
       }
        }
        this.data=newData
        this.total=res.data.totals
  
    }).catch(err=>{
     console.log(err)
    })

   
  },
  editChange(index,record){
    this.$router.push( {     
          name: 'editapiList',
          params: {
            id: record.id
          }})
  },
  onDelete(record){
    this.$axios( 
                {
                    url: `demo-service/api/testcase/${record.id}`,
                    method: 'delete',
                }).then(res=>{
                    console.log(res.data.success)
                    if(res.data.success === true){
                      this.$message.success('删除成功！')
                      this.getApiList()
                    }else{
                      console.log("进入失败")
                      this.$message.error('删除失败！');
                    }
                }).catch(
                  res=>{ this.$message.error('删除失败！'+record.id);}
                )
  },
  
  getOneData(record){
    return new Promise((resolve, reject) => {
            this.$axios.get(`demo-service/api/testcase/${record.id}`).then((res) => {
                resolve(res.data)
            }).catch((err) => {
              reject(err.data)   
            })
        })
    
  },
  //pagination 

  onShowSizeChange(current, pageSize){
   
    this.page_param.page_size=pageSize
    this.page_param.page=current
    this.getApiList()
  },
  onCurrentChange(page){
    this.page_param.page = page;
    this.getApiList()
  },
  showDeatil(record){
    this.$router.push( {     
          name: 'api-detail',
          params: {
            id: record.id
          }})

  },
  // select one 
  onSelectChange(selectedRowKeys) {
        
        this.selectedRowKeys = selectedRowKeys;
      },
  batRunTestCase(){
    let case_ids =  this.selectedRowKeys
    this.$axios({
          url:`demo-service/api/testcase/batch`,
          method:"post",
          data:{"case_ids":case_ids}
        }).then(res=>{
          if (res.data.code ==200 && res.data.success == true ){
        
            this.$message.success(res.data.msg)
          
          }else{
            this.$message.error(res.data.msg)

          }
         
        }).catch(err=>{
          console.log(err)
        })

  },
  batchDelete(){
    let case_ids=  this.selectedRowKeys.join(',')
        this.$axios({
          url:`demo-service/api/testcase/batch`,
          method:"delete",
          params:{"case_ids":case_ids}
        }).then(res=>{
          if (res.data.code ==200 && res.data.success == true ){
        
            this.$message.success(res.data.msg)
            this.getApiList()
            

          }else{
            this.$message.error(res.data.msg)

          }
         
        }).catch(err=>{
          console.log(err)
        })

  }
    
  },


};
</script>


<style lang="less" scoped>

.pagination-item{
  float: right;
  margin-top: 10px;
}
.err-msg{
  width:150px;
   overflow:hidden;
   text-overflow:ellipsis;
   white-space:nowrap;

}
.text-wrapper{
color:cornflowerblue;
font-size: 13px;
font-weight: 600;
}
.new-case{

  margin-bottom: 20px;
}
.api-list /deep/ .ant-table-row {
    height: 90px;
  }
.btn-operate{
  margin-left: 10px;
}
.head-list{
  margin-bottom: 20px;
  margin-left: 0px;
}
.st-card /deep/ .ant-card-body{
  padding: 10px;
}


</style>