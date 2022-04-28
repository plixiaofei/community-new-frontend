import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {Message, MessageBox} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

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
  },
  {
    path: '/notificationCenter',
    name: 'notificationCenter',
    component: () => import('@/components/leftNav/NotificationCenter.vue')
  },
  {
    path: '/replyCenter',
    name: 'replyCenter',
    component: () => import('@/components/leftNav/ReplyCenter.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");
  if (to.path === "/" || to.path === "/login" || to.path === "/question") {
    return true
  } else {
    if (token === "" || token === null) {
      ElMessage({
        message: "请登录后再查看",
        type: "warning"
      })
      router.push("/").then().catch(() => {})
    }
  }
  return true
})

export default router
