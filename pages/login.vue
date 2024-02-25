<template>
  <div class="grow flex items-center justify-center">
    <Form class="border rounded p-4 w-96 border-gray-400 flex flex-col gap-4" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, meta }">
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">شماره همراه<ErrorMessage name="mobile" class="text-xs text-red-500" /></label>
        <Field name="mobile" id="mobile" type="text" v-model="userInfo.mobile" class="form_field_normal" :class="{'form_field_error': errors.mobile}" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">کد ملی<ErrorMessage name="password" class="text-xs text-red-500" /></label>
        <Field name="password" id="password" type="text" v-model="userInfo.password" class="form_field_normal" :class="{'form_field_error': errors.password}" />
      </div>
      <div class="text-sm text-red-500">{{ error }}</div>
      <button class="w-full bg-blue-400 text-white py-2 text-sm rounded disabled:bg-gray-400" :disabled="!meta.valid || loading" type="submit">ورود / ثبت نام</button>
    </Form>
  </div>
</template>

<script setup>
import { mainStore } from '~/store/main'
import { Form, Field, ErrorMessage, configure } from 'vee-validate';
import * as yup from 'yup';

const store = mainStore()
const router = useRouter()
const { $apis } = useNuxtApp()
const userInfo = ref({ mobile: '09353355536', password: '0073362141' })
const error = ref('')
const loading = ref(false)

configure({ validateOnBlur: true, validateOnChange: true, validateOnInput: true, validateOnModelUpdate: true })
const  schema = yup.object().shape({
  mobile: yup.string().required('ضروری').trim().matches(/^([0-9\s\-\+\(\)]*)$/ , 'نامعتبر'),
  password: yup.string().required('ضروری').trim().matches(/^[0-9]{10}$/ , 'نامعتبر'),
})

const onSubmit = async function() {
  loading.value = true
  const { data: data, error: err } = await $apis.users.login({}, userInfo.value)
  if (!data) {
    error.value = err.value.data.message
  } else {
    store.doLogin(data.value.data)
    router.push({ path: '/profile' })
  }
  loading.value = false
}
</script>
