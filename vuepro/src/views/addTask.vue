<template>
    <div>
        <div class="transfer-selection">
            <a-popover>
                <template slot="content">
                    左边为数据源，右侧为要提交的数据
                </template>
                <span  style="color:yellowgreen" ></span>提示</span><a-icon type="question-circle" />
            </a-popover>
        </div>
        <div >
            <a-form :form="form" >
              <a-form-item label="任务名称" :label-col="{ span: 2}" :wrapper-col="{ span: 10 }">
                <a-input
                v-decorator="[
                'taskName', 
                { rules:  
                      [
                          { required: true, message: 'Please input your task name!' },
                          {max:50,message:'max limit of task name is 50 '}
                      ] 
                }
                ]"
              />
              </a-form-item>
              <a-form-item  :label-col="{ span: 2}">
                <h3 style="margin-left: 40px;">套件选取</h3>
                <a-transfer
                :data-source="mockData"
                :list-style="{
                  width: '600px',
                  height: '600px',
                }"
                show-search
                :target-keys="targetKeys"
                :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
                @change="handleChange"
                class = 'transfer-items'
              />
              <template
              slot="children"
              slot-scope="{
                props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
                on: { itemSelectAll, itemSelect },
              }"
            >
              <a-table
                :row-selection="
                  getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
                "
                :columns="direction === 'left' ? leftColumns : rightColumns"
                :data-source="filteredItems"
                size="small"
                :style="{ pointerEvents: listDisabled ? 'none' : null }"
                :custom-row="
                  ({ key, disabled: itemDisabled }) => ({
                    on: {
                      click: () => {
                        if (itemDisabled || listDisabled) return;
                        itemSelect(key, !selectedKeys.includes(key));
                      },
                    },
                  })
                "
              />
            </template>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 12, offset: 18 }">
            
                <a-button type="primary" @click="handleSubmit">
                    submit
                  </a-button>
                  <a-button style="margin-left: 30px;" @click="cancle">
                    Cancel
                  </a-button>
               
              </a-form-item>
            </a-form>
        </div>
    </div>
 
  </template>

  <script>
    import {api} from '@/common/api.js'
    import difference from 'lodash/difference';

    const leftTableColumns = [
      {
        dataIndex: 'title',
        title: 'title',
      }
    ];
    const rightTableColumns = [
      {
        dataIndex: 'title',
        title: 'title',
      },
    ];

    const originTargetKeys = []

    export default {

      data() {
        return {
          mockData:[],
          targetKeys: [],
          form: this.$form.createForm(this, { name: 'taskform' }),
          leftColumns: leftTableColumns,
          rightColumns: rightTableColumns,
        };
      },
      mounted() {
        this.getMock();
      },
      methods: {

        // 
        async  GetSuitesList(){
            let  {data} = await api.get('demo-service/api/testsuite')
           return data 
            
        },
        async  getMock() {
          const targetKeys = [];
          const mockData = [];
         
          let res =  await this.GetSuitesList();
          for (let item of res) {
            let data = {
              key:item.id.toString(),  // value must be string type 
              title: item.suite_name,
            };
            mockData.push(data);
          }
          this.mockData = mockData;
          this.targetKeys = targetKeys;
        },
        renderItem(item) {
          const customLabel = (
            <span class="custom-item">
              {item.title} 
            </span>
          );
    
          return {
            label: customLabel, // for displayed item
            value: item.title, // for title and filter matching
          };
        },
        handleChange(targetKeys, direction, moveKeys) {
        //   console.log(targetKeys, direction, moveKeys);
          this.targetKeys = targetKeys;
        },
        // submit form 
        handleSubmit(e){
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log(values)

                    }
                }); 
        },
      // 
      cancle(){

      },
      // 
      onChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys;
    },

    triggerDisable(disabled) {
      this.disabled = disabled;
    },

    triggerShowSearch(showSearch) {
      this.showSearch = showSearch;
    },
    getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
      return {
        getCheckboxProps: item => ({ props: { disabled: disabled || item.disabled } }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          itemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          itemSelect(key, selected);
        },
        selectedRowKeys: selectedKeys,
      };
    }
  
      },
    };
    </script>
 
 
 
<style lang="less">
 
.transfer-selection{
 
    margin-bottom:30px ;
}
.transfer-items{

  margin-left: 40px;
}
</style>