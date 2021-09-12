<template>
    <div>
      <div style="margin-bottom: 16px">
        <a-button type="primary" :disabled="!hasSelected" :loading="loading" @click="start">
          删除
        </a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>
        </span>
      </div>

      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :data-source="data"
      >
            <template slot="operation" slot-scope="text, record,index">
                    
                <a-button  type="link"  @click="editRelation(record)">修改关联</a-button>
            </template>
      </a-table>
    </div>
  </template>
  <script>
  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
    },
    {
      title: 'account',
      dataIndex: 'account',
    },
    {
      title: 'role',
      dataIndex: 'role',
    },
    {
    title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' }
    }
   
  ];
  
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      username: `码云 ${i}`,
      account: '1932@qq.com',
      role: `admin ${i}`,
    });
  }
  
  export default {
    data() {
      return {
        data,
        columns,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      };
    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
    methods: {
         editRelation(record){
            this.$router.push({
                name:"relation-edit",
                params:{
                  id:record.key
                }
            })
        },
      start() {
        this.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false;
          this.selectedRowKeys = [];
        }, 1000);
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
    },
  };
  </script>