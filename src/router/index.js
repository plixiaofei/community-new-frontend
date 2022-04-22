import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/profiler',
    name: 'profiler',
    component: () => import('@/views/user/ProfilerView.vue')
  },
  // 跳到其他用户页面
  {
    path: '/user/:username',
    name: 'user',
    component: () => import('@/views/user/OtherUserView.vue')
  },
  // 跳到问题页面
  {
    path: '/question/:questionId',
    name: 'question',
    component: () => import('@/views/QuestionView.vue')
  },
  // 左栏
  {
    path: '/publishQuestion',
    name: 'publishQuestion',
    component: () => import('@/components/leftNav/PublishQuestion.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
