<script setup lang="ts">
import Header from "@/components/Header.vue"
</script>

<template>
  <Header />
  <div class="p-5">
    <div class="p-5 max-w-5xl mx-auto border rounded-lg dark:bg-gray-800">
    <router-view />
  </div>
  </div>
  
</template>
