<template>
    <div>

        <div>
            <a-button type="primary"  @click="addProject" class="add-btn">
                <a-icon type="plus" />New Project
              </a-button>
        </div>
        <div>
            <a-table 
            :columns="columns" 
            :data-source="data" 
            rowKey="id"
            :pagination="false"
            class="project-list"
            >
            <!-- <template slot="operation" slot-scope="text, record,index">
              
                <a-icon type="edit" theme="twoTone"  two-tone-color="#2E64FE" @click="editChange(index,record)"></a-icon>
                
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="data.length"
                  title="Sure to delete?"
                  @confirm="() => onDelete(record)"
                >
                <a-icon type="delete" theme="twoTone"  two-tone-color="#eb2f96"/>
                </a-popconfirm>
              </template> -->
              </a-table>
        </div>
        <div>
            <a-pagination
              show-size-changer
              :current="page_param.page"
              :default-current="1"
              :total="total"
              :show-total="total => `total ${total} items`"
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
    key: 'id',
    width:80,
    },
    {
    title: '项目名称',
    dataIndex: 'project_name',
    key: 'project_name',
    width:200,
    ellipsis:true,
    },

    {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width:200
    },
    {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    width:200
    },

    // {
    // title: 'operation',
    // key: 'operation',
    // width:100,
    // scopedSlots: { customRender: 'operation' },
    //  },
    
];
    export default{

    data(){

        return{
            data:[
                {id:1,project_name:"ssd",create_time:"xxxx",update_time:"xxxx1"}
            ],
            columns,
            page_param:{
                page_size: 10,
                page: 1,
            },
            total:10
        }
    },
    methods: {
        onShowSizeChange(current, pageSize){
            console.log(current, pageSize);
            this.page_param.page_size=pageSize
            this.page_param.page=current
            this.getProjectList()
        },
        onCurrentChange(page){
            this.page_param.page = page;
            this.getProjectList()
        },

        getProjectList(){
            this.$axios({
                url: `demo-service/api/projects`,
                method:'get',
                params:{...this.page_param}
            }).then(res =>{
                if (res.data.code ==200 && res.data.success ==true ){

                    let newData = [] 
                    for (let item of res.data.data){
                        newData.push({
                            id:item.id,
                            project_name:item.project_name,
                            create_time:item.create_time,
                            update_time:item.update_time

                        })
                    }
                    this.data= newData
                    this.total=res.data.totals
                    
                }

            }).catch(err =>{

            })
        },


        addProject(){
            this.$router.push({'name':"addProject"})


        },
        editChange(index,record){

        },
        onDelete(record){

            this.$axios( 
                {
                    url: `demo-service/api/projects/${record.id}`,
                    method: 'delete',
                }).then(res=>{
                    console.log(res.data.success)
                    if(res.data.success === true){
                    this.$message.success('删除成功！')
                    this.getProjectList()
                    }else{
                    console.log("进入失败")
                    this.$message.error('删除失败！');
                    }
                }).catch(
                res=>{ this.$message.error('删除失败！'+record.id);}
                )

        },
        
    },
    created () {
        this.getProjectList();
    }

    }

</script>

<style  lang="less" scoped>
.pagination-item{
    float: right;
    margin-top: 20px;
}
.add-btn{
    margin-bottom: 20px;
}

</style>