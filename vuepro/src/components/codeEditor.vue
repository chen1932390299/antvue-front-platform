<template>
  
    <codemirror
            class="code-dec"
            ref="jsonEditor"
            v-model="jsondata"
            :options="options"
            style="height: 600px;"
            @input="changeCode"
          />
  
  
  </template>
  
  <script>
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript' 
    import 'codemirror/addon/selection/active-line' 
    import 'codemirror/keymap/sublime' 
    import 'codemirror/mode/css/css'
    import 'codemirror/theme/monokai.css' 
    import 'codemirror/addon/lint/lint'
    import 'codemirror/addon/lint/lint.css'
    import 'codemirror/addon/lint/json-lint'
    import 'codemirror/addon/display/autorefresh'
  
  
    export default{
      props:{
        codedata:{
          type:String,
          required:true,
          default:'{}'
        }
      },
      components: {
        codemirror
      } ,
      data () {
        return {
         jsondata:this.codedata,
          options:{
            tabSize: 4,
            mode: 'application/json',
            theme: 'base16-dark',
            lineNumbers: true,
            line: true,
            lint: true,
            gutters: ['CodeMirror-lint-markers', 'CodeMirror-foldgutter'],
          }
        }
      },

      methods: {
        
        getCodeValue(){
          let  codedata =  this.$refs.jsonEditor.codemirror
          console.log(codedata)
        },
        changeCode(newdata){
          this.jsondata=newdata
          console.log(this.jsondata)
          // 子传消息告诉父亲，执行方法和参数
          this.$emit('changeparent',newdata);
        }
      },

  
    }
  
  
  </script>

  <style lang="less" scoped>
    * /deep/ .code-dec  { touch-action: none; }
  </style>

