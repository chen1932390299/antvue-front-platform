<template>
    <div class='use-io'>
    <div :class='{"itemCount":true,"leftT":!leftShow,"left":leftShow}'>
    <div style="font-size:60px;">表格数据</div>
    <div>
     <el-table :data="tableData"
      style="width: 100%">
     <el-table-column prop="date"
       label="日期"
       width="150">
     </el-table-column>
     <el-table-column label="配送信息">
     <el-table-column prop="name"
       label="姓名"
       width="120">
     </el-table-column>
     <el-table-column label="地址">
     <el-table-column prop="province"
        label="省份"
        width="120">
     </el-table-column>
     <el-table-column prop="city"
        label="市区"
        width="120">
     </el-table-column>
     <el-table-column prop="address"
        label="地址"
        width="300">
     </el-table-column>
     <el-table-column prop="zip"
        label="邮编"
        width="120">
     </el-table-column>
     </el-table-column>
     </el-table-column>
     </el-table>
    </div>
    </div>
    </div>
</template>
   export default {
    data(){
    leftShow:false
   }
   }
   <script>
   </script>
   
<style lang="less" scoped> 
    .use-io{
        margin-top: 40px;
margin-bottom: 20px;
    }
    .itemCount { 
    position: absolute;
    top: 30%;
    background: yellowgreen;
    height:600px;
    padding: 10px;
    width:1000px;
    z-index: 2
    }
    .left { 
    left:0; 
    transition: left 0.5s;
    }
    .leftT {
    left:-1200px;
    transition: left 0.5s;
    }
</style>