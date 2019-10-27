import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import NotFound from './404.vue'
import WeaponEdit from './tools/WeaponEdit.vue'
import Tool_Home from './tools/Home.vue'
import Tool_Local from './tools/LocalMode.vue'
import Tool_Management from './tools/ModeManagement.vue'
import Homedev from './views/HomeDev.vue'
import Edit from './components/Editor.vue'
import EditData from './components/Data.vue'
import HEXEdit from './components/HexEdit.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'tools',
    component: Homedev,
    children: [
      {
        path: '/home',
        component: Tool_Home,
        meta: { requiresAuth: false }
      },
      {
        path: '/local',
        component: Tool_Local,
        children: [
          {
            path: '/local/edit',
            component: Edit,
            meta: { requiresAuth: false }
          },
          {
            path: '/local/hexedit',
            component: HEXEdit,
            meta: { requiresAuth: false }
          },
        ],
        meta: { requiresAuth: false }
      },
      {
        path: '/management',
        component: Tool_Management,
        children: [
          {
            path: '/management/edit',
            component: Edit,
            meta: { requiresAuth: false }
          },
          {
            path: '/management/hexedit',
            component: HEXEdit,
            meta: { requiresAuth: false }
          },
        ],
        meta: { requiresAuth: false }
      },
      {
        path: '/mhwee',
        component: WeaponEdit,
        children: [
          {
            path: '/mhwee/edit',
            component: Edit,
            meta: { requiresAuth: false }
          },
          {
            path: '/mhwee/data',
            component: EditData,
            meta: { requiresAuth: true }
          },
          {
            path: '/mhwee/hexedit',
            component: HEXEdit,
            meta: { requiresAuth: true }
          }
        ],
        meta: { requiresAuth: false }
      },
    ],
    meta: { requiresAuth: false }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    children: [

    ]
  },

]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.getters.donelicense) {
      next()
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next()
  }
})

export default router
