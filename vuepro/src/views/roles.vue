<template>
    
    <a-card title="角色管理" :bordered="false" style="width: 100%">
        <a-button class="editable-add-btn" @click="addrole"  type="primary"  style="margin-bottom: 10px;">Add</a-button>

        <a-table bordered :data-source="dataSource" :columns="columns" row-key="id" >
      
            <template slot="operation" slot-scope="text, record,index">
                <a-button type="link" size="small" @click="editrole(record)">编辑</a-button>
              <a-popconfirm
                v-if="dataSource.length"
                title="Sure to delete?"
                @confirm="() => deleterole(record.id)"
              >
                <a-button type="link" >删除</a-button>
              </a-popconfirm>
              <a-button type="link"   @click="showRoleModal">权限分配</a-button>
            </template>
          </a-table>
          <div class="modal-role">
            <a-modal v-model="visibleRoleModal" title="Basic Modal" @ok="handleOkRole" >
                <div>xxxxxxxxxxxxxxxx</div>
                <div>xxxxxxxxxxxxxxxx</div>
                <div>xxxxxxxxxxxxxxxx</div> <div>xxxxxxxxxxxxxxxx</div>
              </a-modal>
          </div>


      </a-card>
</template>

<script>

const data=[
      
]

const columns= [
        {
          title: '角色名称',
          dataIndex: 'role_name',
    
        },
        {
          title: '类型',
          dataIndex: 'role_type',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ]

 export default {
    
        data(){
            return {
            dataSource:data,
            columns,
            visibleRoleModal:false,
            pagination:{
              page:1,
              page_size:10
            },
            total:0

            }
        },
        methods: {

          // GET ROLES list  
            GetRoleList(){
              this.$axios({
      url:"demo-service/api/role/info",
      method:"get",
      params:{...this.pagination}
    }
    ).then(res=>{
        let newData=[]
        let items = res.data.data
        for( let item of items){
          
          newData.push({
          id:item.id,
          suites:JSON.stringify(item.suite_items),
          role_name:item.role_name,
          role_type :item.role_type_value,
          status:item.status_value,
          create_by:item.create_by,
          create_time:item.create_time
        })
        }
        this.dataSource=newData
        this.total=res.data.totals
  
    }).catch(err=>{
     console.log(err)
    })

            },
            addrole(){
                console.log("yyyds  add")
                this.$router.push("/addrole")
            },
            editrole(){
                console.log("yyds edit ")
            },
            deleterole(id){
                console.log(id);

            },
            showRoleModal(){
            console.log(" 分配角色")
            this.visibleRoleModal=true
            },
            handleOkRole(){
                this.visibleRoleModal=false
            }
        },

        created () {
           this.GetRoleList()
        },


    }


</script>

<style lang="less" scoped>
div /deep/ .ant-modal-content{
height: 600px;
width: 1000px;

}
div /deep/ .ant-modal-body{
    height: 80%;
    width: 100%;
}
</style>