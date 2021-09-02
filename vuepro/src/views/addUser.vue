<template>
    
    <a-card title="新增用户" :bordered="false" style="width: 100%">
    
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
        <a-form-item has-feedback label="邮箱" prop="email" >
          <a-input type="email" autocomplete="off" placeholder="邮箱"
          v-decorator="[
          'email',
          { rules: [
              { required: true, message: 'Please input your email !' },
              {max:50,message:'max limit of email is 50'}

          ] },
        ]"
          >
            <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item has-feedback label="手机号" prop="phonenumber" >
          <a-input type="phonenumber"  placeholder="手机号"
          v-decorator="[
          'mobile',
          { rules: [
              { required: true, message: 'Please input your phonenumber !' },
              {max:20,message:'max limit of phonenumber is 20 '}

          ] },
        ]"
          >
            <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
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
    export default {

        data () {
            return {
                form: this.$form.createForm(this, { name: 'userinfo' }),
            }
        },

        methods: {

            async registUserInfo(values){
               let {data} =  await api.post('demo-service/api/regist/',values)
               return data 
            },

            handleSubmit(e){
                e.preventDefault();
                this.form.validateFields(async (err, values) => {
                        if (!err) {
                        let res = await this.registUserInfo(values);
                       if (res.code ==200 ){
                           this.$message.success("注册成功!")
                           this.$router.push({
                              name:"login"
                           })
                       }else{
                           var msgArray= [];
                           var dict = res.data;
                           for (var key in dict){
                                msgArray =msgArray.concat(Array.from(dict[key]))
                           }
                           var msg = msgArray.join(",")
                           this.$message.error(msg);
                       }
                        }
                });

            },
            cancle(){

                this.$router.push('/login')
            }
        }
    }
    
</script>



<style lang="less" scoped>


</style>

