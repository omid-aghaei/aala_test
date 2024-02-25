<template>
  <header class="border rounded p-4 flex gap-8 text-sm">
    <nuxtLink to="/" class="text-black no-underline" exactActiveClass="underline">صفحه اصلی</nuxtLink>
    <nuxtLink to="/page2" class="text-black no-underline" exactActiveClass="underline">صفحه دوم</nuxtLink>
    <nuxtLink to="/page3" class="text-black no-underline" exactActiveClass="underline">صفحه ویژه کاربران</nuxtLink>
    <nuxtLink to="/profile" class="text-black no-underline mr-auto" exactActiveClass="underline">پروفایل</nuxtLink>
    <div class="text-black cursor-pointer" exactActiveClass="underline" v-if="login" @click="logout()">خروج</div>
  </header>
</template>

<script setup>
import { mainStore } from '~/store/main'
const store = mainStore()
const router = useRouter()
const login = computed(() => store.login )
const logout = function() {
  store.doLogout()
  router.push({ path: '/' })
}
</script>