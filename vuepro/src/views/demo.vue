<template>
  
  <a-select
  mode="multiple"
  :label-in-value="true"
  :value="value"
  placeholder="Select users"
  style="width: 100%"
  :filter-option="false"
  :not-found-content="fetching ? undefined : null"
  @search="querySuite"
  @change="handleChange"
>
  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
  <a-select-option v-for="d in data" :key="d.id">
    {{d.value}}
  </a-select-option>
</a-select>


</template>

<script>

  export default{

    data(){


      return{

        data :[],
        value: [],
        fetching: false,
        suite_ids:[]

      }

    },
    methods:{
      handleChange(value){
        Object.assign(this, {
        value,
        data: [],
        fetching: false,
      });
      let item_ids =[]
      for (let item of this.value){
        item_ids.push(item.key)
      }
      this.suite_ids = item_ids
      console.log(this.suite_ids)
      },
      querySuite(value){
        this.fetching = true;
        this.$axios({
          url:`demo-service/api/testsuite`,
          method:'get',
          params:{'search':value}

        }).then(res =>{
          if (res.data.success ==true && res.data.code ==200 ){

            let newData=res.data.data.map(item => (
              {
                id: item.id,
                value: item.suite_name,
                }
          ));
          this.data =newData;
          this.fetching = false;
          }else{
            this.$message.error(JSON.stringify(res.data.msg))
          }


        }).catch(err=>{
          console.log(err)
        })

        // let newData = [{id:1,value:"hello"},{id:2,value:'h2'}]
     
        // this.data = newData


      }



    },

    created () {
      
    }



  }


</script>

<style>


</style>