import Vue from 'vue'
import Router from 'vue-router'
import ShelterMap from '@/components/GMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShelterMap',
      component: ShelterMap
    }
  ]
})
