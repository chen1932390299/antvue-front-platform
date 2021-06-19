<template>
    
    <a-form :form="queryform" @submit="handleSearch"  layout="inline"> 

            <a-form-item label="项目名称">
              <a-input
                v-decorator="[
                  'project_name',
                  {
                    rules: [
                      {
                        required: false,
                        message: '',
                      },
                    ],
                    initialValue: ''
                  },
                ]"
                placeholder="请输入项目名支持模糊查询"
              />
            </a-form-item>

            <a-form-item label="执行状态">
                <a-select
                show-search
                :filter-option="false"
                style="width: 120px" @change="statusChange"
                    v-decorator="[
                    'status',
                    {
                        rules: [
                        {
                            required: false,
                            message: '',
                        },
                        ],
                        initialValue: ''
                    },
                    ]"
                    placeholder="请选择status"
                >
                <a-select-option v-for=" item in status_data" :key="item.id" :value="item.id">
                    {{item.value}}
                    </a-select-option>
                </a-select>
                </a-form-item>

        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              Search
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              Clear
            </a-button>
          </a-col>
        </a-row>
      </a-form>
</template>

<script>
    export default {
  data() {
    return {
      status_data:[{'id':'0','value':'未执行'},{'id':'1','value':'失败'},{'id':'2','value':'成功'}],
      status_enum:{
          '未执行':'0',
          '失败':'1',
          '成功':'2'
      },
      expand: false,
      queryform: this.$form.createForm(this, { name: 'case_search' }),
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
  },
  updated() {
    
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.queryform.validateFields((error, values) => {
        console.log('Received values of form: ', values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },
    statusChange(value){
        console.log(value)
    }
  },
};
</script>

<style lang="less" scoped>

.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>