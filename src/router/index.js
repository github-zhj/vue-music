import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Recommend.vue'),
  },
  {
    path: '/search',
    name: 'SearchView',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/autoplay',
    name: 'AutoPlay',
    component: () => import('../views/AutoPlay.vue')
  },
  {
    path: '/songlist',
    name: 'SongList',
    component: () => import('../views/SongList.vue')
  },
  {
    path: '/musicmore',
    name: 'MusicMore',
    component: () => import('../views/MusicMore.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
