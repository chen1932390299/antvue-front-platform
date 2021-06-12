<template>
  <a-card :bordered="true" style="width: 100%" title="接口列表">

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
    title: 'method',
    dataIndex: 'method',
    key: 'method',
    width:120,
    scopedSlots: { customRender: 'method' },
  },
  {
    title: 'url',
    dataIndex: 'url',
    key: 'url',
    width:300,
    ellipsis:false,
  },
   
  {
    title: 'headers',
    key: 'headers',
    dataIndex: 'headers',
    ellipsis:true,
 
  
  },
  
  {
    title: 'params',
    key: 'params',
    dataIndex: 'params',
    ellipsis:true,
  },
  {
    title: 'minetype',
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
    title: 'body',
    key: 'body',
    dataIndex: 'body',
    ellipsis:true,
    width:200,

  },
  {
    title: 'response',
    key: 'response',
    dataIndex: 'response',
    ellipsis:true,
    width:200,
  },
  {
    title: 'extract',
    key: 'extract',
    dataIndex: 'extract',
    width:200,
    
  },
  {
    title: 'assert',
    key: 'assert_express',
    dataIndex: 'assert_express',
    width:200,
  },
  {
    title: 'error_msg',
    key: 'error_msg',
    dataIndex: 'error_msg',
    width:200,
    scopedSlots: { customRender: 'error_msg' },
  },
  {
    title: 'status',
    key: 'status',
    dataIndex: 'status',
    width:160,
    scopedSlots: { customRender: 'status' },


  },
  {
    title: 'create_time',
    key: 'create_time',
    dataIndex: 'create_time',
    width:160
  },
  {
    title: 'update_time',
    key: 'update_time',
    dataIndex: 'update_time',
    width:160

  },
  {
    title: 'operation',
    key: 'operation',
    width:100,
    scopedSlots: { customRender: 'operation' },

  },
];


export default {

  created () {
    this.getApiList()
  }
  ,
  data() {
    return {
      data:[],
      status_color:{
        "0":"未知",
        "1":"失败",
        "2":"成功"
        
      },
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
    // add Case
    addTestCase(){
      this.$router.push({

        name:"apiadd"
      })

    },
    getApiList(){
  
    this.$axios({
      url:"demo-service/api/testcase",
      method:"get",
      params:{...this.page_param}
    }
    ).then(res=>{
        let newData=[]
        let items = res.data.data
        for( let item of items){
         
          newData.push({
          id:item.id,
          casename:item.case_name,
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
    console.log(current, pageSize);
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
        console.log('selectedRowKeys changed: ', selectedRowKeys);
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
</style>