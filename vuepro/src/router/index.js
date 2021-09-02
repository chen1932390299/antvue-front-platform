import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

// Avoided redundant navigation to current location
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const routes= 
            [
            // {path:'/edit',component: () => import('@/components/DrawCompoment.vue'),name:'edit'}
            { path: '/', redirect: '/login' ,name:'/'}, 
            { 
            path: '/login', 
            component:()  => import('@/components/LoginComponent.vue'),
            name:'login' 
            },
            {path:'/adduser',  component:() => import('@/views/addUser.vue')},
            {path:'/user/info/update',  component:() => import('@/views/UserInfoUpdate.vue')},
            {path:'/recallpassword',  component:() => import('@/views/forgotpwd.vue')},
       
            { 
            path: '/index', 
           
            component: () => import('@/components/Layout.vue'),
            children:
                    [
                  {path:'',redirect: '/apilist'},
                  {path:'/suitelist',name:'suitelist',component: () => import('@/views/testSuite.vue')},
                  {path:'/task/record/detail/:id',name:'task-record',component: () => import('@/views/TaskRecordDetail.vue')},
                  { path:'/suite/deatail/:id',name:'suite-detail',component: () => import('@/views/SuiteDetail.vue')},
                  {path:'/task/add',name:"add-task",component:() => import('@/views/addTask.vue')},
                  { path:'/variables',name:'variables',component: () => import('@/views/globalVariables.vue')},
                  { 
                      path:'/apilist',name:'apilist',
                      component: () => import('@/views/apilist.vue'),  
                      meta: {
                              requireAuth: false
                            }
                  },
                  {path:'/report',name:'report', component:() => import('@/views/reports.vue')},
                  {path:'/trigger',name:'trigger', component:()=> import('@/views/triggers.vue')},
                  { path:'/editapiList',name:'editapiList',component: () => import('@/views/editapiList.vue')},
                  { path:'/apiadd',name:'apiadd',component: () => import('@/views/apiadd.vue')},
                  { path:'/api/detail/:id',name:'api-detail',component: () => import('@/views/apiDetail.vue')},
                  { path:'/drag',name:'drag',component: () => import('@/views/dragdemo.vue')},
                  { path:'/version',name:'version',component: () => import('@/views/Version.vue')},
                  { path:'/bug',name:'bug',component: () => import('@/views/demo.vue')},
                  {path:'/user', name:'user-list', component:() => import('@/views/User.vue')},
                  {path:'/projects', name:'projects' ,component:() => import('@/views/projectConfig.vue')},
                  {path:'/projects/add', name:'addProject' ,component:() => import('@/views/addProject.vue')},
                  {path:'/setting',  component:() => import('@/views/Setting.vue')},
                  {path:'/roles',name:'role-list',  component:() => import('@/views/roles.vue')},
                  {path:'/addrole',  component:() => import('@/views/addrole.vue')}
              ]

            
           },
            {path:'*',component:() => import('@/components/404.vue') }
          ]


const router = new Router({
  mode: 'history',
  routes  
})


// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // if sessionstore exits pass else to login  page 
  // const token= window.sessionStorage.getItem('token')
  const token = Cookies.get('token')   
  if (!token && to.meta.requireAuth) return next('/login')
  next()
})



export default router