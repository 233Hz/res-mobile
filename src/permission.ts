import router from './router'
import { useUserStore } from './store'

router.beforeEach((to, from, next) => {
  console.log(to, from)

  const userStore = useUserStore()
  // @ts-ignore
  if (to && to?.meta?.ignoreAuth) {
    next()
  } else if (to && to.name != 'login' && !userStore.hasToken()) {
    next({ name: 'login', params: { redirect: to.name!, ...to.query }, navType: 'replaceAll' })
  } else if (userStore.hasToken() && to.name === 'login') {
    next({ name: 'home', navType: 'replaceAll' })
  } else if (
    to &&
    //@ts-ignore
    to?.meta?.roles &&
    //@ts-ignore
    to.meta.roles.length &&
    //@ts-ignore
    !to.meta.roles.some((item) => userStore.info.roles.includes(item))
  ) {
    next({ name: '404' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  console.log(to)

  const userStore = useUserStore()
  // @ts-ignore
  if (to && to?.meta?.ignoreAuth) {
    return
  } else if (to && to.name != 'login' && !userStore.hasToken()) {
    router.push({ name: 'login', params: { redirect: to.name!, ...to.query } })
  } else if (userStore.hasToken() && to.name === 'login') {
    router.replaceAll({ name: 'home' })
  } else if (
    to &&
    //@ts-ignore
    to?.meta?.roles &&
    //@ts-ignore
    to.meta.roles.length &&
    //@ts-ignore
    !to.meta.roles.some((item) => userStore.info.roles.includes(item))
  ) {
    router.push({ name: '404' })
  }
})
