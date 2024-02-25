<template>
  <div class="container mx-auto flex items-center justify-center grow">
    <div class="text-gray-400 select-none text-lg">
      صفحه ویژه کاربران
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["userarea"] })
</script>