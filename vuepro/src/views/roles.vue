<template>
    
    <a-card title="角色管理" :bordered="false" style="width: 100%">
        <a-button class="editable-add-btn" @click="addrole"  type="primary"  style="margin-bottom: 10px;">Add</a-button>

        <a-table bordered :data-source="dataSource" :columns="columns"  rowKey="id">
      
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
{
          id: '1',
          name: 'sup角色',
          type: '普通用户',
          member: 'Mr simple , ailce',
        },
        {
          id: '2',
          name: 'admin 角色',
          type: 'admin',
          member: 'Miss Lisa,Miss zhang',
        }
      
]

const columns= [
        {
          title: 'name',
          dataIndex: 'name',
    
        },
        {
          title: 'type',
          dataIndex: 'type',
        },
        {
          title: 'member',
          dataIndex: 'member',
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
            

            }
        },
        methods: {
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