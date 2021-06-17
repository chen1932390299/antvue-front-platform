<template>
    
    <div>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item href="">
            Application Center
          </a-breadcrumb-item>
          <a-breadcrumb-item href="">
            Application List
          </a-breadcrumb-item>
          <a-breadcrumb-item>An Application</a-breadcrumb-item>
        </a-breadcrumb>
        <a-card
        style="width:100%"
        title=""
        :tab-list="tabList"
        :active-tab-key="key"
        @tabChange="key => onTabChange(key, 'key')"
    >
        <span slot="customRender" slot-scope="item"> <a-icon type="home" />{{ item.key }} </span>
        <a slot="extra" href="#">More</a>
        


        <a-row :gutter="16">
            <a-col class="gutter-row" :span="6">
              <div class="gutter-box">
                <a-input-search
                style="margin: 20px 0px 20px 0px; float:left"
                placeholder="input search name"
                enter-button="Search"
                size="large"
                @search="onSearch"
                />
              </div>
            </a-col>
          </a-row>
       

        <a-table :columns="columns" :data-source="data" bordered>
        <template
        v-for="col in ['name', 'email', 'phonenumber','roletype']"
        :slot="col"
        slot-scope="text, record, index"
        >
        <div :key="col">
            <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else>
            {{ text }}
            </template>
        </div>

        </template>
        <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
            <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                <a>Cancel</a>
            </a-popconfirm>
            </span>
            <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
            </span>
        </div>
        </template>
    </a-table>


    </a-card>




    </div>


</template>




<script>
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'email',
    dataIndex: 'email',
    width: '15%',
    scopedSlots: { customRender: 'email' },
  },
  {
    title: 'phonenumber',
    dataIndex: 'phonenumber',
    width: '40%',
    scopedSlots: { customRender: 'phonenumber' },
  },
  {
    title: 'roletype',
    dataIndex: 'roletype',
    width: '40%',
    scopedSlots: { customRender: '' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    email: '1932390299@qq.com',
    phonenumber: `1867674312${i}`,
    roletype:'普通用户'
  });
}

export default {
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      tabList: [
        {
          key: 'tab1',
          // tab: 'tab1',
          scopedSlots: { tab: 'customRender' },
        },
        {
          key: 'tab2',
          tab: 'tab2',
        },
        {
          key: 'tab3',
          tab: 'tab3',
        },
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2',
        tab3:'content3'
      },
      key: 'tab1',
      noTitleKey: 'app',

      // table attr 
      data,
      columns,
      editingKey: '',

    };
  },
  methods: {
      // tab 
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
    // search
    onSearch(value) {
      console.log(value);
    },

    // table
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      console.log(target);
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },

    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    }



  },
};
</script>

<style lang="less" scoped>
.editable-row-operations a {
  margin-right: 8px;
}

</style>