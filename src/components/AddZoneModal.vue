<script setup lang="ts">
import { type Zone, postZone } from "@/models"

defineProps({
    show: Boolean
})

const emit = defineEmits<{
    (e: "addZone", zone: Zone): void
    (e: "close"): void

}>()

function submitZoneForm(event: SubmitEvent) {
    const fd = new FormData(event.target as HTMLFormElement)
    const data = {
        origin: fd.get("origin"),
        ttl: fd.get("ttl"),
        nameServer: fd.get("nameServer"),
        admin: fd.get("admin"),
        refresh: Number(fd.get("refresh")),
        retry:  Number(fd.get("retry")),
        expire: Number(fd.get("expire")),
        minimum: Number(fd.get("minimum")),
    }
    console.log(data)
    postZone(data)
        .then(resp => {
            emit("addZone", resp)
            emit("close")
        })
        .catch(err => console.log(err))
}
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div class="relative top-20 mx-auto w-2/5 min-w-fit p-5 border-2 rounded-md bg-white">
                <form class="flex flex-col gap-2" 
                    @submit.prevent="submitZoneForm">
                    <div>
                        <label for="origin" class="block mb-2 text-sm font-medium text-gray-900">
                            Origen
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="text" id="origin" name="origin" placeholder="example.cu" required>
                    </div>
                    <div>
                        <label for="ttl" class="block mb-2 text-sm font-medium text-gray-900">
                            TTL
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="text" id="ttl" name="ttl" placeholder="2d" required>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900" for="nameServer">
                            Servidor de nombres
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="text" id="nameServer" name="nameServer" placeholder="ns1" required>
                    </div>
                    <div>
                        <label for="admin" class="block mb-2 text-sm font-medium text-gray-900">
                            Admin
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="text" id="admin" name="admin" placeholder="admin" required>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                        <label for="refresh" class="block mb-2 text-sm font-medium text-gray-900">
                            Refresh
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="number" id="refresh" name="refresh" value=86400 required>
                        </div>
                        <div>
                        <label for="retry" class="block mb-2 text-sm font-medium text-gray-900">
                            Retry
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="number" id="retry" name="retry" value=7200 required>
                        </div>
                        <div>
                        <label for="expire" class="block mb-2 text-sm font-medium text-gray-900">
                            Expire
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="number" id="expire" name="expire" value=3600000 required>
                        </div>
                        <div>
                        <label for="minimum" class="block mb-2 text-sm font-medium text-gray-900">
                            Minimum
                        </label>
                        <input
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="number" id="minimum" name="minimum" value=172800 required>
                        </div>
                    </div>
                    <div class="flex flex-row justify-end gap-12 mt-5">
                        <button
                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            type="button" @click="$emit('close')">
                            Cancelar
                        </button>
                        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            type="submit">
                            Añadir
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </Transition>

</template>
