import { mainStore } from '~/store/main'

import users from '@/api/users'

export default defineNuxtPlugin(async (nuxtApp) => {
  // prepare base urls
  const cc = useRuntimeConfig()
  const api = process.server === false ? cc.public.api : cc.api

  // prepare user data
  const router = useRouter()
  const store = mainStore()
  const token = computed(() => { return store.token })
  const user_id = computed(() => { return store.user_id })
  const headers = computed(() => {
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    if (token.value !== '_') { headers.Authorization = 'Bearer ' + token.value }
    return headers
  })
  const tokenCheck = function(error) {  if (error && error.value && error.value.statusCode === 400) { store.doLogout();  router.push({ path: '/login' })  } }

  // generate api factory
  const api_factory = {
    users: users(api, headers, user_id, tokenCheck),
  }

  // return provider
  return { provide: { apis: api_factory } }
})