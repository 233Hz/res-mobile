import route from './router'
import { useUserStore } from './store'

route.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // @ts-ignore
  if (to && to?.meta?.ignoreAuth) {
    next()
  } else if (to && to.name != 'login' && !userStore.hasToken()) {
    next({ name: 'login', params: { redirect: to.name!, ...to.query }, navType: 'replaceAll' })
  } else if (userStore.hasToken() && to.name === 'login') {
    next({ name: 'index', navType: 'replaceAll' })
  } else if (
    to &&
    //@ts-ignore
    to?.meta?.roles &&
    //@ts-ignore
    to.meta.roles.length &&
    //@ts-ignore
    !to.meta.roles.some((item) => userStore.info.roles.includes(item))
  ) {
    next({ name: 'login', params: { redirect: to.name!, ...to.query }, navType: 'replaceAll' })
  } else {
    next()
  }
})
