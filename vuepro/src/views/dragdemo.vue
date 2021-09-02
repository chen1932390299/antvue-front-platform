<template>
  <div>
      <div class="suite-input">
        <br>
        <h3>测试套件名称</h3>
        <a-input placeholder="测试套件名称" required="required"  style="width: 40%;"  :value="suiteName" @change="changeSuiteName"/>
      </div>
    <div>
      <h3>请选择测试用例组合场景 (拖拽可指定case执行顺序)</h3>
      <a-select
      mode="multiple"
      placeholder="根据名称模糊查询"
      
      style="width: 60%; margin-top:10px"
      :filter-option="false"
      @search="queryCaseByName"
      @change="handleChange"
      :maxTagTextLength="tagmaxlength"
      :showArrow="true"
    >
      <a-select-option v-for="item in OPTIONS" :key="item.id" :value="item.name">
        {{ item.name}}
      </a-select-option>
    </a-select>
    </div>
    <a-card title="测试套件" class="suite-card" :bordered="true">
      <a-empty v-if="selectedItems.length == 0"  class="empty-data" />
      <div v-if="selectedItems.length >0">
       
        <draggable v-model="selectedItems"  chosenClass="chosen" forceFallback="true" 
  
        group="people1" animation="1000" @start="onStart" @end="onEnd">
           <transition-group>
           
           <div  style="width: 80%;"  class="item" v-for="(item,index) in selectedItems" :key="index + 1 " >{{item}} {{index}}</div>
            
           </transition-group>
       </draggable>
    </div>
    
    </a-card>
      <div class="btn-icons" style="margin-right: 220px; margin-top: 100px; float: right;">
        <a-button type="primary" @click="submit">submit</a-button>
        <a-button type="primary" @click="cancle" style="margin-left: 20px;">cancle</a-button>
      </div>
    </div>
  </template>

  <script>
  //导入draggable组件
  import draggable from 'vuedraggable'
  
  export default {
    //注册draggable组件
     components: {
              draggable,
    },
    created () {
      this.getAllCases()
     
    },
    computed: {
          // filteredOptions() {
          //    return this.OPTIONS.filter(o => !this.selectedItems.includes(o.name));
        
          // }
       
    },
    data() {
        return { 
          suiteName:'',
          drag:false,
          sortedArray:[],
          // input search data
          selectedItems: [],
          showdrags:[],
          OPTIONS : [],
         
          page_param:{
            page_size: 10,
            page: 1,
          },
          totals:0,
          tagmaxlength:20,
          value:''
        };
    },
    methods:{
      // suitename change 
        changeSuiteName(e){
            // console.log(e.target.value)
            this.suiteName=e.target.value
        },
        // submit 
        submit(){
          console.log(this.showdrags)
          if(!this.suiteName){
            this.$message.error("测试套件名不能为空")
          }else{
            if (JSON.stringify(Array.from(this.showdrags)) =='[]'){
              this.$message.error("请选择测试组合")
            }else{
              let data=Object.assign({},{suite_name:this.suiteName,cases_list: Array.from(this.showdrags)})
               this.$axios({
                url:"demo-service/api/testsuite",
                method:"post",
                data:data
                  }).then(res=>{
                    // console.log(res.data)
                    if (res.data.success == true && res.data.code==200){
                      this.$message.success("创建成功")
                      this.$router.push({name:"suitelist"})
                    }else{
                      let msg=res.data.msg
                      this.$message.error(msg)
                    }
                  }).catch(err=>{
                    console.log(err)
                  })
               
            }
          }

        },
        cancle(){
          this.$router.push({name:"suitelist"})
        },
       //开始拖拽事件
        onStart(){
          this.drag=true;
        },
        //拖拽结束事件
         onEnd() {
         this.drag=false;
         let arr=[]
         for( let name of this.selectedItems){
            let mapper = this.showdrags.filter( item => item.name ==name )[0]
            arr.push(mapper)

         }
       this.showdrags=arr
      },

      // change input  
      handleChange(selectedItems) {

        // deal with show drags array 
        for(let name of selectedItems){
          let item = this.OPTIONS.filter(item => item.name == name )[0]
          if(!this.showdrags.includes(item) && item !=undefined){
            this.showdrags.push(item)
          }
         
        }
      this.selectedItems =selectedItems;

    },

    getAllCases(){
      this.$axios({
      url:"demo-service/api/testcase",
      method:"get",
      params:{...this.page_param}
    }
    ).then(res=>{
      let items=[],total=res.data.totals
      this.totals=total
      for (let item of res.data.data){
        items.push({"id":item.id,"name":item.case_name})
       
      }
      this.OPTIONS=items
      
    }).catch(err=>{
      console.log(err)
    })
    },
    // hand search 
    queryCaseByName(value){
      
      let ids=[]
      this.$axios({
          url:"demo-service/api/testcase",
          method:"get",
          params:{...this.page_param,'search':value}

        }).then(res=>{
          
          for (let item of res.data.data){
            ids.push({"id":item.id,"name":item.case_name})
          }
          
         
        }).catch(err=>{
            console.log(err)
        })
        this.OPTIONS=ids
    }






    },
  };
  </script>


<style scoped less="lang">
  .suite-card{

    margin-top: 100px;
    
  }
    /*被拖拽对象的样式*/
    .item {
        padding: 6px;
        background-color: 	 #f8f8ff;
        border: solid 3px  #eee;
        margin-bottom: 10px;
        cursor: move;
    } 
    .item:hover {
    background-color:thistle;
    cursor: move;
}

    /*选中样式*/
    .chosen {
        border: solid 1px #3089dc !important;
    }
    .empty-data{
      height: 280px;
    
     
    }
    .suite-input{
      margin-bottom: 20px;
    }
</style>