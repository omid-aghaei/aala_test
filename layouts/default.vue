<template>
  <div class="container mx-auto py-4 flex flex-col gap-4 min-h-screen">
    <MainHeader />
    <main class="border rounded p-4 grow flex flex-col">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>