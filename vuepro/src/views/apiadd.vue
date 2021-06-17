<template>

    <a-card  title="新增接口" :bordered="true" class="create-card">



     <a-form  :form="baseform">

        <a-form-item label="测试用例名称">
            <a-input
            style="width: 60%"
              v-decorator="['casename', { rules: [{ required: true, message: 'Please input your casename!' }] }]"
            />
        </a-form-item>

        <a-form-item label="项目名称">
            <a-select
            v-decorator="[
            'project_id',
            {
              rules: [
                { required: true, message: 'Please select your project name'},
              ],
            },
          ]"
            placeholder="输入项目名称"
            style="width: 100%"
            show-search
            label-in-value
          
            :showArrow="true"
            :filter-option="false"
            :not-found-content="fetching ? undefined : null"
        
            @search="queryProject"
            @change="e=>changeQueryProject(e)"
          >
            <a-select-option v-for="d in data_project" :key="d.id" :value="d.id">
              {{d.value}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="请求方法和地址">
            <a-input 
            style="width:60%" 
            v-decorator="['baseUrl', { rules: [{ required: true, message: 'Please input your baseUrl!' }] }]"
            placeholder="请求地址"
             @change="e => baseUrlChange(e.target.value)"
            >
                <a-select slot="addonBefore" 
                style="width: 90px" 
                v-decorator="['method', { rules: [{ required: true, message: 'Please select your method!' }] }]"
                @change="methodChange">
                    <a-select-option value="GET">
                    GET
                    </a-select-option>
                    <a-select-option value="POST">
                    POST
                    </a-select-option>
                    <a-select-option value="PUT">
                        PUT
                    </a-select-option>
                    <a-select-option value="PATCH">
                        PATCH
                    </a-select-option>
                    <a-select-option value="DELETE">
                        DELETE
                    </a-select-option>
      
                </a-select>
            </a-input>
            <a-button type="primary" @click="sendRequest" class="send-btn">
                Debug
                </a-button>
          </a-form-item>

          <div>
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="Param">
                    <a-card title="Query Params" 
                    :bordered="true" 
                    style="width: 60% ; margin-top: 10px;margin-bottom: 10px;"
                    >
                        <div>
                          <a-form ref="paramsForm" layout="inline" :form="paramsForm" 
                          >
                                <div v-for="(item, index) in paramsForm.parameter" :key="index">
                                    <a-form-item
                                    label="key"
                                    :prop="'parameter.' + index + '.key'"
                                    :label-col="layouts.paramlayout.labelCol"
                                    :wrapper-col="layouts.paramlayout.wrapperCol"
                                    >
                                        <a-input v-model="item.key"  class="input-line" @change="paramKeyChange"></a-input>
                                    </a-form-item>
                                    <a-form-item
                                    label="value"
                                    :prop="'parameter.' + index + '.value'"
                                    :label-col="layouts.paramlayout.labelCol"
                                    :wrapper-col="layouts.paramlayout.wrapperCol"
                                    >
                                        <a-input v-model="item.value"  class="input-line" @change="paramValueChange"></a-input>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-icon v-if="index >= 0" @click="deleteItem(item, index)"  class="dynamic-delete-button"
                                            type="minus-circle-o"></a-icon>
                                    </a-form-item>
                                </div>
                                <a-form-item>               
                                        <a-button type="dashed"  @click="addItem" dislay:flex style="margin-left: 200px;" >
                                        <a-icon type="plus" /> Add field
                                        </a-button>
                                </a-form-item>
                          </a-form>
                        </div>
                      </a-card>
                </a-tab-pane>

                <a-tab-pane key="2" tab="Header">
                                <b-code-editor 
                                :value="headerform.header.headerValue"
                                :auto-format="true" 
                                :smart-indent="true"
                                theme="xq-light" 
                                :indent-unit="2"
                                :line-wrap="false"  
                                :readonly="false" 
                                :show-number="false"  
                                @on-change="changeHeader"
                                class="header-style"
                                >
                                </b-code-editor>
                </a-tab-pane>
                <a-tab-pane key="3" tab="Body">
       
                        <a-radio-group 
                        name="radioGroup" 
                        @change="bodyChange"
                        :default-value="1"
                        >
                        <a-radio :value="1">
                            none
                        </a-radio>
                        <a-radio :value="2">
                            form-data
                        </a-radio>
                        <a-radio :value="3">
                            x-www-form-urlencoded
                        </a-radio>
                        <a-radio :value="4">
                            application/json
                        </a-radio>
                        </a-radio-group>

                        <div  v-if=" body.bodytype == '1' ">
                            <div style="width: 100%; height: 370px;"></div>
                        </div>
                        <div v-else-if=" body.bodytype == '2' ">

                            <a-card class="formdata-card">
                                <div class="formdata-class">
                                  <div>
                                    <a-table :columns="columns" :data-source="body.formData" bordered :row-key="(record,index)=>{return index}"
                                        :pagination="pagination"
                                        >
                                        <template
                                          v-for="col in ['key','desc']"
                                          :slot="col"
                                          slot-scope="text, record, index">
                                              <div :key="col"  >
                                                      <a-input
                                                        class="input-lines"
                                                        v-if="canedit"
                                                        style="margin: -5px 0"
                                                        :value="text"
                                                        @change="e => handleChange(e.target.value, index, col,record)"
                                                      >
                                                      <a-select v-if="col == 'key'" slot="addonAfter" default-value="text" @change="e => selectChange(e,record,index)">
                                                        <a-select-option value="text">text</a-select-option>
                                                        <a-select-option value="file">file</a-select-option>
                                                      </a-select>
                                                      </a-input>
                                                      <template v-else>
                                                        {{ text }}
                                                      </template>
                                              </div>
                                        </template>
        
                                        <template
                                        v-for="v in ['value']"
                                        :slot="v"
                                        slot-scope="text, record, index">
                                        <div :key="v" v-if="record.keyType == 'text' " >
                                              <a-input
                                              v-if="canedit"
                                              type="text"
                                              :value="text"
                                              @change="e => handleChange(e.target.value, index, v,record)"
                                              >
                                              </a-input>
                                              <template v-else>
                                                {{ text }}
                                              </template>
                                        </div>
                                        <div v-else>
                                              <!-- <a-input
                                              v-if="canedit"
                                              type="file"
                                              >
                                              </a-input> -->
                                              <a-upload v-if="canedit"
                                              name="file"
                                              :multiple="true"
                                              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                              accept='.jpg,.jpeg,.gif,.png,.xsl,.xlsx'
                                              :headers="headersUpload"
                                              :file-list="record.fileList"
                                              @change="info=>uploadChange(info,index,record)"
                                            >
                                            <a-button> <a-icon type="upload" @click="info=>uploadFiles(info,index,record)"/> Click to Upload </a-button>
                                            </a-upload>
                                            <template v-else>
                                              {{ text }}
                                            </template>
                                        </div>
                                      </template>
                                      <template slot="operation" slot-scope="text, record, index">
                                                <a-popconfirm
                                                v-if="body.formData.length"
                                                title="Sure to delete?"
                                                @confirm="() => onDelete(index,record)"
                                            >
                                            <a-icon class="delete-button"
                                            type="minus-circle-o"></a-icon>
                                            </a-popconfirm>
                                      </template>
                                      
                                      </a-table>
                                  </div>
                                  <div style="display: flex; justify-content: center; "  class="editable-add-btn">
                                    <a-button type="dashed" @click="handleAdd" style="margin-top:10px">
                                      <a-icon type="plus" /> Add field
                                    </a-button>
                                  </div>
                              </div>
                              </a-card>


                        </div>
                        <div v-else-if=" body.bodytype == '3' ">
                            <a-card title="" :bordered="true" class="encodebody-card">
                                <b-code-editor 
                                :value="body.encodebody"
                                :auto-format="true" 
                                :smart-indent="true"
                                theme="xq-light" 
                                :indent-unit="2"
                                :line-wrap="false"  
                                :readonly="false" 
                                :show-number="false"  
                                @on-change="changeEncodeBody"
                                class="encode-body"
                                >
                                </b-code-editor>
                            </a-card>
                        </div>
                        <div v-else-if=" body.bodytype == '4' ">
                            <a-card title="" :bordered="true" class="encodebody-card">
                                    <b-code-editor 
                                    :value="body.jsonbody"
                                    :auto-format="true" 
                                    :smart-indent="true"
                                    theme="xq-light" 
                                    :indent-unit="2"
                                    :line-wrap="false"  
                                    :readonly="false" 
                                    :show-number="false"  
                                    @on-change="changeJsonBody"
                                    class="jsonbody"
                                    >
                                    </b-code-editor>
                            </a-card>
                        </div>
  


                
                </a-tab-pane>
                <a-tab-pane key="4" tab="extract variable">
                    <a-card title="示例：{'var_name':'$.data.code'},支持jsonpath提取" :bordered="true" class="extract-variable-card">
                        <b-code-editor 
                        :value="extract.value"
                        :auto-format="true" 
                        :smart-indent="true"
                        theme="xq-light" 
                        :indent-unit="2"
                        :line-wrap="false"  
                        :readonly="false" 
                        :show-number="false"  
                        @on-change="changeExtractValue"
                        class="extract-variable"
                        >
                        </b-code-editor>
                </a-card>
                </a-tab-pane>
                <a-tab-pane key="5" tab="assert">
                    <a-card   title="响应断言" :bordered="true" class="variable-define">
                        <div>
                            <a-form ref="variablesForm" layout="inline" :form="variablesForm" 
                            >
                                  <div v-for="(item, index) in variablesForm.parameter" :key="index">
                                      <a-form-item
                                      :prop="'parameter.' + index + '.key'"
                                      >
                                          <a-input v-model="item.key" 
                                          class="assert-input" 
                                          @change="variableKeyChange"
                                          placeholder="输入断言表达式,支持jsonpath,正则"
                                          >
                                          <a-tooltip slot="suffix" title="请输入提取断言表达式,支持jsonpath">
                                            <a-icon type="info-circle" style="color: orange" />
                                          </a-tooltip>
                                        </a-input>

                                      </a-form-item>
            
                                      <a-form-item>
                                        <a-select 
                                        default-value="eq" 
                                        class="operate-text" 
                                        v-model="item.operator"
                                        @change="e=>handleOperateChange(e,item,index)"
                                         >
                                          <a-select-option value="eq">
                                            eq
                                          </a-select-option>
                                          <a-select-option value="ne">
                                            ne
                                          </a-select-option>
                                          <a-select-option value="in">
                                            in
                                          </a-select-option>
                                          <a-select-option value="not in">
                                            not in
                                          </a-select-option>
                                          <a-select-option value="le">
                                            le
                                          </a-select-option>
                                          <a-select-option value="ge">
                                            ge
                                          </a-select-option>
                                          <a-select-option value="lt">
                                            lt
                                          </a-select-option>
                                          <a-select-option value="gt">
                                            gt
                                          </a-select-option>
                                        </a-select>

                                      </a-form-item>
            
            
                                      <a-form-item
                                      :prop="'parameter.' + index + '.value'"
                                      :label-col="layouts.paramlayout.labelCol"
                                      :wrapper-col="layouts.paramlayout.wrapperCol"
                                      >
                                          <a-input v-model="item.value"  
                                          class="assert-input" 
                                          @change="variableValueChange"
                                          placeholder="请输入断言预期的结果值"
                                          >
                                          <a-tooltip slot="suffix" title="请输入断言预期的结果值">
                                            <a-icon type="info-circle" style="color:orange" />
                                          </a-tooltip>
                                        </a-input>
                                      </a-form-item>
                                      <a-form-item>
                                          <a-icon v-if="index >= 0" @click="deleteVariable(item, index)"  class="dynamic-delete-button"
                                              type="minus-circle-o"></a-icon>
                                      </a-form-item>
                                  </div>
                                  <a-form-item>               
                                          <a-button type="dashed"  @click="addVariable" dislay:flex style="margin-left: 280px;" >
                                          <a-icon type="plus" /> Add field
                                          </a-button>
                                  </a-form-item>
                            </a-form>
                          </div>
                    </a-card>


                </a-tab-pane>
              </a-tabs>
          </div>

          <div>
            <a-tabs default-active-key="7" class="response-tab">
                <a-tab-pane key="7" tab="ResponseBody">
                  <div  style="  width: 1000px">
                    <json-viewer
                    v-model="responsedata"
                    :value="responsedata"
                    :expand-depth=100
                    copyable
                    boxed
                    sort></json-viewer>
                </div>
                </a-tab-pane>
                <a-tab-pane key="8" tab="ResponseHeader">
                  
                </a-tab-pane>
              </a-tabs>
         </div>
          <a-form-item :wrapper-col="{ span: 20, offset: 19 }" class="button-style" style="margin-left:50px; margin-bottom: 50px;">
            <a-button type="primary" @click="onSave">
              Save
            </a-button>
            <a-button style="margin-left: 10px;" @click="onCancle">
              Cancel
            </a-button>
          </a-form-item>

     </a-form>
     


    </a-card>



</template>

<script>
    const data=[];
    const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      width: '20%',
      scopedSlots: { customRender: 'key' },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '20%',
      scopedSlots: { customRender: 'value' },
    },
    {
      title: 'type',
      dataIndex: 'keyType',
      width: '8%',
      scopedSlots: { customRender: 'keyType' },
    },
    {
      title: 'desc',
      dataIndex: 'desc',
      width: '20%',
      scopedSlots: { customRender: 'desc' },
    },
    {
      title: 'operate',
      width:"8%",
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];



    export default{

        components: {
        
    },
    
    beforeCreate () {
        this.$nextTick(()=>{
        this.baseform.setFieldsValue({method:"GET"})
        
                           });
    },

    created () {
        
    },

    data () {
        return {
            data_project:[],
            value: undefined,
            fetching: false,
            page_param:{
                page_size: 10,
                page: 1,
            },
            layouts:{

            paramlayout:{
                labelCol: { span: 5},
                wrapperCol: { span: 19 }
            } 
            },
            variablesForm:{
                parameter:[]
            },

            paramsForm:{
                        parameter:[]
            },

            baseform: this.$form.createForm(this, { name: 'baseform' }),
           
            headerform:{
                header:{
                     headerValue:"{}"
                 }
            }
       ,
            body:{
                bodytype:1, // minetype
                formData:[],   // form-data
                encodebody:'{}', // www-urlencoded
                jsonbody:'{}', // json
               
            },
            // formdata pagination and columns
            pagination:false,
            columns:columns,
            canedit:true,
            headersUpload:{
            authorization: 'authorization-text',
            },
            responsedata:"{}",
            extract:{
                value:"{}"
            },
       
    
    
        }
    },
    methods: {
        dynamicPath(){
        this.$nextTick(()=>{
                    let values = this.baseform.getFieldsValue()
                    let url =values.baseUrl
                    if (url === undefined){
                        
                    }else{
                    let paramList=this.paramsForm.parameter
                    let basepath=url.split('?')[0] , encode=url.split("?")[1]
                    let newencode=this.encodeParamList(Array.from(paramList))
                    let newUrl=basepath+"?"+newencode
                    this.baseform.setFieldsValue({baseUrl:newUrl})
                    }
                });

        },
        paramKeyChange(){

            this.dynamicPath()
        }
        ,
        paramValueChange(){
            this.dynamicPath()
        }
        ,
        addItem() {
            this.paramsForm.parameter.push({
            key: "",
            value: ""
            });
    
        },
        deleteItem(item, index) {
            this.paramsForm.parameter.splice(index, 1);
          
        },
        methodChange(value){
            
        },
        baseUrlChange(url){
            if (url === undefined || typeof(url) != 'string' || url.indexOf("?") == -1 ||url.indexOf("=") == -1){
            }else{
                let basepath=url.split('?')[0], kvencode=url.split('?')[1].split('&')
                let arr=[]
                for (var item of kvencode){
                    let rowdata={}
                    let k= item.split("=")[0], v= item.split("=")[1]
                    rowdata["key"]=k
                    rowdata["value"]=v
                    arr.push(rowdata)
                }
                this.paramsForm.parameter=arr
                }
        },
        changeHeader(value){
            this.headerform.header.headerValue=value

        },
        sendRequest(){

        },
        bodyChange(e){
            this.body.bodytype=e.target.value
            console.log(this.body.bodytype)
        },
        changeEncodeBody(value){
            
            this.body.encodebody=value
            console.log(this.body.encodebody)
        },
        changeJsonBody(value){
            this.body.jsonbody=value
            console.log(this.body.jsonbody+"1111")
        },
        //extract var 
        changeExtractValue(value){
         
            this.extract.value=value
        },


        // submit
        onSave(){
            this.baseform.validateFields((err, values) => {
            if (this.body.bodytype === undefined){
                this.$message.error("请选择 body minetype ")
            }
            var extract=JSON.parse(this.extract.value)
            let nameString = Object.keys(extract).join(" ")
            console.log(nameString)
            if (values){
                    this.$axios({
                        url:"demo-service/api/variable/check",
                        method:"get",
                        params:{name:nameString}

                        }).then(res=>{
                       
                            if (res.data.success == true){
                                    
                                    if (!err) {
                                            console.log('Received values of form: ', values);
                                            let paramList = Array.from(this.paramsForm.parameter)
                                           
                                            let parameters=this.encodeParamList(paramList)
                                            let headers = JSON.parse(this.headerform.header.headerValue)
                                            let body ={},submitData={}
                                            
                                            let assert_express=Array.from(this.variablesForm.parameter).filter(item=> item.key !="")
                                        
                                            if (values.method == "GET"){
                            
                                            }else if (values.method == "POST"|| values.method == "PUT"|| values.method == "PATCH" || values.method == "DELETE"){
                                                body={}
                                                if (this.body.bodytype == "1"){
                                    
                                                    // consider backend pure url request deal with when request delete or get 
                                                }
                                                else if(this.body.bodytype == "2"){
                                                    // form-data
                                                    let formdata=this.body.formData
                                                    body=JSON.stringify(Array.from(formdata)) !='[]'? Array.from(formdata):{}
                                                }else if (this.body.bodytype == "3"){
                                                    // www-urlencode 
                                                    body= JSON.parse(this.body.encodebody)
                                                }else if (this.body.bodytype == "4"){
                                                    // json 
                                                    body=JSON.parse(this.body.jsonbody)
                                                }
                                                
                                            }
                                            // js 判断字典为空 JSON.stringify(obj) == '{}'
                                            // check pass submit request 
                                            submitData=Object.assign({},
                                                {
                                                "body":body,
                                                "mine_type":this.body.bodytype,
                                                "params":parameters,
                                                "headers": headers,
                                                "method":values.method,
                                                "url":values.baseUrl,
                                                "case_name":values.casename,
                                                "project_name":values.project_name,
                                                "extract":extract,
                                                "assert_express":assert_express,
                                                "project_id":this.value.key
                                                })
                                            this.$axios({
                                                url:"demo-service/api/testcase",
                                                method:"post",
                                                data:submitData
                                            }).then(res=>{
                                                if (res.status==200 && res.data.success == true){
                                                    this.$message.success("create success!")
                                                    this.$router.push({name:"apilist"})
                                                }else{
                                                let error_message= res.data.msg
                                                this.$message.error(JSON.stringify(error_message))

                                                }

                                                
                                            }).catch(err=>{
                                                console.log("xxxxx")
                                                this.$message.error(JSON.stringify(err))
                                            })
                                    
                                        }else{
                                            console.log(res.data.msg)
                                            this.$message.error("请检验表单必填检验错误！");
                                        }

                            }else{
                                let errors = res.data.msg
                                this.$message.error("重复变量： "+JSON.stringify(errors))

                            }


                        }).catch(err=>{
                            console.log(err)
                        })
                    
            }else{
                console.log("xxxxxxxxxxx")
            }

        });


        },
        // [{'k':v},{'':''}] to filter empty key dict
        transferParams(value){
            let res={}
            if (value && value !=undefined){
                    for(let item of value){
                        let k=item["key"]
                        let v=item["value"]
                        if (k){
                            res[k]=v
                        }  
                    }
            }
            return res 

        },
        // encodeParamters from {'k1':v1,'k2':v2} to k1=v1&k2=v2
        encodeParamList(paramList){
            let encodeurl=''
            if (JSON.stringify(paramList) !='[]'){
                let arr=[]
                for(let item of paramList){
                    let k=item["key"]
                    let v=item["value"]
                    if (k){
                        let kv =k+"="+v
                        arr.push(kv)
                } 
                encodeurl =arr.join("&")  
            }
            }
            return encodeurl

        },
        onCancle(){
          this.$router.push({
              name:"apilist"
          })
        },
        //formdata 修改 record type属性 "text" ,"file"
        selectChange(e,record,index){
        record.keyType=e
        // filter 保留符合条件的
        //let newvar= this.body.formData.filter(item=>item.keyType == e)
      },

      // formdata change，根据行数据修改动态修改行属性为最新属性
      handleChange(value, index, column,record) {
        record[column]=value
        let newitem= record
        this.body.formData.splice(index, 1, newitem)
      },
      // add table 新增操作触发formData数据更新push
      handleAdd() {
      const newData = {
        key: '',
        value: '',
        desc:'',
        keyType:'text',
        fileList:[
 
                ]
      };
      this.body.formData = [...this.body.formData, newData];
   
      },
      // form data delete 
      onDelete(index){
        this.body.formData.splice(index,1)
        console.log(this.body.formData)
      },
      // formdata file upload 
      uploadChange(info,index,record){
            let newfileList = [...info.fileList];
            if (info.file.status !== 'uploading') {
           
            }
            if (info.file.status === 'done') {
                 this.$message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                 this.$message.error(`${info.file.name} file upload failed.`);
          }
          let tmpfiles=[]
          for (let file of info.fileList){
              tmpfiles.push({
                  'uid':file.uid,
                  'name':file.name,
                  'status':file.status,
                   'url':file.response?file.response.url:''
              })
          }
        // console.log("自定义fileList如下：")
        console.log(tmpfiles);
        record.fileList=tmpfiles
      
           
      },
      // upload file cick button 
      uploadFiles(info,index,record){
        console.log("触发click事件")
      },
    //Debug
    sendRequest(){
            var url ='',method=''
            this.baseform.validateFields((err, values) => {
                if(!err){
                    url = values.baseUrl
                    method=values.method
                }
            })
            var entiny={
                url:url,
                method:method,
                headers:{}
            }
            
            let response=  this.$axios(entiny).then(res=>{
            console.log("进入请求响应")
            this.responsedata=res.data
            }).catch(error=>{ 
                console.log("进入失败异常")
                if (error.response) {
                console.log(error)
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx, response.data,response.status,response.headers
                this.responsedata=error.response.data
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }})    
    },

    // extract var prefix
    variableKeyChange(){

    },
    variableValueChange(){

    },
    deleteVariable(item,index){
        this.variablesForm.parameter.splice(index, 1);
    },
    addVariable(){
        this.variablesForm.parameter.push({
            key: "",
            value: "",
            operator:"eq"
            });
    },
    handleOperateChange(value,item,index){
        item.operator=value
        //console.log(this.variablesForm.parameter)

    },
    // project select 
    changeQueryProject(value){
        this.value=value

    },
    queryProject(value){
        this.fetching = true;
        this.$axios({
          url:`demo-service/api/projects`,
          method:'get',
          params:{'search':value,...this.page_param}

        }).then(res =>{
          if (res.data.success ==true && res.data.code ==200){
            let newData=res.data.data.map(item => (
              {
                id: item.id,
                value: item.project_name,
                }
          ));
          this.data_project=newData;
          this.fetching = false;
          }else{
            this.$message.error(JSON.stringify(res.data.msg))
          }


        }).catch(err=>{
          console.log(err)
        })

    }



    },



    }


</script>

<style  lang="less" scoped>
    .create-card{
        width: 100%;
        height: 100%;
    }
    div /deep/ .encodebody-card{
       margin: 2px;
    }
    .formdata-card{
        margin-top: 10px;
    }
    .input-line{
          border-bottom: 1px solid #dbdbdb;
          border-top:0px;
          border-left:0px;
          border-right:0px
          }
    .send-btn{
        margin-left: 15px;
  
    }
    .variable-define{
        margin-bottom: 20px;
        width: 100%;
    }
    .assert-input{
        width: 300px;

    }

   .operate-text{
       width:100px;
   }

    .operate-text ul::-webkit-scrollbar-thumb{

    display: none;
    }
    .operate-text ul ::-webkit-scrollbar{

    display: none;
    }
    .operate-text ul::-webkit-scrollbar-track{

        display: none;
    }

        
 





</style>