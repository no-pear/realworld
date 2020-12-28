import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a79861b4 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _656697db = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _47a4abed = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _10f6811f = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _9dcb0f0c = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _6b5f95a6 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _c4831610 = () => interopDefault(import('..\\pages\\create' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _a79861b4,
    children: [{
      path: "/",
      component: _656697db,
      name: "home"
    }, {
      path: "/login",
      component: _47a4abed,
      name: "login"
    }, {
      path: "/register",
      component: _47a4abed,
      name: "register"
    }, {
      path: "/settings",
      component: _10f6811f,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _9dcb0f0c,
      name: "article"
    }, {
      path: "/profile/:username",
      component: _6b5f95a6,
      name: "profile"
    }, {
      path: "/create",
      component: _c4831610,
      name: "create"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
