<template>
    <a-card class="trigger"  title="套件定时任务">            
                    <a-button type="primary" class="new-case btn-operate" @click="addScheduler">
                        <a-icon type="plus" />New Scheduler
                      </a-button>
                    <a-table 
                    :columns="columns" 
                    :scroll="{ x: 1000}"
                    :data-source="data" 
                    rowKey="id"
                    :pagination="false"
                    class="tigger-list"
                    >
                    
                    <span slot="enable" slot-scope="text, record,index">
                        <a-switch 
                        :checked = "record.enable"
                         @change="e=>enableSwitch(e,record)" />
                      </span>

                    <span slot="scheduler" slot-scope="text, record,index">
                        {{trigger_enum[text]}}
                    </span>

                    <template slot="operation" slot-scope="text, record,index">
      
                        <a-icon type="edit" theme="twoTone"  two-tone-color="#2E64FE" @click="editChange(index,record)"></a-icon>
                        
                        <a-divider type="vertical" />
                        <a-popconfirm
                          v-if="data.length"
                          title="Sure to delete?"
                          @confirm="() => onDelete(record)"
                        >
                        <a-icon type="delete" theme="twoTone"  two-tone-color="#eb2f96"/>
                        </a-popconfirm>
                      </template>
                    </a-table>
                    <a-modal
                    v-model="visible"  
                    :destroyOnClose="true"
                    title="添加定时任务"
                    @ok="handleOk" 
                    width="60%"
                    >

                    <a-form :form="form">
                        <a-form-item label="taskName"> 
                            <a-input
                            class="item-name"
                            v-decorator="['taskName', { rules: [{ required: true, message: 'Please input your Variable Name!' }] }]"
                            ></a-input>
                        </a-form-item>

                        <a-form-item label="定时执行的套件集合">
                            <a-select
                            v-decorator="[
                            'suite_ids',
                            {
                              rules: [
                                { required: true, message: 'Please select your suite name', type: 'array' },
                              ],
                            },
                          ]"
                            mode="multiple"
                            :label-in-value="true"
                        
                            placeholder="输入套件名称"
                            style="width: 100%"
                            :filter-option="false"
                            :not-found-content="fetching ? undefined : null"
                            :showArrow="true"
                            @search="querySuite"
                            @change="handleChange"
                          >
                            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                            <a-select-option v-for="d in data_suite" :key="d.id" :value="d.id">
                              {{d.value}}
                            </a-select-option>
                          </a-select>
                          </a-form-item>

                        <a-form-item label="schedluer" has-feedback  class="item-form">
                            <a-select 
                            ref="scheduletype"
                            id="scheduletype"
                            @change="changeType"
                            v-decorator="[
                            'scheduler',
                            { rules: [{ required: true, message: 'Please select your scheduler type!' }] },
                          ]"
                            >
                                <a-select-option value="1">
                                  Date
                                </a-select-option>
                                <a-select-option value="2">
                                 Interval
                                </a-select-option>
                                <a-select-option value="3">
                                  Cron
                                </a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item label="scheduler time">
                            <a-date-picker 
                            v-if=" scheduletype == '1' "
                            v-decorator="['scheduletime', config]"
                            show-time
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择定时执行时间"
                          />
                          <a-input-number 
                          class='item-form'
                          placeholder="请输入执行间隔时间,单位second"
                          :min="1" :max="15552000"
                          v-if=" scheduletype == '2' "
                          v-decorator="[
                          'scheduletime',
                          { rules: [{ required: true, message: 'number must 1-15552000',validator:validateTime}] },
                          ]"
                         />
                         <a-input
                         class="item-form"
                         placeholder="请输入cron 表达式例如：*/5"
                          v-if="scheduletype =='3' "
                         v-decorator="[
                         'scheduletime',
                         { rules: [{ required: true, message: '请输入cron 表达式,长度至少为1,最多50',max:50}] },
                         ]"
                         >

                         </a-input>

                        </a-form-item>
                        <a-form-item label="启用/禁用">
                            
                                <a-switch
                                :default-checked="false"
                                v-decorator="[
                                'enable'
                                ]"
                                 />
                              
                        </a-form-item>

                    
                    </a-form>

                    </a-modal>
                 
            
    </a-card>
</template>

