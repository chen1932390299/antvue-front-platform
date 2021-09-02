<!DOCTYPE html>
<template>
  
  <a-tabs :default-active-key="currentTabKey" @change="ChangeTab">
    <a-tab-pane key="1" tab="用户列表">
      <a-input-search placeholder="input search username"
       class="search-user"
       enter-button @search="onSearch" />
      <a-table :columns="columns" :data-source="data" row-key="id">
        
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="角色列表" force-render>
      <roles></roles>
    </a-tab-pane>
    <a-tab-pane key="3" tab="用户角色关联">
     <user-related-role></user-related-role>
    </a-tab-pane>
  </a-tabs>

</template>


<script>

  import roles from '@/views/roles'
  import UserRelatedRole from '@/views/UserRelatedRole'
  const columns = [
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
   
  },
  {
    title: 'mobile',
    dataIndex: 'mobile',
    key: 'mobile',
   
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
  },
  {
    title: 'create_time',
    dataIndex: 'create_time',
    key: 'create_time',
    ellipsis: true,
  },
  {
    title: 'update_time',
    dataIndex: 'update_time',
    key: 'update_time',
    ellipsis: true,
  }
];
export default{
  name:"user",
  components: {
    roles,UserRelatedRole
  },
  data () {
    return {
      data:[],
      columns,
      pagination:{
        page_size:10,
        page:1
      },
      total:10,
      currentTabKey:this.$store.state.defalutKey

    }
  }
  ,
  methods: {
    ChangeTab(key){
      this.$store.state.defalutKey = key ;

    },
  // GetUsers
  GetUserList(){
    this.$axios({
      url:"demo-service/api/userInfo/",
      method:"get",
      params:{...this.pagination}
    }
    ).then(res=>{
        let newData=[]
        let items = res.data.data
        for( let item of items){
          
          newData.push({
          id:item.id,
          username: item.username,
          mobile: item.mobile,
          email: item.email,
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
  // get query user 
  onSearch(value){

  }

},

created () {
 
  this.GetUserList();
}
}

  

</script>

<style >
.search-user{
  margin: 10px;
  width: 250px;
}

</style>