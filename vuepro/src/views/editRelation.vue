<template>
  <div>
    <a-card title="修改关联角色">

      <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>

      <a-button type="primary" class="submit-btn" @click="save" >保存</a-button>
      <a-button  style="margin-left: 40px;" @click="cancle">取消</a-button>
    </a-card>
  


  </div>
</template>
<script>
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',

  },
  {
    key: '2',
    name: 'Jim Green',

  },
  {
    key: '3',
    name: 'Joe Black',

  },
  {
    key: '4',
    name: 'Disabled User',

  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },

  methods: {
    save(){
        this.$message.success("厉害了我的哥，还没做好哦 !!!")
    },
    cancle(){
      this.$router.push({
        name:'user-list'
      })
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            name: record.name,
          },
        }),
      };
    },
  },
};
</script>


<style>

  .submit-btn {
    margin-left: 80%; margin-top: 50px;

  }
</style>
