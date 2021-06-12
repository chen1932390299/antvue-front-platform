<template>

    <a-layout id="components-layout-demo-custom-trigger" class="layout-contain">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" >
          测试管理平台
        </div>
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
          <a-sub-menu>
              <span slot="title" icon>
              <router-link to="/home"><a-icon type="home" />首页</router-link></span>
          </a-sub-menu>

          <a-sub-menu key="2">
            <!-- <span><router-link to="/version"><a-icon type="menu" />版本统计</router-link></span> -->
            <span slot="title"><a-icon type="menu" />版本管理</span>
            <a-menu-item key="21">
              <router-link to="/version"><a-icon type="line-chart" />发布迭代</router-link>
            </a-menu-item>
            
            <a-menu-item key="22">
              <router-link to="/bug"><a-icon type="bug" />测试bug统计</router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="0">
            <span  slot="title"><a-icon type="api" />接口管理</span>
            <a-menu-item key="01">
              <router-link to="/variables"><a-icon type="android" />全局变量</router-link>
            </a-menu-item>
            <a-menu-item key="02">
             <router-link to="/apilist"><a-icon type="control" />接口列表</router-link>
            </a-menu-item>
            <a-menu-item key="03" v-if="false">
              <router-link to="/apiadd"><a-icon type="interaction" />新增接口</router-link>
             </a-menu-item>
            <a-menu-item key="04" v-if="false">
              <router-link to="/drag"><a-icon type="folder-open" />AddTestSuite</router-link>
             </a-menu-item>
             <a-menu-item key="05">
              <router-link to="/suitelist"><a-icon type="appstore" />任务套件列表</router-link>
             </a-menu-item>
             <a-menu-item key="06" v-if="false">
                <router-link to="/api/detail"><a-icon type="code" />接口详情</router-link>
             </a-menu-item>
             <a-menu-item key="07">
              <router-link to="/report"><a-icon type="code" />报告统计</router-link>
             </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="3">
            <!-- <span><router-link to="/user"><a-icon type="user" />用户</router-link></span> -->
            <span slot="title"><a-icon type="user" />用户</span>
            <a-menu-item key="31">
              <router-link to="/user"><a-icon type="team" />用户列表</router-link>
            </a-menu-item>
            
            <a-menu-item key="32" v-if="useraddVisible">
              <router-link to="/adduser"><a-icon type="team" />新增用户</router-link>
            </a-menu-item>


            <a-menu-item key="32">
              <router-link to="/roles"><a-icon type="audit" />角色</router-link>
            </a-menu-item>
            <a-menu-item key="33" v-if="visible" >
              <router-link to="/addrole"><a-icon type="control" />新增角色</router-link>
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="4">
            <span slot="title"><a-icon type="setting" />设置</span>
            <a-menu-item key="41" >
             <router-link to="/setting"> <a-icon type="tool" />工具</router-link>
            </a-menu-item>
            <a-menu-item key="42">
              <router-link to="/setting"><a-icon type="github" />代码发布历史</router-link>
            </a-menu-item>
          </a-sub-menu>

        </a-menu>
      </a-layout-sider>
      <a-layout style="background: #fff ;">
        <a-layout-header style="background: #fff; padding: 0 ; border:1px solid #d9d9d9;">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <a-dropdown style="float:right; margin-right: 40px ">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              logout <a-icon type="down" />
            </a>
            <a-menu slot="overlay" @click="onClick">
              <a-menu-item key="1">
                <a-icon type="logout" />退出
              </a-menu-item>
              <a-menu-item key="2">
               <router-link to="/updatePassword"><a-icon type="tool" /> 修改密码</router-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-layout-header>
        
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px',flex:'none'}"
        >

        <router-view></router-view>

        </a-layout-content>

      </a-layout>
    </a-layout>
  </template>
  <script>
  import Tablelist from '@/components/Tablelist.vue'
 
  import FormSearch from '@/components/FormSearch.vue'
  import modalbox from '@/components/AddModal.vue'
  
  export default {
    data() {
      return {
        collapsed: false,
        visible:false,
        useraddVisible:false
      };
    },
    components:{'tablelist':Tablelist,'formsearch':FormSearch,modalbox},
    methods: {
      onClick(){

      }
    }
  };
  </script>
  <style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  #components-layout-demo-custom-trigger .trigger:hover {
   color: #1890ff;
  }
  
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    /* background:#1890ff; */
    color: #fff;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
    padding-left: 5px;
    font-size: 16px;
    float: left;
    margin-left: 18px;
    


  }

  .layout-contain {
   height: 100%;
  
  
  }

  
  #userfine{
    float: right;
  }
  
  </style>
  