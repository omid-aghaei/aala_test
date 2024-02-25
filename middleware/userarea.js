import { mainStore } from '~/store/main'
export default defineNuxtRouteMiddleware(async (to, from) => {
  const store = mainStore()
  if (store.login !== true) {
    return navigateTo('/login') // force login
  }
})