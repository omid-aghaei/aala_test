<template>
  <div>
      <Form class="grid grid-cols-3 gap-8" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, meta }">
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">نام<ErrorMessage name="first_name" class="text-xs text-red-500" /></label>
        <Field name="first_name" id="first_name" type="text" v-model="userData.first_name" class="form_field_normal" :class="{'form_field_error': errors.first_name}" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">نام خانوادگی<ErrorMessage name="last_name" class="text-xs text-red-500" /></label>
        <Field name="last_name" id="last_name" type="text" v-model="userData.last_name" class="form_field_normal" :class="{'form_field_error': errors.last_name}" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">جنسیت<ErrorMessage name="gender_id" class="text-xs text-red-500" /></label>
        <Field name="gender_id" id="gender_id" as="select" v-model="userData.gender_id" class="form_field_normal" :class="{'form_field_error': errors.gender_id}">
          <option v-for="g in genders" :key="g.id" :value="g.id">{{g.title}}</option>
        </Field>
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">رشته<ErrorMessage name="major_id" class="text-xs text-red-500" /></label>
        <Field name="major_id" id="major_id" as="select" v-model="userData.major_id" class="form_field_normal" :class="{'form_field_error': errors.major_id}">
          <option v-for="m in majors" :key="m.id" :value="m.id">{{m.title}}</option>
        </Field>
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">مقطع<ErrorMessage name="grade_id" class="text-xs text-red-500" /></label>
        <Field name="grade_id" id="grade_id" as="select" v-model="userData.grade_id" class="form_field_normal" :class="{'form_field_error': errors.grade_id}">
          <option v-for="g in grades" :key="g.id" :value="g.id">{{g.title}}</option>
        </Field>
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">مدرسه<ErrorMessage name="school" class="text-xs text-red-500" /></label>
        <Field name="school" id="school" type="text" v-model="userData.school" class="form_field_normal" :class="{'form_field_error': errors.school}" />
      </div>
      <div class="flex flex-col gap-1 col-span-3">
        <label for="" class="text-sm flex justify-between">آدرس<ErrorMessage name="address" class="text-xs text-red-500" /></label>
        <Field name="address" id="address" type="text" v-model="userData.address" class="form_field_normal" :class="{'form_field_error': errors.address}" />
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">استان<ErrorMessage name="province" class="text-xs text-red-500" /></label>
        <Field name="province" id="province" as="select" v-model="province" class="form_field_normal" :class="{'form_field_error': errors.province}" @change="clearCity">
          <option v-for="p in provinces" :key="p.id" :value="p.id">{{p.title}}</option>
        </Field>
      </div>
      <div class="flex flex-col gap-1">
        <label for="" class="text-sm flex justify-between">شهر<ErrorMessage name="shahr_id" class="text-xs text-red-500" /></label>
        <Field name="shahr_id" id="shahr_id" as="select" v-model="userData.shahr_id" class="form_field_normal" :class="{'form_field_error': errors.shahr_id}">
          <option v-for="c in cities" :key="c.id" :value="c.id">{{c.title}}</option>
        </Field>
      </div>
      <div class="flex items-end">
        <button class="w-full h-9 bg-blue-400 text-white py-2 pt-1 text-sm rounded disabled:bg-gray-400" :disabled="!meta.valid" type="submit">ذخیره</button>
      </div>
    </Form>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["userarea"] })

import { mainStore } from '~/store/main'
import { Form, Field, ErrorMessage, configure } from 'vee-validate';
import * as yup from 'yup';

const router = useRouter()
const { $apis } = useNuxtApp()
const store = mainStore()
const userStore = store.user

const { data: serverData, error: err } = await $apis.users.getUser(userStore.id, {}, {})

const userData = ref({
  first_name: serverData.value.data.first_name,
  last_name: serverData.value.data.last_name,
  address: serverData.value.data.address,
  school: serverData.value.data.school,
  major_id: serverData.value.data.major?.id,
  grade_id: serverData.value.data.grade?.id,
  gender_id: serverData.value.data.gender?.id,
  shahr_id: serverData.value.data.shahr?.id,
})

configure({ validateOnBlur: true, validateOnChange: true, validateOnInput: true, validateOnModelUpdate: true })
const  schema = yup.object().shape({
  first_name: yup.string().required('ضروری').trim(),
  last_name: yup.string().required('ضروری').trim(),
  address: yup.string().required('ضروری').trim(),
  school: yup.string().required('ضروری').trim(),
  province: yup.string().required('ضروری').trim(),
  major_id: yup.string().required('ضروری').trim(),
  grade_id: yup.string().required('ضروری').trim(),
  gender_id: yup.string().required('ضروری').trim(),
  shahr_id: yup.string().required('ضروری').trim(),
})

const { data: formData, error: baseErr } = await $apis.users.formData({})
const genders = formData.value.data.genders
const grades = formData.value.data.grades
const majors = formData.value.data.majors
const provinces = formData.value.data.provinces
const province = ref(1)
if (userStore.shahr !== null) { formData.value.data.cities.filter(x => x.province.id === userStore.shahr ) }
const cities = computed(() => { return formData.value.data.cities.filter(x => { if (province.value === null) { return false } return x.province.id === province.value }) })

const clearCity = function () { userData.value.shahr_id = null  }
const onSubmit = async function () {
  const { data: data, error: err } = await $apis.users.updateUser(userStore.id, {}, userData.value)
  if (!data.value) {
    // try proxy update user put request to bypass cors
    const { data: dataProxy, error: errProxy } = await $apis.users.updateUserProxy(userStore.id, {}, userData.value)
    router.push('/')
  } else {
    router.push('/')
  }
}
</script>