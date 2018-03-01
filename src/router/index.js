import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sensors from '@/components/Sensor/Sensors'
import Groups from '@/components/Sensor/Groups'
import Uploader from '@/components/Sensor/Uploader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sensors',
      name: 'Sensors',
      component: Sensors
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Uploader
    }
  ]
})
