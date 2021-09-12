<template>

    <div>
        <a-breadcrumb separator=">">
            <a-breadcrumb-item>
                Home
            </a-breadcrumb-item>
            <a-breadcrumb-item href="/user/list">
              用户列表
            </a-breadcrumb-item>
            <a-breadcrumb-item href="">
              角色列表
            </a-breadcrumb-item>
          </a-breadcrumb>

          <a-card title="资源管理"  style="margin-top: 40px">

            <div>
                <div style="margin-bottom: 16px">
                    <a-button type="primary"  @click="addResouce">
                        新增资源
                      </a-button>
                  <a-button type="danger" :disabled="!hasSelected" :loading="loading" @click="start" style="margin-left: 20px;">
                    删除
                  </a-button>
                  <span style="margin-left: 8px">
                    <template v-if="hasSelected">
                      {{ `Selected ${selectedRowKeys.length} items` }}
                    </template>
                  </span>
                </div>
                <a-table
                  size="middle"
                  :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                  :columns="columns"
                  :data-source="data"
                >
                <template slot="operation" slot-scope="text, record,index">
            
                    <a-icon type="edit" theme="twoTone"  two-tone-color="#2E64FE" @click="editChange(index,record)"></a-icon>
                    
                  </template>
                </a-table>
              </div>
            

          </a-card>

    </div>
</template>

<script>
    const columns = [
      {
        title: '资源名称',
        dataIndex: 'name',
      },
      {
        title: '资源路径',
        dataIndex: 'path',
      },
      {
        title: '方式',
        dataIndex: 'method',
      },

      {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },

        }
    ];
    
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `模块 ${i}`,
        path: `/api/user/${i}`,
        method: `GET ${i}`,
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
        editChange(){

        },

        addResouce(){
            this.$router.push({
                name:'add-resource'
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