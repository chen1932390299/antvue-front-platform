<template>

    <div>
        <div>
            <a-button type="primary" @click="goBackTaskList"><a-icon type="left" />Go back</a-button>
        </div>
        <div style="margin-top: 40px;">
            <a-descriptions title="任务信息">
        
              </a-descriptions>
        </div>
        <div>
            <a-table :columns="columns" 
            :data-source="data"
            row-key="id"
            >
            <span slot="status" slot-scope="text, record,index">
                <a-tag
                  v-if='text'
                  :key="index" 
                  :color="text == '1' ? 'red': text == '0' ? 'blue' : text == '2' ? 'green': '' "
                >
                  {{status_enum[text]}}
                </a-tag>
              </span>
            <template slot="expandedRowRender" slot-scope="record" style="margin: 0">
              <div>
                <a-descriptions title="CaseDetail"  size="middle" bordered
                style="word-break: break-all;word-wrap: break-word;"
                
                >
        
                    <a-descriptions-item label="请求地址" span="5" >
                     {{ record.url}}
                    </a-descriptions-item>
                    <a-descriptions-item label="方法"  span="5">
                     {{record.method}}
                    </a-descriptions-item>
                    <a-descriptions-item label="请求头" span="5">
                        {{record.headers}}
                      </a-descriptions-item>
                    <a-descriptions-item label="请求体" span="5">
                      {{record.body}}
                    </a-descriptions-item>
                    <a-descriptions-item label="响应" span="5" >
                      <div >{{record.response}}</div>
                    </a-descriptions-item>
                    <a-descriptions-item label="断言错误" span="5">
                        {{record.error_msg}}
                      </a-descriptions-item>
                  </a-descriptions>
              </div>
            </template>
            </a-table>

        </div>
    </div>

</template>

<script>

      const data = [

      ] ;
     const columns=[
        {
      title: 'id',
      dataIndex: 'id',
        },
        {
        title: 'suite_id',
        dataIndex: 'suite_id',
        },
        {
        title:"casename",
        dataIndex:'case_name'
        },
        {
        title:"method",
        dataIndex:'method'
        },
        {
        title:"url",
        dataIndex:"url"
        },
        {
        title:"status",
        dataIndex:'status',
        scopedSlots: { customRender: 'status' },
        },
        {
        title: 'last_execute_time',
        dataIndex: 'update_time'
        }

      ]
    export default{
      
        created () {
            this.GetTaskRecordDetail();
        },

        data () {
            return {
                data,
                columns,
                status_enum:{
                    "0":"未知",
                    "1":"失败",
                    "2":"成功"
                    
                }
            }
        },
        methods: {
            // 
            goBackTaskList(){
                this.$store.state.suiteKey = '2'
                this.$router.push({
                    'name':'suitelist'
                })
               
            }
            ,
            GetTaskRecordDetail(){
            let item_id =this.$route.params.id
            this.$axios({
                url:`demo-service/api/task/record/${item_id}`,
                method:"get"
            }).then(res=>{
                let items= res.data.data
                let newData=[]
                for( let item of items){
                    newData.push({
                        id:item.id,
                        suite_id:item.suite_id,
                        case_name:item.case_name,
                        body:JSON.stringify(item.body),
                        method:item.method,
                        url:item.url,
                        status:item.status,
                        headers:item.headers,
                        update_time:item.update_time,
                        response:item.response,
                        error_msg:item.error_msg
                    })
                }

                this.data=newData

            }).catch(err=>{
                console.log(err)
            })
            }

        }
    }
</script>


<style lang="less" scoped>
.simple_text{
    word-break: break-all;
    word-wrap: break-word;
}

</style>