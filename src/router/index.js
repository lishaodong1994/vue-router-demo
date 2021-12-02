// 路由原理：hash路由：location.hash切换  window.onhashchange监听路径的切换
// history路由： history.pushState切换  window.onpopstate 监听路径的切换
import Vue from 'vue'
import VueRouter from 'vue-router' //导入路由模块


Vue.use(VueRouter)    //加载使用路由模块【会定义好两个全局的组件router-view和router-link之后只可以直接使用<router-view>和<router-link>】
//写路由配置
const routes = [
  {
    path: '/films',
    //写在组件里边，子组件导入使用时要注册后使用，在这里不用注册，交给路由，他自己会自动注册的。
    // 使用()=>import('@/views/Films')路由懒加载的形式代替import Films from '@/views/Films'优化性能
    component: () => import('@/views/Films'),
    meta:{transitionPage:0},
    // 二级路由(嵌套路由)：films里面的路由。他的内容会插入到他的父组件留的<router-view>处。
    children: [
      { name: 'myNowplay', path: '/films/nowplaying', component: () => import('@/views/films/Nowplaying') },
      { path: '/films/comingsoon', component: () => import('@/views/films/Comingsoon') },
      { path: '/films', redirect: '/films/nowplaying' },
      //{ path: '/films', redirect: {name:'myNowplay'} },
    ]
  },
  { path: '/ctiy', component: () => import('@/views/Ctiy') , meta:{transitionPage:3},},
  { path: '/order', component: () => import('@/views/Order'), meta: { needLogin: true ,transitionPage:0} },
  {
    path: '/center', component: () => import('@/views/Center'),
    meta: { needLogin: true,transitionPage:0 } //meta（路由元信息）可以给路由带上一个自定义的数据
  },
  { path: '/login', component: () => import('@/views/Login'), meta:{transitionPage:5}},
  { path: '/cinemas', component: () => import('@/views/Cinemas'),meta:{transitionPage:2}
   // beforeEnter:(to,from,next)=>{//该路由独享的拦截 }  //局部拦截
  },
  { path: '/cinemas/search', component: () => import('@/views/Search'),meta:{transitionPage:4} },
  // name是给路由起个名字 alias外号。（命名路由）
  { name: 'myDetail', alias: '/detailabc', path: '/detail/:myid', component: () => import('@/views/Detail') ,meta:{transitionPage:1}},  //动态的二级路由:myid表示变量myid接收一个任意值。
  { path: '*', redirect: '/films' } //【写哪都行】重定向：遍历判断都没有则退而求其次走这个。重定向到一个想要的路径上。* 表示匹配全部。
]
// 路由的本质不过就是控制localtion.href并检测值来决定显示哪个对应组件。
//创建路由实例对象并导出
const router = new VueRouter({
  // 从hash模式转到history模式时我们就会发现一个问题：
  // 原先hash模式下是依据#后面的hash值来进行的，hash被后端解析到，但现在变为了pathname那块。
  // 这样前端的路由和后端的路由就一样了！就会被认为是发生了一个get请求到后端的相应的接口路由上。如果路由没有对应的接口，
  // 后端必然会返回404，那么浏览器必然会显示404
  // 但在开发模式下，有vuecli为我们配置了一个express后端服务器,服务器里做了一些处理，会自动去匹配前端路由，所以没有问题。
  // 可是，在生产模式下（打包后上线后），就没有了vuecli的加持。结果就出现了访问路由就去请求后端，后端没有对应路由接口就404的bug
  // 这在vuerouter文档中有说明处理方法：需要后端添加一些配置，去匹配前端路由。
  mode: 'history',//路由模式：history或hash模式。 
  routes: routes,
})
// 全局 的路由拦截 每次跳转路由之前会触发拦截（对所以路由都触发拦截） 
//to:到哪去  form：从哪来  next:放行函数（继续执行路由跳转）
router.beforeEach((to, from, next) => {
  //给路由添加拦截：路由meta中的属性在this.$route.meta可以访问。判断是否隐藏显示tabbar
  // import store from '@/store'
  // if(to.meta.isShow){
  //   store.commit('tabBarShow_true')
  // }else{
  //   store.commit('tabBarShow_false')
  // }
  //给路由添加拦截：路由meta中的属性 判断是否拦截
  if (to.meta.needLogin) {
    //判断本地存储中是否有token  (登陆后会有)
    if (localStorage.getItem('token')) {
      next()
    } else {
      //next('/login')  //没有token则跳转登陆 需要登陆
      next({ path: '/login', query: { aaa: to.fullPath } })  //也可以传一个对象  query会在链接的查询字符串上带过去一个?aaa=/xxx  【to.fullPath 来时的路由信息】
    }
  } else { next() }
})

export default router
