<template>
    <div>
    <div id="monaco-editor"></div>
    </div>
</template>
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
import 'monaco-editor/esm/vs/editor/contrib/format/formatActions';
export default {
    props:{
        value:{
            type: Array,
            default: []
        }
    },
    data(){
        return {
            monacoInstance: null
        }
    },
    mounted: function(){
        const self = this;
        const value = this.value;
        const monacoInstance = monaco.editor.create(document.getElementById("monaco-editor"),{
            value:`${JSON.stringify(value)}`,
            language: "json"
        });
        monacoInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function(){
            console.log('saved')
            const value = monacoInstance.getValue();
            self.updateValue(JSON.parse(value));
        });
        setTimeout(()=>{
            monacoInstance.getAction('editor.action.formatDocument').run();
        },500)
        this.monacoInstance = monacoInstance;
    },
    methods:{
        updateValue: function(value){
            console.log(value);
            this.$emit('updateValue',value);
        }
    },
    beforeDestroy: function(){
        this.monacoInstance.dispose();
    }
}
</script>
<style>
#monaco-editor{
    height: 500px;
    border: 1px solid #ccc;
}
</style>