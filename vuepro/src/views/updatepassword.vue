<template>
    
    <a-card title="新增用户" :bordered="false" style="width: 100%">
    
        <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{span:10}">
            <a-form-model-item has-feedback label="name" prop="name">
              <a-input v-model="ruleForm.name" type="user" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="password" prop="password">
                <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
              </a-form-model-item>
            <a-form-model-item has-feedback label="newpassword" prop="newpassword">
              <a-input v-model="ruleForm.newpassword" type="password" autocomplete="off" />
            </a-form-model-item>

            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="changePassword('ruleForm')">confirm</a-button>
              <a-button style="margin-left: 10px"  @click="cancle">
                cancle
              </a-button>
            </a-form-model-item>
          </a-form-model>
    
        </a-card>
</template>

<script>
    export default{

        data () {

            let validatename=(rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('Please input the name again'));
                } else if (value !== this.ruleForm.name) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
                };
            let validatenewpassword=(rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value == this.ruleForm.password) {
                    callback(new Error("newpassword can't same with old password "));
                } else {
                    callback();
                }
            };
            let validatepwd=(rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
            };

            return {
                ruleForm: {
                        name: '',
                        password:'',
                        newpassword: '',
                
                    },
                    rules: {
                    name: [{ validator: validatename, trigger: 'change' }],
                    password:[{validator:validatepwd,trigger:'change'}],
                    newpassword: [{ validator: validatenewpassword, trigger: 'change' }],
                   

            }
                

            }
        },

        methods: {
            changePassword(){

                this.$message.success("change password success !")
            },
            cancle(){
                this.$router.push('/index')

            }

        }
    }
    
</script>

<style lang="less" scoped>


</style>