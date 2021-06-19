<template>
    
    <a-card title="新增角色" :bordered="true" style="width: 100%">

        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules">
            <a-form-model-item has-feedback label="角色名称" prop="roleName"  :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }" >
              <a-input v-model="ruleForm.roleName" type="text" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="成员" prop="member"   :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }"  >
             
            <a-select mode="tags" style="width: 100%" :token-separators="[',']"
             @change="selectMember"
             v-model="ruleForm.member" 
             >   
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                  {{ (i + 9).toString(36) + i }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item has-feedback label="权限" prop="resource"    :label-col="{ span: 4 }" :wrapper-col="{ span: 10 }"  >
                <a-checkbox-group v-model="ruleForm.resource" :options="plainOptions" @change="onChange" />
            </a-form-model-item>

            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="submitForm(ruleForm)">
                confirm
              </a-button>
              <a-button style="margin-left: 10px" @click="cancleRoleadd">
               cancle
              </a-button>
            </a-form-model-item>
          </a-form-model>


    </a-card>
</template>

<script>

const plainOptions = ['新增用户', '修改用户', '新增1','新增2', '修改1',
 '新增3','新增4','新增5'];
const defaultCheckedList = ['新增用户'];

 export default {
        data(){
            let validateresource = (rule, value, callback) => {
            
                if (!value) {
                    return callback(new Error('Please input the age'));
                };
            };

            let validateroleName= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    if (this.ruleForm.roleName !== '') {
                    this.$refs.ruleForm.validateField('roleName');
                    }
                    callback();  
                }
                };

            let validatemember = (rule, value, callback) => {
            if (value === ''|| value == ''|| value==true) {
                callback(new Error('Please input the password again'));
            } else if (value !== this.ruleForm.member) {
                callback(new Error("Two inputs don't match!"));
            } else {
                callback();
            }
            };

             // return    
            return {
                allowClear:true,
                ruleForm: {
                    roleName: '',
                    member: [],
                    resource: [],
                },
                // resource
                checkedList: defaultCheckedList,
                indeterminate: true,
                checkAll: false,
                plainOptions,
                noCheck:false,
                // rules
                rules: {
                    roleName: [{ validator: validateroleName, trigger: 'change' }],
                    member: [{ validator: validatemember, trigger: 'change' }],
                    // resource: [{ validator: validateresource, trigger: 'change' }],
                },

                // css
            }
        },
        
        methods:{
            submitForm(ruleForm){
                let formdata={
                    roleName:ruleForm.roleName,
                    member:ruleForm.member,
                    resource:ruleForm.resource
                }
                console.log(formdata);
            },
            selectMember(value){
                this.member=value
                
            },
            cancleRoleadd(){

                this.$router.push("/roles")
            },

            // checkboxed

            onChange(checkedList) {
            this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
            console.log(this.indeterminate);
            this.checkAll = checkedList.length === plainOptions.length;
           
            },


        },  // method end 

        created () {
            this.$nextTick(()=>{
                this.$refs["ruleForm" ].resetFields();
            })

        },


        

    
}
    
</script>

<style lang="less" scoped>


</style>