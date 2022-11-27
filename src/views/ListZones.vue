<script setup lang="ts">
import { ref } from "vue"
import ZoneItem from "@/components/ZoneItem.vue"
import AddZoneModalVue from "@/components/AddZoneModal.vue"
import { type Zone, getZones } from "@/models"

const zones = ref<Zone[]>([])
const showAddZoneModal = ref(false)

getZones()
    .then(resp => {
        zones.value = resp
    })
    .catch(err => console.log(err))

function addZoneEvent(zone: Zone) {
    zones.value.push(zone)
}
</script>

<template>
    <div class="relative overflow-x-auto sm:rounded-lg space-y-5">
        <div class="flex justify-between">
            <div class="text-xl mx-5">Zonas</div>
            <button
                class="inline-block px-6 py-2.5 mr-5 bg-green-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                type="button" @click="showAddZoneModal = true">
                Añadir Zona
            </button>
        </div>
        <div class="flex flex-col w-full gap-2 text-gray-500">
            <ZoneItem v-for="zone in zones" :key="zone.origin" :origin="zone.origin" />
        </div>
    </div>
    <Teleport to="body">
        <AddZoneModalVue :show="showAddZoneModal" @close="showAddZoneModal = false" @add-zone="addZoneEvent" />
    </Teleport>
</template>
