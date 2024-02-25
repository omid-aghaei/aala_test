import { defineStore } from 'pinia'

export const mainStore = defineStore('alaa',{
  state: () => ({
    login: false,
    token: '_',
    user: '_',
  }),
  actions: {
    doLogin(data) {
      console.log(data)
      this.login = true
      this.token = data.access_token
      this.user = data.user
    },
    doLogout() {
      this.login = false
      this.token = '_'
      this.user = '_'
    }
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  }
})
