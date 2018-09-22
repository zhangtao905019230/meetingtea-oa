import Vue from 'vue'
import Router from 'vue-router'
import home from './../view/home'
import FileManager from './../view/file-manager'
import ListOfGoods from './../view/list-of-goods'
import AddGoods from './../view/add-goods'
import login from './../view/login'

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
      component: login},
    {
      path: '/home',
      redirect:'/home/add-goods'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {
          path: 'file-manager',
          name: 'file-manager',
          component: FileManager,
        },
        {
          path: 'list-of-goods',
          name: 'list-of-goods',
          component: ListOfGoods,
        },
        {
          path: 'add-goods',
          name: 'add-goods',
          component: AddGoods,
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
