<template>
    
    <a-card title="新增用户" :bordered="false" style="width: 100%">
    
    <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{span:10}">
        <a-form-model-item has-feedback label="name" prop="name">
          <a-input v-model="ruleForm.name" type="user" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="password" prop="password">
            <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
          </a-form-model-item>
        <a-form-model-item has-feedback label="email" prop="email">
          <a-input v-model="ruleForm.email" type="email" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item has-feedback label="phonenumber" prop="phonenumber">
          <a-input v-model.number="ruleForm.phonenumber" type="phonenumber" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="addUserEvent('ruleForm')">confirm</a-button>
          <a-button style="margin-left: 10px"  @click="cancle">
            cancle
          </a-button>
        </a-form-model-item>
      </a-form-model>

    </a-card>

   
</template>

<script>

    export default {

        data () {
            let validateemail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the email again'));
                } else if (value !== this.ruleForm.email) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
                };
            let validatename=(rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('Please input the name again'));
                } else if (value !== this.ruleForm.name) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
                };
            let validatepwd=(rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('Please input the name again'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
            }

            let validatephonenumber=(rule,value,callback)=>{
                if (value === '') {
                    callback(new Error('Please input the phonenumber again'));
                } else if (value !== this.ruleForm.phonenumber) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
            }
            

            //
            return {
                ruleForm: {
                        name: '',
                        password:'',
                        email: '',
                        phonenumber: '',
                    },
                    rules: {
                    name: [{ validator: validatename, trigger: 'change' }],
                    password:[{validator:validatepwd,trigger:'change'}],
                    email: [{ validator: validateemail, trigger: 'change' }],
                    phonenumber: [{ validator: validatephonenumber, trigger: 'change' }],
                },

            }
        },

        methods: {
            addUserEvent(){
                this.$message.success("register success!")
                this.$router.push('login')
            },
            cancle(){

                this.$router.push('/login')
            }
        }
    }
    
</script>



<style lang="less" scoped>


</style>

