<template>
    
    <a-card title="新增角色" :bordered="true" style="width: 100%">

        <a-form  :form="form" 
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
          @submit="handleSubmit">

            <a-form-item    label="角色名称">
                <a-input
                v-decorator="[
                  'role_name',
                  { rules: [
                    { required: true, message: 'Please input your role name' },
                    { max: 10, message: 'max length  limit 10' }
                  ] },
                ]"
                placeholder="Please input your role  name"
              />
            </a-form-item>
            <a-form-item label="角色类型" has-feedback>
                <a-select
                v-decorator="[
                  'role_type',
                  { rules: [{ required: true, message: 'Please select your role_type' }] },
                ]"
                placeholder="Please select a role type"
              >
                <a-select-option value="0">
                  普通用户
                </a-select-option>
                <a-select-option value="1">
                 管理员
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="启用/禁用">
            <a-switch v-decorator="[
            'status', 
            { 
            valuePropName: 'checked' , 
            initialValue: false
        }
                ]" />
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
            
                <a-button type="primary" @click="handleSubmit">
                    submit
                  </a-button>
                  <a-button style="margin-left: 30px;" @click="cancle">
                    Cancel
                  </a-button>
               
              </a-form-item>
        </a-form>


    </a-card>
</template>

<script>

 export default {

       data () {
           return {
               data:[],
               formItemLayout : {
                labelCol: { span: 3 },
                wrapperCol: { span: 14},
                },
               form: this.$form.createForm(this, { name: 'addRole' }),
           }
       },

        methods:{
          handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if (values.status){
                            values.status = '1'
                        }else{
                            values.status='0'
                        }
                        this.$axios({
                            url:"demo-service/api/role/info",
                            method:"post",
                            data:values
                        }).then(res=>{
                            let  data = res.data.data;
                            let newData = [] ;
                            if (res.status==200 && res.data.success == true){
                                for (let item in data ){
                                    newData.push(
                                        {
                                            ...values
                                        }
                                    )
                                }
                            }
                            this.$message.success("submit success!!!")
                            this.$router.push(
                                {'name':"user-list"}
                            )
                        }).catch(err =>{
                            console.log(err)
                        })
                    }
                }); 
            },
            // cancle click 

            cancle(){
                this.$router.push({
                    "name":"user-list"
                })
            }
        },
        created () {

        },


        

    
}
    
</script>

<style lang="less" scoped>

.submit-btn{
float: right;
margin-right: 20px;
}
</style>