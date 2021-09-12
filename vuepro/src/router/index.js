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
            
            { path: '/', redirect: '/login' ,name:'/'}, 
            { 
            path: '/login', 
            component:()  => import('@/components/login.vue'),
            name:'login' 
            },
            {path:'/adduser',  component:() => import('@/views/addUser.vue')},
            //{path:'/user/related/role',name:'user-related-role',component:() => import('@/views/UpdateRelationRole.vue')},
            {path:'/user/info/update',  component:() => import('@/views/editUser.vue')},
            {path:'/recall/password',  component:() => import('@/views/recallPassWord.vue')},
       
            { 
            path: '/index', 
           
            component: () => import('@/components/home.vue'),
            children:
                    [
                  {path:'',redirect: '/api/list'},
                  {path:'/user/related/add',name:'add-relation',component:() => import('@/views/addRelationRole.vue')},
                  {path:'/user/relation/edit',name:'relation-edit',component:() => import('@/views/editRelation.vue')},
                  {path:'/menu/resource',name:'menu-resource',component: ()=> import('@/views/rightMenu.vue')},
                  {path:"/resource/add",name:"add-resource",component: ()=> import("@/views/addResource.vue")},
                  {path:'/suite/list',name:'suite-list',component: () => import('@/views/testSuiteList.vue')},
                  {path:'/task/record/detail/:id',name:'task-record',component: () => import('@/views/TaskRecordDetail.vue')},
                  { path:'/suite/deatail/:id',name:'suite-detail',component: () => import('@/views/suiteDetail.vue')},
                  {path:'/task/add',name:"add-task",component:() => import('@/views/addTask.vue')},
                  { path:'/variables',name:'variables',component: () => import('@/views/globalVariables.vue')},
                  { 
                      path:'/api/list',name:'api-list',
                      component: () => import('@/views/apiList.vue'),  
                      meta: {
                              requireAuth: false
                            }
                  },
                  {path:'/report',name:'report', component:() => import('@/views/dashBoard.vue')},
                  {path:'/schedule/page',name:'trigger', component:()=> import('@/views/triggers.vue')},
                  { path:'/editapiList',name:'editapiList',component: () => import('@/views/editapiList.vue')},
                  { path:'/api/add',name:'api-add',component: () => import('@/views/addApi.vue')},
                  { path:'/api/detail/:id',name:'api-detail',component: () => import('@/views/apiDetail.vue')},
                  { path:'/suite/add',name:'add-suite',component: () => import('@/views/addSuite.vue')},
                  { path:'/publish',name:'version',component: () => import('@/views/publish.vue')},
                  { path:'/testcase',name:'testcase',component: () => import('@/views/testCase.vue')},
                  {path:'/user', name:'user-list', component:() => import('@/views/User.vue')},
                  {path:'/projects', name:'projects' ,component:() => import('@/views/projectConfig.vue')},
                  {path:'/projects/add', name:'addProject' ,component:() => import('@/views/addProject.vue')},
                  {path:'/setting',  component:() => import('@/views/setting.vue')},
                  {path:'/roles',name:'role-list',  component:() => import('@/views/roles.vue')},
                  {path:'/addrole',  component:() => import('@/views/addrole.vue')},
                  {path:'/about/us',name:'about-us',  component:() => import('@/views/doc/about.vue')}
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