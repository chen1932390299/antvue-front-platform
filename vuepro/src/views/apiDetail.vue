<template>
    <div>
        <div>
            <a-descriptions title="Test Case Info"  class="desc" bordered size="middle"
            >
                <a-descriptions-item label="测试用例名称" span="5" >
                <div>{{data.casename}}</div>
                </a-descriptions-item>
                <a-descriptions-item label="请求方法" span="4">
                  {{data.method}}
                </a-descriptions-item>
                <a-descriptions-item label="URL" span="5">
                  <div>{{data.url}}</div>
                </a-descriptions-item>
                <a-descriptions-item label="请求头" span="15">
                    <div> {{data.headers}}</div>
                </a-descriptions-item>
                <a-descriptions-item label="parameters" span="5">
                  {{data.params}}
                </a-descriptions-item>
                <a-descriptions-item label="请求体"  span="15">
                 {{data.body}}
                </a-descriptions-item>

                <a-descriptions-item label="提取变量" span="7">
                  {{data.extract}}
                </a-descriptions-item>
                <a-descriptions-item label="断言" span="5">
                  {{data.assert_express}}
                </a-descriptions-item>
                <a-descriptions-item label="状态" span="5">
                        <a-tag
                        :color="data.status == '失败' ? 'red': data.status == '未知' ? 'blue' : data.status == '成功' ? 'green': '' ">
                            {{data.status}}
                        </a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="响应体" span="5">
                    {{data.response}}
                </a-descriptions-item>
                <a-descriptions-item label="断言错误信息" span="5">
                    {{data.error_msg}}
                </a-descriptions-item>
                <a-descriptions-item label="最后执行时间" span="5">
                    {{data.update_time}}
                </a-descriptions-item>
          
              </a-descriptions>
        </div>

    </div>


  </template>

  <script>
      export default{

        beforeCreate () {
            let case_id =this.$route.params.id
            this.$axios({
                url:`demo-service/api/testcase/${case_id}`,
                method:"get"
            }).then(res=>{
                let item= res.data.data
                let deatil_data={
                    casename:item.case_name,
                    method: item.method,
                    url: item.url,
                    headers:JSON.stringify(item.headers,null,10),
                    params:item.params,
                    minetype:item.mine_type,
                    body:JSON.stringify(item.body),
                    response:JSON.stringify(item.response),
                    extract:JSON.stringify(item.extract),
                    assert_express:JSON.stringify(item.assert_express),
                    error_msg:JSON.stringify(item.error_msg),
                    status:this.status_enum[item.status],
                    update_time:item.update_time
                }
                this.data=deatil_data

            }).catch(err=>{
                console.log(err)
            })
        },

        data () {
            return {
                status_enum:{
                    "0":"未知",
                    "1":"失败",
                    "2":"成功"
                    
                },
                
                data:{
                    casename:"",
                    method: "",
                    url: "",
                    headers:"",
                    params:"",
                    minetype:"",
                    body:"",
                    response:"",
                    extract:"",
                    assert_express:"",
                    error_msg:"",
                    update_time:""

                }
            }
        }
      }

      methods: {
          
      }

  </script>

  <style lang="less" scoped>
      .desc /deep/   .ant-descriptions-item-content{
        word-break: break-all;
        word-wrap: break-word;
      }

  </style>
  