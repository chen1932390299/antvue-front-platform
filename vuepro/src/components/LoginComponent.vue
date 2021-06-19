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
            Log in
          </a-button>
          Or
          <a href="">
           <router-link to="/adduser"> register now!</router-link>
          </a>
        </a-form-item>
      </a-form>
    </div>

  </template>
  
  <script>
  export default {
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
      // submit method 
      handleSubmit(e) {
        e.preventDefault();
        // var formvalue=document.loginform;
        // console.log(formvalue.userName.value+"\n"+formvalue.password.value)
        this.form.validateFields((err, values) => {
          if (!err) {
            let data={
              name:values.userName,
              price:values.password,
              publish:1
            };

            this.$axios(
              
                {
                    url: '/demo-service/api/v1/book/',
                    method: 'post',
                    data: data,
                    // headers:{'Content-Type': 'application/json;charset=UTF-8'},
                    xsrfCookieName: 'csrftoken',
                    xsrfHeaderName: 'X-CSRFToken',
                }

              ).then(res => {
                console.log(res.data);
                if(res.data.code==200){
                  this.$message.success('真牛逼,已经登陆成功了');
                  // console.log(this.$route);
                  this.$router.push({path:'home'})
                }else{
                  this.$message.error("登陆失败，用户名or密码错误")
                }
                }
              )
              .catch(
              (error)=> {
                console.log(error);
                this.$message.error("token失效，请重新登陆")
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