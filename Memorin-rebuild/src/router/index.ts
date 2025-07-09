import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 主布局组件
import MainLayout from '../layouts/MainLayout.vue'

// 页面组件 - 懒加载
const DashboardView = () => import('../views/DashboardView.vue')
const KnowledgeView = () => import('../views/KnowledgeView.vue')
const ReviewView = () => import('../views/ReviewView.vue')
const MistakesView = () => import('../views/MistakesView.vue')
const StatisticsView = () => import('../views/StatisticsView.vue')
const NotesView = () => import('../views/NotesView.vue')

// 知识管理子路由
const KnowledgeBaseView = () => import('../views/knowledge/KnowledgeBaseView.vue')
const KnowledgeAreaView = () => import('../views/knowledge/KnowledgeAreaView.vue')
const KnowledgePointsView = () => import('../views/knowledge/KnowledgePointsView.vue')

// 复习相关子路由
const ReviewModeView = () => import('../views/review/ReviewModeView.vue')
const ReviewSessionView = () => import('../views/review/ReviewSessionView.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: {
          title: '仪表板',
          icon: '📊',
          requiresAuth: false // 暂时不需要认证，后续添加用户系统时启用
        }
      },
      {
        path: '/knowledge',
        name: 'Knowledge',
        component: KnowledgeView,
        meta: {
          title: '知识管理',
          icon: '📚',
          requiresAuth: false
        },
        children: [
          {
            path: '',
            name: 'KnowledgeBase',
            component: KnowledgeBaseView,
            meta: { title: '知识库管理' }
          },
          {
            path: 'base/:baseId',
            name: 'KnowledgeArea',
            component: KnowledgeAreaView,
            meta: { title: '知识区管理' },
            props: true
          },
          {
            path: 'area/:areaId',
            name: 'KnowledgePoints',
            component: KnowledgePointsView,
            meta: { title: '知识点管理' },
            props: true
          }
        ]
      },
      {
        path: '/review',
        name: 'Review',
        component: ReviewView,
        meta: {
          title: '开始复习',
          icon: '🎯',
          requiresAuth: false
        },
        children: [
          {
            path: '',
            name: 'ReviewMode',
            component: ReviewModeView,
            meta: { title: '选择复习模式' }
          },
          {
            path: 'session/:mode',
            name: 'ReviewSession',
            component: ReviewSessionView,
            meta: { title: '复习会话' },
            props: true
          }
        ]
      },
      {
        path: '/mistakes',
        name: 'Mistakes',
        component: MistakesView,
        meta: {
          title: '错题本',
          icon: '❌',
          requiresAuth: false
        }
      },
      {
        path: '/statistics',
        name: 'Statistics',
        component: StatisticsView,
        meta: {
          title: '统计分析',
          icon: '📈',
          requiresAuth: false
        }
      },
      {
        path: '/notes',
        name: 'Notes',
        component: NotesView,
        meta: {
          title: '笔记编辑器',
          icon: '📝',
          requiresAuth: false
        }
      },
      {
        path: '/test',
        name: 'ComponentTest',
        component: () => import('../views/ComponentTestView.vue'),
        meta: {
          title: '组件测试',
          icon: '🧪',
          requiresAuth: false
        }
      }
    ]
  },
  // 404 错误页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 路由切换时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Memorin`
  }
  
  // 认证检查（暂时跳过，后续添加用户系统时启用）
  // if (to.meta.requiresAuth && !userStore.isAuthenticated) {
  //   next({ name: 'Login' })
  //   return
  // }
  
  next()
})

export default router

// 导出路由类型定义
export type { RouteRecordRaw } from 'vue-router'
