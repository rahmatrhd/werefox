import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
import dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/dashboard',
      component: dashboard
    }
  ]
})
