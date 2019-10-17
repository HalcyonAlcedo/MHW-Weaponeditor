import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Edit from './components/Editor.vue'
import EditData from './components/Data.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/edit',
          component: Edit,
          meta: { requiresAuth: true }
        },
        {
          path: '/data',
          component: EditData,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
