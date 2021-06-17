import Vue from 'vue'
import Router from 'vue-router'

// Avoided redundant navigation to current location
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const routes= 
            [
            {path:'/edit',component: () => import('@/components/DrawCompoment.vue'),name:'edit'},
            { path: '/', redirect: '/login' }, 
            { path: '/login', component: () => import('@/components/LoginComponent.vue'),name:'login' },
            {path:'/adduser',  component:() => import('@/views/addUser.vue')},
            {path:'/updatePassword',  component:() => import('@/views/updatepassword.vue')},
            {path:'/recallpassword',  component:() => import('@/views/forgotpwd.vue')},
       
            { 
            path: '/index', 
           
            component: () => import('@/components/Layout.vue'),
            children:
                    [
                  {path:'',redirect: '/home'},
                  {path:'/suitelist',name:'suitelist',component: () => import('@/views/testSuite.vue')},
                  { path:'/variables',name:'variables',component: () => import('@/views/globalVariables.vue')},
                  { path:'/apilist',name:'apilist',component: () => import('@/views/apilist.vue')},
                  {path:'/report',name:'report', component:()=> import('@/views/reports.vue')},
                  {path:'/trigger',name:'trigger', component:()=> import('@/views/triggers.vue')},
                  { path:'/editapiList',name:'editapiList',component: () => import('@/views/editapiList.vue')},
                  { path:'/apiadd',name:'apiadd',component: () => import('@/views/apiadd.vue')},
                  { path:'/api/detail/:id',name:'api-detail',component: () => import('@/views/apiDetail.vue')},
                  { path:'/drag',name:'drag',component: () => import('@/views/dragdemo.vue')},
                  { path:'/version',name:'version',component: () => import('@/views/Version.vue')},
                  { path:'/bug',name:'bug',component: () => import('@/views/demo.vue')},
                  {path:'/home',  component:() => import('@/components/Tablelist.vue')},
                  {path:'/user',  component:() => import('@/views/User.vue')},
                  {path:'/projects', name:'projects' ,component:() => import('@/views/projectConfig.vue')},
                  {path:'/projects/add', name:'addProject' ,component:() => import('@/views/addProject.vue')},
                  {path:'/setting',  component:() => import('@/views/Setting.vue')},
                  {path:'/roles',  component:() => import('@/views/roles.vue')},
                  {path:'/addrole',  component:() => import('@/views/addrole.vue')}
              ]

            
           },
            {path:'*',component:() => import('@/components/404.vue') }
          ]


const router = new Router({
  mode: 'history',
  routes   //   routes:routes
})


// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数

function isAuthenticated(){
  // localStorage.setItem("token","test");
  if(localStorage.getItem("token")){
    return true ;
  }else{
    return true;
  }
}




export default router