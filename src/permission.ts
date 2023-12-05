import router from './router'
import { useAuthStoreHook, useUserStoreHook } from './store'

router.beforeEach((to, from, next) => {
  const authStore = useAuthStoreHook()
  // @ts-ignore
  if (to && to?.meta?.ignoreAuth) {
    next()
  } else if (to && to.name != 'login' && !authStore.hasToken()) {
    next({
      name: 'login',
      params: { redirect: to.name!, ...to.query },
      navType: 'replaceAll'
    })
    console.log('bbb')
  } else if (authStore.hasToken() && to.name === 'login') {
    next({ name: 'home', navType: 'replaceAll' })
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
  // @ts-ignore
  if (to && to?.meta?.ignoreAuth) {
    return
  } else if (to && to.name != 'login' && !authStore.hasToken()) {
    router.replaceAll({
      name: 'login',
      params: { redirect: to.name!, ...to.query }
    })
    console.log('aaa')
  } else if (authStore.hasToken() && to.name === 'login') {
    router.replaceAll({ name: 'home' })
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
