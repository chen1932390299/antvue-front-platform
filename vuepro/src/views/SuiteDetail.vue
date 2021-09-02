<template>
    <div>

        <div>
            <a-descriptions title="Suite Info">
                <a-descriptions-item label="suiteName">
                  {{data.suite_name}}
                </a-descriptions-item>
                <a-descriptions-item label="status">
                {{status_enum[data.status]}}
                </a-descriptions-item>
              </a-descriptions>
        </div>
        <div>
            <a-table :columns="columns" 
            :data-source="data.case_list"
            rowKey="id"
            >
            <div tyle="link" slot="name" slot-scope="text, record,index">
      
                <div  type="link"  @click="showDeatil(record)"  class="text-wrapper">{{text}}</div>
              
              </div>
              <div tyle="link" slot="status" slot-scope="text, record,index">
                <span>{{status_case[text]}}</span>
              
              </div>
              </a-table>
        </div>
    
    </div>


      
  </template>

<script>
    const columns = [
{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: 'Case',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  }

];
    export default{

    beforeCreate () {
            let suite_id =this.$route.params.id
            this.$axios({
                url:`demo-service/api/testsuite/${suite_id}`,
                method:"get"
            }).then(res=>{
                let item= res.data.data
                let deatil_data={
                    suite_name:item.suite_name,
                    status:item.status,
                    case_list:item.items
                }
                this.data=deatil_data

            }).catch(err=>{
                console.log(err)
            })
        
    },

    data () {
        return {
            columns,
            data:{
                suite_name:'xxxx',
                case_list:[],
                status:0
            },
            status_enum:{
            0:"全部未执行",
            1:"全部失败",
            2:"成功",
            3:"部分失败"
        },
        status_case:{
        "0":"未知",
        "1":"失败",
        "2":"成功"
        
      },

        }
    },
    methods: {
        showDeatil(record){

            this.$router.push( {     
          name: 'api-detail',
          params: {
            id: record.id
          }})
        }
    }
    }


</script>

<style>

.text-wrapper{
color:cornflowerblue;
font-size: 13px;
font-weight: 600;
}
</style>