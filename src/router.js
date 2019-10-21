import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Edit from './components/Editor.vue'
import EditData from './components/Data.vue'
import HEXEdit from './components/HexEdit.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/edit',
        component: Edit,
        meta: { requiresAuth: false }
      },
      {
        path: '/data',
        component: EditData,
        meta: { requiresAuth: true }
      },
      {
        path: '/hexedit',
        component: HEXEdit,
        meta: { requiresAuth: true }
      }
    ]
  }
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
