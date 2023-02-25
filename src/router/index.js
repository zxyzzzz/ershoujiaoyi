import Vue from 'vue'
import Router from 'vue-router'
import Head from '../components/Head.vue'
import Home from '../components/Home.vue'
import Shoopcart from '../components/Shoopcart.vue'
import User from '../components/User.vue'
import Denglu from '../components/Denglu.vue'
import Zhuce from '../components/Zhuce.vue'
import Shangpin from '../components/Shangpin'
import Upload from '../components/Upload'
import UploadEdit from '../components/UploadEdit'
import Jiesuan from '../components/Jiesuan'
import Jiesuan2 from '../components/Jiesuan2'
import Administrators from '../components/Administrators'
import Forget from '../components/Forget'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/head',
      name: 'Head',
      component: Head
    },
    {
      path: '/shoopcart',
      name: 'Shoopcart',
      component: Shoopcart
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/administrators',
      name: 'Administrators',
      component: Administrators
    },
    {
      path: '/denglu',
      name: 'Denglu',
      component: Denglu
    },
    {
      path: '/zhuce',
      name: 'Zhuce',
      component: Zhuce
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/shangpin',
      name: 'Shangpin',
      component: Shangpin,
      // props: route => ({ abc: route.params.abc })
      // props:function(route){
      //   return { 
      //     abc: route.params.abc 
      //   }
      // }
    },
    {
      path: '/uploadEdit',
      name: 'UploadEdit',
      component: UploadEdit
    },
    {
      path: '/jiesuan',
      name: 'Jiesuan',
      component: Jiesuan
    },
    {
      path: '/jiesuan2',
      name: 'Jiesuan2',
      component: Jiesuan2
    },

  ]
})
