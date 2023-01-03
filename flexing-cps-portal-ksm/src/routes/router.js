import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import mqtt from '@/lib/utils/mqtt.js'
import { i18n } from '@/lang/lang'

Vue.use(Router)
// auth -> 권한 사용자 제한
// license -> license 사용자 제한

export const routes = [
  {
    path: '/app/sessions',
    component: () => import('@/views/app/sessions'),
    redirect: '/app/sessions/signIn',
    children: [
      {
        path: 'signIn',
        name: 'signIn',
        hidden: true,
        component: () => import('@/views/app/sessions/signIn'),
        meta: { name: 'sessions' }
      },
      {
        path: 'signOut',
        name: 'signOut',
        hidden: true,
        component: () => import('@/views/app/sessions/signOut'),
        meta: { name: 'sessions' }
      }
    ]
  },
  {
    path: '/app/product',
    component: () => import('@/views/app/product'),
    redirect: '/app/product/main',
    children: [
      {
        path: 'main',
        name: 'main',
        hidden: true,
        component: () => import('@/views/app/product/main'),
        meta: { name: 'product' }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/views/app'),
    redirect: '/app/sysmng/license',
    children: [
      {
        path: '/',
        meta: {
          name: 'license',
          step: 0
        },
        component: () => import('@/views/app/sysmng/license'),
        redirect: '/app/sysmng/license'
      },
      {
        path: '/app/sysmng/mngUserResource',
        name: 'mngUserResource',
        meta: {
          name: 'mngUserResource',
          step: 2,
          title: i18n.t('MngUserResource.index')
        },
        component: () => import('@/views/app/sysmng/mngUserResource/index'),
        redirect: '/app/sysmng/mngUserResource',
        children: [
          {
            path: '/app/sysmng/mngUserResource/main',
            name: 'mngUserResource',
            meta: {
              step: 1,
              title: i18n.t('MngUserResource.index'),
              description: '',
              img: require('@/assets/images/icons/menu-7.svg')
            },
            component: () => import('@/views/app/sysmng/mngUserResource/index')
          }
        ]
      },
      {
        path: '/app/sysmng/license',
        name: 'license',
        meta: {
          name: 'license',
          step: 2,
          title: i18n.t('license.index')
        },
        component: () => import('@/views/app/sysmng/license'),
        redirect: '/app/sysmng/license',
        children: [
          {
            path: '/app/sysmng/license',
            name: 'license',
            meta: {
              step: 1,
              title: i18n.t('license.index'),
              description: i18n.t('license.description.index')
            },
            component: () => import('@/views/app/sysmng/license/index')
          }
        ]
      },
      {
        path: '/app/data-market/profile-maker',
        name: 'profileMaker',
        meta: {
          name: 'profileMaker',
          step: 2,
          title: i18n.t('dataCollect.profileMaker')
        },
        component: () => import('@/views/app/dataCollect'),
        redirect: '/app/sysmng/license',
        children: [
          {
            path: '/app/data-market/profile-maker',
            name: 'profileMaker',
            meta: {
              step: 1,
              title: i18n.t('dataCollect.profileMaker'),
              description: i18n.t('dataCollect.description.profileMaker')
            },
            component: () => import('@/views/app/dataCollect/profileMaker/index')
          }
        ]
      },
      {
        path: '/app/data-market/opcua-modeler',
        name: 'opcuaModeler',
        meta: {
          name: 'opcuaModeler',
          step: 2,
          title: i18n.t('dataCollect.modeler')
        },
        component: () => import('@/views/app/dataCollect'),
        children: [
          {
            path: '/app/data-market/opcua-modeler',
            name: 'opcuaModeler',
            meta: {
              step: 1,
              title: i18n.t('dataCollect.modeler'),
              description: ''
            },
            component: () =>
              import('@/views/app/dataCollect/opcuaModeler/index')
          }
        ]
      },
      {
        path: '/app/sysmng',
        name: 'sysmng',
        meta: {
          name: 'sysmng',
          step: 1,
          title: i18n.t('MenuGroupOne.CollapseSysmng.title'),
          icon: 'i-Gear-2',
          img: require('@/assets/images/icons/menu-7.svg')
        },
        redirect: '/app/sysmng/user',
        component: () => import('@/views/app/sysmng'),
        children: [
          {
            path: '/app/sysmng/userResource',
            name: 'userResource',
            meta: {
              step: 2,
              title: i18n.t('UserResource.index'),
              description: '',
              icon: 'i-Gear-2'
            },
            component: () =>
              import('@/views/app/sysmng/userResource/index')
          },
          {
            path: '/app/sysmng/mngUserResource',
            name: 'mngUserResource',
            meta: {
              step: 2,
              title: i18n.t('MngUserResource.index'),
              description: '',
              icon: 'i-Gear-2'
            },
            component: () =>
              import('@/views/app/sysmng/mngUserResource/index')
          }
        ]
      },
      {
        path: '/app/error',
        meta: {
          name: 'error',
          step: 0
        },
        name: 'error',
        component: () => import('@/views/app/pages/notFound')
      },
      {
        path: '/app/preparing',
        meta: {
          name: 'preparing',
          step: 0
        },
        name: 'preparing',
        component: () => import('@/views/app/pages/preparing')
      }
    ]
  },
  {
    path: '/app/notNetwork',
    meta: {
      name: 'notNetwork',
      step: 0
    },
    name: 'notNetwork',
    component: () => import('@/views/app/pages/notNetwork')
  },
  {
    path: '/app/notPermission',
    meta: {
      name: 'notPermission',
      step: 0
    },
    name: 'notPermission',
    component: () => import('@/views/app/pages/notPermission')
  },
  {
    path: '*',
    meta: {
      name: 'notFound',
      step: 0
    },
    component: () => import('@/views/app/pages/notFound')
  }
]

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

/* 페이지 이동 직전에 beforeEach 함수가 실행 */
router.beforeEach((to, from, next) => {
  const pageAuth = ['signIn', 'main']

  if (to.path !== '/app/dashboards/monitoring') {
    // 대시보드 메뉴에서 벗어났을 경우 mqtt 연결 종료
    mqtt.destroyConnection()
  }

  if (pageAuth.indexOf(to.name) !== -1) {
    // 로그인이 필요 없는 페이지는 그냥 이동
    next()
  } else {
    /* 로그인이 필요한 페이지는 체크 후 통과 여부 결정 */
    // const accessToken = window.localStorage.getItem('access-token')
    try {
      if (to.path) {
        NProgress.start()
        NProgress.set(0.1)
      }
      next()
    } catch (err) {
      /* 토큰이 없는 상황에 대한 처리 */
      const nextUrl = '/app/sessions/signIn' // 로그인 페이지로 이동
      next(nextUrl)
    }
  }
})

router.afterEach(() => {
  /* Remove initial loading */
  const gullPreLoading = document.getElementById('loading_wrap')
  if (gullPreLoading) {
    gullPreLoading.style.display = 'none'
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 500)
  NProgress.done()
})

export default router
