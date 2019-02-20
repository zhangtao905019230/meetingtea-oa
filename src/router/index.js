import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../view/login'], resolve)
    },
    {
      path: '/markdown-editor',
      name:'markdown-editor',
      component: resolve => require(['../widget/markdown-editor'], resolve)
    },
    {
      path: '/home',
      redirect:'/home/file-manager'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../view/home'], resolve),
      children:[
        {
          path: 'file-manager',
          name: 'file-manager',
          component: resolve => require(['../view/file-manager'], resolve),
        },
        {
          path: 'list-of-goods/:a/:b',
          name: 'list-of-goods',
          component: resolve => require(['../view/data-management/list-of-goods'], resolve),
        },
        {
          path: 'list-of-users',
          name: 'list-of-users',
          component: resolve => require(['../view/data-management/list-of-users'], resolve),
        },
        {
          path: 'list-of-articles',
          name: 'list-of-articles',
          component: resolve => require(['../view/data-management/list-of-articles'], resolve),
        },
        {
          path: 'list-of-testarticles',
          name: 'list-of-testarticles',
          component: resolve => require(['../view/data-management/list-of-testarticles'], resolve),
        },
        {
          path: 'add-goods',
          name: 'add-goods',
          component: resolve => require(['../view/add-data/add-goods'], resolve),
        },
        {
          path: 'add-articles',
          name: 'add-articles',
          component: resolve => require(['../view/add-data/add-articles'], resolve),
        },
        {
          path: 'dataset-mange',
          name: 'dataset-mange',
          component: resolve => require(['../view/ai-studio/dataset-manage'], resolve),
        },
        {
          path: 'object-detection',
          name: 'object-detection',
          component: resolve => require(['../view/ai-studio/object-detection'], resolve),
        }
      ]
    }
  ],
})


router.beforeEach((to, from, next) => {
  console.log({'token':localStorage.getItem('token')})
  if (to.path == "/login"){
    next()
  } else {
    if(localStorage.getItem('token')){
      if (localStorage.getItem('token')=='no'){
        next({path:'/login'})
      } else {
        next()
      }
    }else {
      localStorage.setItem('token','no')
      next({path:'/login'})
    }
  }
})

export default router
