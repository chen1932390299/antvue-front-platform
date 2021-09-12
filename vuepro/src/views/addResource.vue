

<template>
   <a-card  title="新增资源配置">
            <a-form  :form="form" :label-col="{ span: 4 }" :wrapper-col="{span:10}"  @submit="submit">

                <a-form-item label="资源名称">

                    <a-input 
                    v-decorator="[
                    'name',
                    { rules: [
                      { required: true, message: 'Please input your resource  name' },
                      { max: 50, message: 'max length  limit 50' }
                    ] },
                  ]"
                  placeholder="Please input your resource name  "
                    ></a-input>
                </a-form-item >
                <a-form-item label="资源地址">

                    <a-input 
                    v-decorator="[
                    'path',
                    { rules: [
                      { required: true, message: 'Please input your role name' },
                      { max: 100, message: 'max length  limit 100' }
                    ] },
                  ]"
                  placeholder="Please input your path "
                     ></a-input>
                </a-form-item >
                
                <a-form-item  label="方法">
                    <a-select
                    v-decorator="[
                    'method',
                    { rules: [{ required: true, message: 'Please select your method ' }] },
                  ]"
                  placeholder="Please select a role type"
                    >
                        <a-select-option value="GET">
                            GET
                        </a-select-option>
                        <a-select-option value="POST">
                        POST
                        </a-select-option>
                        <a-select-option value="DELETE">
                            DELETE
                        </a-select-option>
                        <a-select-option value="PUT">
                           PUT
                        </a-select-option>
                        <a-select-option value="PATCH">
                            PATCH
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 12, offset: 18 }">
                    <a-button type="primary" html-type="submit" style="margin-top: 80px;">
                        save
                    </a-button>
                    <a-button  style="margin-left: 40px;" @click="cancle">
                    cancle 
                    </a-button>
                </a-form-item>
            </a-form>
   </a-card>
</template>

<script>
    export default{

        data () {
            return {
            }
        },
        methods: {
            submit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                if (!err) {
                        console.log(values);
                        this.$message.success(JSON.stringify(values));
                    }
                })
            },
            cancle(){

                this.$router.push({
                    name:'menu-resource'
                }
                )
            }

        },

        beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'resource-form' });
        },
        
    }
</script>