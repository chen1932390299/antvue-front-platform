<template>
    <div class="login-home">
        
        <a-form
        name="loginform"
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >

        <a-form-item>
          <h1>测试管理lab</h1>
        </a-form-item>
        <a-form-item>
          <a-input
     
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: 'Please input your username!' }] },
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
           
            v-decorator="[
              'password',
              { rules: [{ required: true, message: 'Please input your Password!' }] },
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            Remember me
          </a-checkbox>
          <a class="login-form-forgot" href="">
            <router-link to="/recallpassword">Forgot password</router-link>
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button">
            Login
          </a-button>
         
          <a href="">
           <router-link to="/adduser"> register now!</router-link>
          </a>
        </a-form-item>
 
      </a-form>
      
    </div>

  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  import Cookies from 'js-cookie'
  export default {
    data(){
  return{
  
  }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
      ...mapMutations(['changeLogin']),
      
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            let data={
              username:values.userName,
              password:values.password,
            };

            this.$axios(
                {
                    url: '/demo-service/api/login/',
                    method: 'post',
                    data: data,
                    // headers:{'Content-Type': 'application/json;charset=UTF-8'},
                    xsrfCookieName: 'csrftoken',
                    xsrfHeaderName: 'X-CSRFToken',

                }

              ).then(res => {
                if(res.data.code==200){
                  this.$message.success('login success!');
                  let ticket =res.data.data.token
                 
                  // window.sessionStorage.setItem('token', ticket)
                  //this.$cookies.set('token', ticket,60*5) 
                 
                  let expires =new Date(new Date().getTime() + 1* 1 * 60 * 1000);
                  //Cookies.set('token', ticket, { expires: expires });
                  this.$router.push({path:'index'})
                }else{
                  this.$message.error("登陆失败，用户名or密码错误")
                }
                }
              )
              .catch(
              (error)=> {
                this.$message.error(error.message)
              }
              )
          }
        });
      },
    },
  };

  </script>
  <style lang='less' scoped>
  /* #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  } 
  #components-form-demo-normal-login .login-form-button {
    width:20%;
  } */
  .login-home{
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
 
  }

    div /deep/ .ant-form{
        margin-top:250px;
        margin-right: 200px;
        height: 200px;
        width:500px ;
        float: right;

  }
  div /deep/ .ant-input{
      /* width: 80%; */

    height: 40px;
            
        }
    div /deep/ .login-form-forgot{
        float: right;
    }
    div /deep/ .login-form-button{
        width: 50%;
    }

        
  </style>