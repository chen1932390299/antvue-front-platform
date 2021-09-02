<template>
  
  <code-editor :codedata="data" @changeparent="changeValue"></code-editor>



</template>

<script>

  import codeEditor from "@/components/codeEditor"

  export default{
    components: {
      codeEditor
    } ,
    data () {
      return {
        data:'{"11":222}'
      }
    },
    methods: {
      changeValue(value){
        this.codedata= value
        console.log(`父组件值: ${this.codedata}`)
      }

    },
    created () {
      
      this.data =JSON.stringify({"a1":111111})
     }

  }


</script>