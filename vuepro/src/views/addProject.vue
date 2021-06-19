

<template>
    <a-card  class="add-project" title="新增项目">

        <a-form :form="form">

            <a-form-item  label="项目名称" :form="form" >
                <a-input
                v-decorator="['project_name', { rules: [{ required: true, message: 'Please input your project name !' }] }]"
              />

            </a-form-item>
            <a-form-item class="opt">
                <a-button type="primary" html-type="submit" @click="handleSubmit">
                  Submit
                </a-button>
                <a-button class="cancle" @click="cancle">Cancle</a-button>
              </a-form-item>
        </a-form>


    </a-card>
</template>


<style>
.add-project{
    width:"100%";
}
.cancle{
    margin-left: 25px;
}
.opt{
    float: right;
    margin-right: 40px;
}

</style>


<script>
    export default{


        data () {
            return {
                data:[],
                form: this.$form.createForm(this, { name: 'projectform' }),

            }
        },

        methods: {
            handleSubmit(e) {
                        e.preventDefault();
                        this.form.validateFields((err, values) => {
                            if (!err) {
                            this.$axios({
                                url: `demo-service/api/projects`,
                                method:'post',
                                data:values

                            }).then(res =>{
                                    if (res.data.code ==200 &&  res.data.success ==true ){

                                        this.$message.success("create success!!!")
                                        this.$router.push({'name':'projects'})
                                    }else {
                                        this.$message.error(JSON.stringify(res.data.msg))
                                    }
                                    
                            }).catch(err =>{
                                console.log(err)
                            })
                            }
                        });
            },
            cancle(){
                this.$router.push({'name':'projects'})
            }

        },
        beforeCreate () {
            
        }
    }


</script>