<script>
  const validateTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("seconds不能为空"));
  } else {
    if ( value >=1 && value <= 15552000) {
      callback();
    } else {
      return callback(new Error('seconds must between 1-1000'))
    }
  }
};

    const columns = [
    {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width:80,
    },
    {
    title: 'Task Name',
    dataIndex: 'taskName',
    key: 'taskName',
    width:200,
    ellipsis:true,
    },
    {
    title: 'schedule args',
    dataIndex: 'suite_ids',
    key: 'suite_ids',
    width:200,
    ellipsis:true,
    },
    {
    title: 'Schedule Time',
    dataIndex: 'scheduletime',
    key: 'scheduletime',
    width:200,
    },
    {
    title: 'Scheduler Type',
    dataIndex: 'scheduler',
    key: 'scheduler',
    width:200,
    scopedSlots: { customRender: 'scheduler' },
    },
    {
    title: 'Create Time',
    dataIndex: 'create_time',
    key: 'create_time',
    width:200
    },
    {
    title: 'Update Time',
    dataIndex: 'update_time',
    key: 'update_time',
    width:200
    },
    {
    title: 'enable',
    dataIndex: 'enable',
    key: 'enable',
    width:200,
    scopedSlots: { customRender: 'enable' },
    },
    {
    title: 'operation',
    key: 'operation',
    width:100,
    scopedSlots: { customRender: 'operation' },

  },
    
];
    export default {

    data () {
            return {
                data_suite:[],
                value: [],
                fetching: false,
                suite_ids:[],
                trigger_enum:{
                '1':'按日期调度',
                '2':'按时间间隔调度(秒)',
                '3':'按cron调度'
                },
                data:[
                ],
                columns,
                visible:false,
                config: {
                    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                },
               scheduletype:'1',
               validateTime,
               page_param:{
                page_size: 10,
                page: 1,
              },
              total:10
            }
        },
      methods: {

    handleChange(value){
        Object.assign(this, {
        value,
        data_suite: [],
        fetching: false,
      });
      let item_ids =[]
      for (let item of this.value){
        item_ids.push(item.key)
      }
      this.suite_ids = item_ids
      console.log(this.suite_ids)
      },
      // get serach 
      querySuite(value){
        this.fetching = true;
        this.$axios({
          url:`demo-service/api/testsuite`,
          method:'get',
          params:{'search':value}

        }).then(res =>{
          if (res.data.success ==true && res.data.code ==200 ){

            let newData=res.data.data.map(item => (
              {
                id: item.id,
                value: item.suite_name,
                }
          ));
          this.data_suite =newData;
          this.fetching = false;
          }else{
            this.$message.error(JSON.stringify(res.data.msg))
          }


        }).catch(err=>{
          console.log(err)
        })


      },

        // change schduetype
        changeType(value){
            this.scheduletype =value
        },
        editChange(index,record){

        },
        onDelete(record){

            this.$axios( 
                {
                    url: `demo-service/api/schedule/${record.id}`,
                    method: 'delete',
                }).then(res=>{
                    console.log(res.data.success)
                    if(res.data.success === true){
                      this.$message.success('删除成功！')
                      this.getScheduleList()
                    }else{
                      console.log("进入失败")
                      this.$message.error('删除失败！');
                    }
                }).catch(
                  res=>{ this.$message.error('删除失败！'+record.id);}
                )

        },
        addScheduler(){
            this.visible=true

        },
        enableSwitch(value,record){
            // console.log(`a-switch to ${value}`);
            record.enable = value
            // console.log(record)
            this.$axios({
                url:`demo-service/api/schedule/${record.id}`,
                method:'patch',
                data:{  
                    schedule_type: record.scheduler,
                    schedule_args:JSON.parse(record.suite_ids),
                    schedule_time: record.scheduletime,
                    enable:record.enable,
                    schedule_name: record.taskName
                }


            }).then(res => {
                if (res.data.success == true &&  res.data.code == 200){
                    this.$message.success("修改成功！")
                    this.getScheduleList()
                }else{
                    this.$message.error(JSON.stringify(res.data.msg))
                }

            }).catch(err=>{
                console.log(err)
            })

        },
        handleOk(e){
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (err) {
                return;
                }
                let schedule_param=''
                if (this.scheduletype == '1'){
                    schedule_param = {
                        ...values,
                        'scheduletime': values['scheduletime'].format('YYYY-MM-DD HH:mm:ss'),
                    }
                    // console.log('Received values of form: ', schedule_param);
                }else{
                    schedule_param = values
                }
                console.log(schedule_param.enable)
                console.log('Received values of form: ', schedule_param);

                this.$axios({
                    url:`demo-service/api/schedule`,
                    method:'post',
                    data:{  schedule_type: schedule_param.scheduler,
                            schedule_args:this.suite_ids,
                            schedule_time: schedule_param.scheduletime,
                            enable: schedule_param.enable == undefined ?false:schedule_param.enable,
                            schedule_name: schedule_param.taskName
                        }

                }).then(res =>{
                    if (res.data.success == true  && res.data.code == 200){
                        this.$message.success("create successs！")
                        this.getScheduleList();
                    }else {

                    }
                }).catch(err =>{
                    console.log(err)
                })
                this.visible=false

            }
        
            ) 
        },
      getScheduleList(){

        this.$axios({
            url:`demo-service/api/schedule`,
            method:'get',
            params:{...this.page_parm}
        }).then(res => {
            if (res.data.success == true && res.data.code == 200 ){
                    let newData=[]
                    for (let item of res.data.data){
                        newData.push({
                            id: item.id,
                            taskName:item.schedule_name,
                            suite_ids:JSON.stringify(item.schedule_args),
                            scheduler:item.schedule_type,
                            scheduletime: item.schedule_time,
                            enable:item.enable,
                            create_time:item.create_time,
                            update_time:item.update_time
                        })
                    }
                    this.data =newData
                    console.log(this.data)
                   

            }else{
               this.$message.error(JSON.stringify(res.data.msg))
            }

        }).catch(err =>{
            console.log(err)
        })
      }
      },
      beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'scheduleform' });
        

        },
        created () {
            this.getScheduleList();
        }
    };
    </script>

<style>
.trigger{

    width:"100%";
}
.item-form{
    width: 300px;
}
.item-name{
    width: 500px;
}

</style>