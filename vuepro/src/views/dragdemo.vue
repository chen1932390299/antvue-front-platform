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
      :value="selectedItems"
      style="width: 60%; margin-top:10px"
      @change="handleChange"
      @popupScroll="e=>scrollevent(e)"
      :maxTagTextLength="tagmaxlength"
    >
      <a-select-option v-for="item in filteredOptions" :key="item.id" :value="item.name">
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
  var a= []
  for (let i=0;i<40;i++){
       a.push(i.toString())
    }
  export default {
    //注册draggable组件
     components: {
              draggable,
    },
    created () {
      this.getAllCases()
     
    },
    computed: {
          filteredOptions() {
             return this.OPTIONS.filter(o => !this.selectedItems.includes(o.name));
        
          }
       
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
          names_list:[],
          page_param:{
            page_size: 10,
            page: 1,
          },
          totals:0,
          tagmaxlength:20
        };
    },
    methods:{
      // suitename change 
        changeSuiteName(e){
            console.log(e.target.value)
            this.suiteName=e.target.value
        },
        // submit 
        submit(){
          // console.log(this.showdrags)
          if(!this.suiteName){
            this.$message.error("测试套件名不能为空")
          }else{
            if (JSON.stringify(Array.from(this.showdrags)) =='[]'){
              this.$message.error("请选择测试组合")
            }else{
              let data=Object.assign({},{suite_name:this.suiteName,case_id: Array.from(this.showdrags)})
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
         for( let v of this.selectedItems){
            let mapper = this.showdrags.filter( item => item.name ==v )[0]
            arr.push(mapper)

         }
       this.showdrags=arr
      },

      // input search 
      handleChange(selectedItems) {
        for(let name of selectedItems){
          let item = this.OPTIONS.filter(item => item.name == name )[0]
          if(!this.showdrags.includes(item)){
            this.showdrags.push(item)
          }
         
        }
      this.selectedItems =selectedItems;

    },
    scrollevent(e){
      let heights=e.target.scrollHeight, top = e.target.scrollTop, clientHeight=e.target.clientHeight
      let distance=heights-top-clientHeight
      
      if (distance <10){
        if (this.page_param.page <Math.ceil(this.totals/10)){
          this.page_param.page=this.page_param.page+1
          this.$axios({
            url:"demo-service/api/testcase",
            method:"get",
            params:{...this.page_param}
          }
          ).then(res=>{
            let newnames=[]
            let result= Array.from(res.data.data)
              //console.log(this.page_param.page)
             
              for (let item of result){
                  newnames.push({"id":item.id,"name":item.case_name})
                  // this.names_list=  Array.from(new Set( this.names_list.concat(newnames)))  
                  for (let it of newnames){
                    if (!this.names_list.includes(it)){
                      this.names_list.push(it)
                    }
              }
              // this.names_list=Object.assign([],this.names_list,newnames)
              this.OPTIONS=this.names_list
              
              
           
            }

          }).catch(err=>{
            console.log(err)
          })

        }
        
      }
    },

    getAllCases(){
      this.$axios({
      url:"demo-service/api/testcase",
      method:"get",
      params:{...this.page_param}
    }
    ).then(res=>{
      let names=[],total=res.data.totals
      this.totals=total
      for (let item of res.data.data){
        names.push({"id":item.id,"name":item.case_name})
        this.names_list=names
        this.OPTIONS=this.names_list
      }
      
    }).catch(err=>{
      console.log(err)
    })
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