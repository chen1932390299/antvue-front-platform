<template>



    

  </template>
  <script>
  const columns = [
    {
      title: 'Key',
      dataIndex: 'Key',
      width: '10%',
      scopedSlots: { customRender: 'Key' },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '10%',
      scopedSlots: { customRender: 'value' },
    },
    {
      title: 'desc',
      dataIndex: 'desc',
      width: '20%',
      scopedSlots: { customRender: 'desc' },
    },
    {
      title: 'operation',
      width:"4%",
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      Key: `key ${i}`,
      value: i,
      desc: `London Park no. ${i}`,
    });
  }
  export default {
    data() {
      this.cacheData = data.map(item => ({ ...item }));
      return {
        pagination:false,
        canedit:true,
        data,
        columns,
        editingKey: '',
      };
    },
    methods: {
      handleChange(value, index, column,record) {
        // console.log(value)
        record[column]=value
        let newitem= record

        this.data.splice(index, 1, newitem)
        console.log(this.data)
      },
      onDelete(index){
        this.data.splice(index,1)
        console.log(this.data)
      },
      handleAdd() {
      console.log(this.data.length)
      const newData = {
        Key: '',
        value: '',
        desc:'',
      };
      this.data = [...this.data, newData];
   
        },
    },
  };
  </script>
  <style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  .editable-add-btn {
  margin-bottom: 8px;
}

.input-lines{

border-bottom: 1px solid #dbdbdb;
border-top:0px;
border-left:0px;
border-right:0px
}
</style>
  