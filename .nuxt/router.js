import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d8985dbc = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _c0922e52 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _575e7a71 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _187df41b = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _8cca9404 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _5a5f1a9e = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _f5831218 = () => interopDefault(import('..\\pages\\create' /* webpackChunkName: "" */))

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
    component: _d8985dbc,
    children: [{
      path: "/",
      component: _c0922e52,
      name: "home"
    }, {
      path: "/login",
      component: _575e7a71,
      name: "login"
    }, {
      path: "/register",
      component: _575e7a71,
      name: "register"
    }, {
      path: "/settings",
      component: _187df41b,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _8cca9404,
      name: "article"
    }, {
      path: "/profile/:username",
      component: _5a5f1a9e,
      name: "profile"
    }, {
      path: "/create",
      component: _f5831218,
      name: "create"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
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
