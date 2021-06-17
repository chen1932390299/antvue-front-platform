<template>
    
    <div>
        <div>
            <div>
             <a-card style="width: 60%;" title="TestCase结果统计">
              <span>项目:  
                <a-select 
                :allow-clear="true"
            
                :filter-option="false"
                placeholder="搜索项目名称"
                show-search
                style="width: 120px" 
                @search="queryProject"
                @change="handleChange">
                <a-select-option v-for="d in projects" :value="d.id" key="d.id">
                  {{d.value}}
                </a-select-option>
              </a-select>
            </span>

                 <ve-pie :data="chartData" :settings="chartSettings" ></ve-pie>
                
            </a-card>
            </div>
     
            <div>
                <a-tabs>
                    <a-tab-pane key="1" tab="失败详情  (tip:点击title可跳转到详情)">
                        <a-list item-layout="horizontal" :data-source="data" :pagination="false" >
                            <a-list-item slot="renderItem" slot-scope="item, index">
                              <a-list-item-meta
                                :description="item.desc"
                              >
                                <a slot="title" class="fail-item" @click="showDetailPage(item)">{{ item.title }}</a>
                                <a-avatar
                                  slot="avatar"
                                  :src="avant"
                                />
                              </a-list-item-meta>
                              
                            </a-list-item>
                           
                          </a-list>
                          <div class="sty-page">
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
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>

    </div>
  </template>
  <script>
  export default {
    beforeCreate () {
        this.$axios({
                url:`demo-service/api/testcase/status`,
                method:'get',
                params:{project_id:this.project_id}
            }).then(res =>{
                if (res.data.success == true && res.data.code ==200 ){
                    let success_count=res.data.data.success, failed_count= res.data.data.false, undefine_count = res.data.data.undefined
                    this.chartData.rows=[
                    { 'status': 'success', 'count':success_count},
                    { 'status': '未知', 'count': undefine_count},
                    { 'status': 'failed','count': failed_count }
                    ]
                }else {
                 let error = JSON.stringify(res.data.msg)
                 this.$message.error(error)
                }

            }).catch(err =>{
                console.log(err)
            })

    },
    created () {
      this.getFailList()
    },

    methods:{
      getFailList(){
        this.$axios({
                url:`demo-service/api/testcase/status/detail`,
                methods:'get',
                params:Object.assign({status:1,project_id:this.project_id},this.page_param)
            }).then(res=>{
                if (res.data.code==200 && res.data.success == true ){
                    let newData = []
                    // console.log(res.data)
                    for(let item of res.data.data){
                        newData.push({
                        id:item.id,
                        title:item.name,
                        desc:JSON.stringify(item.response),
                        error_msg:JSON.stringify(item.error_msg)
                    })
                    }
                    this.data=newData
                    this.total= res.data.totals
                }
            }).catch(err=>{
                console.log(err)

            })

      },
      // go to detail 
      showDetailPage(item){
        console.log(item)
        this.$router.push({
            path: `/api/detail/${item.id}`

            })
      },
      onShowSizeChange(current, pageSize){
        console.log(current, pageSize);
        this.page_param.page_size=pageSize
        this.page_param.page=current
        this.getFailList()
      },
      onCurrentChange(page){
        this.page_param.page = page;
        this.getFailList()
      },

      handleChange(value){
        // console.log(value)
        this.project_id =value
        this.getFailList()
        
      },
      queryProject(value) {
        // console.log(value)
      this.$axios({
          url:`demo-service/api/projects`,
          method:'get',
          params:{'search':value,...this.page_param}

        }).then(res =>{
          if (res.data.success ==true && res.data.code ==200){
            let newData=res.data.data.map(item => (
              {
                id: item.id,
                value: item.project_name,
                }
          ));
          this.projects=newData;
          this.fetching = false;
          }else{
            this.$message.error(JSON.stringify(res.data.msg))
          }


        }).catch(err=>{
          console.log(err)
        })

    },
    },
    data () {
      // https://vue-echarts.github.io/guide/format.html
      this.chartSettings = {
        type:'pie',
      }
      return {
        avant:require('@/assets/avant.png'),
        projects:[],
        project_id:'',
        data:[],
        // pipe
        chartData: {
          columns: ['status','count'],
          rows: [
            { 'status': 'success', 'count':0},
            { 'status': '未知', 'count': 0},
            { 'status': 'failed','count': 0 }
          ]
        },
        page_param:{
        page_size: 10,
        page: 1,
      },
      total:10
      }
    }

  }
  </script>

  <style lang="less" scoped>
    .sty-page{

      margin-top: 20px;
      float: right;
    }
    .fail-item{
      color:dodgerblue
    }
  </style>