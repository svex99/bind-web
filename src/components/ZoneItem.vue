<script setup lang="ts">
import { useRouter } from "vue-router"

defineProps<{
    origin: string
}>()
const router = useRouter()
</script>

<template>
    <div class="flex flex-row justify-between items-center px-5 py-2 border shadow">
        <div class="flex flex-row justify-between w-full mr-10">
            <div class="text-lg text-slate-700">{{ origin }}</div>
        </div>
        <RouterLink
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            :to="router.resolve({ name: 'ZoneDetailsView', params: { origin: origin } })">
            Detalles
        </RouterLink>
    </div>
</template>
