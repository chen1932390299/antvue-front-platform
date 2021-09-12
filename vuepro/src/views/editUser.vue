<!DOCTYPE html>
<template>
    
    <a-card title="修改密码" :bordered="false" style="width: 100%">
    
        <a-form  :form="form" :label-col="{ span: 4 }" :wrapper-col="{span:5}"  @submit="handleSubmit">
            <a-form-item has-feedback label="用户名" >
              <a-input  type="user" autocomplete="off" placeholder="用户名"
              v-decorator="[
              'username',
              { rules: [
                { required: true, message: 'Please input your username!' },
                {max:32,message:'max limit of username is 32 '}
              ] },
            ]"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item has-feedback label="密码" prop="password" >
                <a-input  type="password" autocomplete="off" placeholder="密码"
                v-decorator="[
                'password',
                { rules: [
                    { required: true, message: 'Please input your password!' },
                    {max:20,message:'max limit of password is 20 '}
    
                ] },
              ]"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
            
              <a-form-item has-feedback label="新密码" prop="newpassword" >
                <a-input  type="password" autocomplete="off" placeholder="新密码"
                v-decorator="[
                'new_password',
                { rules: [
                    { required: true, message: 'Please input your newpassword!' },
                    {max:20,message:'max limit of newpassword is 20 '}
    
                ] },
              ]"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>
              </a-form-item>
    

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary"  html-type="submit" >submit</a-button>
              <a-button style="margin-left: 10px"  @click="cancle">
                cancle
              </a-button>
            </a-form-item>
          </a-form>
    
    </a-card>
</template>

<script>
    import {api} from '@/common/api.js'
    export default{

        data () {

            return {
                form: this.$form.createForm(this, { name: 'updateInfo' })        

            }
        },

        methods: {

            async UpdateUserInfo(value){
                let {data} = await api.patch('demo-service/api/userInfo/',value)
                return data 
            },
            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields(async (err, values) => {
                        if (!err) {
                        let res = await this.UpdateUserInfo(values);
                       if (res.code ==200 ){
                           this.$message.success("修改密码成功!")
                           this.$router.push({
                              name:"login"
                           })
                       }else{
                        let msg = res.msg;
                        this.$message.error(msg);
                       }
                        }
                });

            },
            cancle(){
                this.$router.push('/index')

            }

        }
    }
    
</script>

<style lang="less" scoped>


</style>