import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import register from '@/components/register'

Vue.use(Router)

const router =  new Router({
  mode: 'history', //去掉url中#
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页',
        requiresAuth: 'true', // 需要验证
      },
      component: index
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        requiresAuth: false, //不需要登录
      },
      component: login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
        requiresAuth: false, //不需要登录
      },
      component: register,
    }
  ]
})

//路由拦截
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    // 判断是否有标题
    document.title = to.meta.title;
  }
  // 通过requiresAuth判断当前路由导航是否要登录
  if(to.matched.some(record => record.meta.requiresAuth)){
    let token = sessionStorage.getItem('token');
    //还未登录
    if(!token){
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }else{
      next();
    }
  }else{
    next(); //确保一定调用next
  }

})

export default router;