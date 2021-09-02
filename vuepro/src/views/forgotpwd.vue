<template>
    


    <a-card title="找回密码" :bordered="false" style="width: 100%">
        <a-button  @click="goback">
            <a-icon type="left" />backward
          </a-button>
        <a-empty description="Please contact with admin , thanks!!!"  style="margin-top: 20px; font-size: larger;" />
    
        </a-card>

</template>

<script>
    export default{
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
            return {
                ruleForm: {
                        email: '',
                   
                    },
                    rules: {
                    email: [{ validator: validateemail, trigger: 'change' }],
                    
                },
                
            }
        },

        methods: {
            submitInfo(){
                this.$message.success("验证码已发送至邮箱！")
            },
            goback(){
                this.$router.push("/login")
            }
        }
    }

</script>


<style  lang="less"  scoped >


</style>