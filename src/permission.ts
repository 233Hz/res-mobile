import router from './router'
import { useAuthStoreHook, useUserStoreHook } from './store'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStoreHook()
  if (to && to.name != 'login' && !authStore.hasToken()) {
    next({
      name: 'login',
      params: { redirect: to.name!, ...to.query },
      navType: 'replaceAll'
    })
  } else if (authStore.hasToken() && to.name === 'login') {
    next({ name: 'home', navType: 'replaceAll' })
  }
  // @ts-ignore
  else if (to && to?.meta?.ignoreAuth) {
    next()
  } else if (
    to &&
    //@ts-ignore
    to.meta?.roles &&
    //@ts-ignore
    to.meta.roles.length &&
    //@ts-ignore
    !to.meta.roles.some((item) => useUserStoreHook().user.roles.includes(item))
  ) {
    next({ name: '404' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  const authStore = useAuthStoreHook()
  if (to && to.name != 'login' && !authStore.hasToken()) {
    router.push({ name: 'login', params: { redirect: to.name!, ...to.query } })
  } else if (authStore.hasToken() && to.name === 'login') {
    router.replaceAll({ name: 'home' })
  }
  // @ts-ignore
  else if (to && to?.meta?.ignoreAuth) {
    return
  } else if (
    to &&
    //@ts-ignore
    to?.meta?.roles &&
    //@ts-ignore
    to.meta.roles.length &&
    //@ts-ignore
    !to.meta.roles.some((item) => useUserStoreHook().user.roles.includes(item))
  ) {
    router.push({ name: '404' })
  }
})
