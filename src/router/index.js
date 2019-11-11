import Vue from 'vue'
import Router from 'vue-router'
import env from '@/config/env'

Vue.use(Router)

const lazyLoad =
  process.env.NODE_ENV === 'production'
    ? file => () => import(/* webpackChunkName: "[request]" */ `@/views/${file}`)
    : file => require(`@/views/${file}`).default

// header 和 tabbar 如何控制
const routes = [
  {
    path: '',
    name: 'index',
    alias: '/index',
    component: lazyLoad('index'),
    meta: { title: '首页' },
  },
]

if (env.isEnv('prod')) {
  // routes.unshift({
  //   name: 'debug',
  //   component: lazyLoad('common/debug'),
  //   meta: { title: 'Debug 调试页面' },
  // })
}

routes.push(
  // 处理特殊路由
  {
    path: '*',
    redirect: '/', // 必须有对应路由，不然会栈溢出
  },
)

// add route path
routes.forEach(route => {
  if (typeof route.path === 'undefined') route.path = '/' + (route.name || '')
})

const router = new Router({
  mode: env.routerMode,
  base: env.routerBase,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
      // 如果想要模拟滚动到锚点的行为
      // if (to.hash) {
      //   return {
      //     selector: to.hash,
      //   }
      // }
    }
  },
  routes,
})

export default router
