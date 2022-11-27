<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router";
import { type Zone, type Record, getZone, patchZone, deleteZone, deleteRecord } from "@/models"
import RecordItemVue from "@/components/RecordItem.vue";
import RecordFormVue from "@/components/RecordForm.vue";

const router = useRouter()
const origin = useRoute().params.origin as string
const zone = ref<Zone>()
const records = ref<Record[]>([])
const editing = ref<Boolean>(false)

let zoneTtl = ref("")
let zoneNameServer = ref("")
let zoneAdmin = ref("")
let zoneRetry = ref<number | string>()
let zoneRefresh = ref<number | string >()
let zoneMinimum = ref<number | string>()
let zoneExpire = ref<number | string >()

function bindZone(resp: Zone) {
    zone.value = resp
    zoneTtl.value = resp.ttl
    zoneNameServer.value = resp.soaRecord.nameServer
    zoneAdmin.value = resp.soaRecord.admin
    zoneRetry.value = resp.soaRecord.retry
    zoneRefresh.value = resp.soaRecord.refresh
    zoneMinimum.value = resp.soaRecord.minimum
    zoneExpire.value = resp.soaRecord.expire
    records.value = resp.records
}

getZone(origin)
    .then(resp => bindZone(resp))
    .catch(err => console.log(`error getting zone ${origin}\n`, err))

function deleteZoneEvent(_event: Event) {
    deleteZone(origin)
        .then(resp => router.push({ name: "ListZones" }))
        .catch(err => console.log(err))
}

function addRecordEvent(record: Record) {
    records.value.push(record)
}

function updateRecordEvent(index: number, record: Record) {
    records.value[index] = record
}

function deleteRecordEvent(index: number) {
    deleteRecord(origin, records.value[index])
        .then(resp => {
            records.value.splice(index, 1)
        })
        .catch(err => console.log(err))
}

function toggleEditing() {
    if (editing.value) {
        let data = {
            origin: zone.value?.origin,
            ttl: zoneTtl.value,
            nameServer: zoneNameServer.value,
            admin: zoneAdmin.value,
            retry: Number(zoneRetry.value),
            refresh: Number(zoneRefresh.value),
            minimum: Number(zoneMinimum.value),
            expire: Number(zoneExpire.value),
        }
        console.log(data)
        patchZone(data)
            .then(resp => bindZone(resp))
            .catch(err => console.log(err))
    }
    editing.value = !editing.value
}

</script>

<template>
    <div class="flex flex-col items-end gap-3">
        <div class="flex flex-col w-full gap-2 p-3 border shadow rounded-t-md">
            <div class="flex flex-row flex-wrap justify-between gap-3 w-full">
                <div class="zone-attr-container">
                    <label>TTL:</label>
                    <div v-if="!editing">{{ zoneTtl }}</div>
                    <input v-else type="text" v-model="zoneTtl" class="w-20"/>
                </div>
                <div class="zone-attr-container">
                    <label>Servidor de Nombres:</label>
                    <div v-if="!editing">{{ zoneNameServer }}</div>
                    <input v-else type="text" v-model="zoneNameServer"/>
                </div>
                <div class="zone-attr-container">
                    <label>Admin:</label>
                    <div v-if="!editing">{{ zoneAdmin }}</div>
                    <input v-else type="text" v-model="zoneAdmin"/>
                </div>
                <button
                    class="px-3 py-2 w-fit bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    type="button" @click="toggleEditing">
                    {{ editing ? "Hecho" : "Editar Zona" }}
                </button>
            </div>
            <div class="flex flex-row flex-wrap justify-between w-full">
                <div class="zone-attr-container">
                    <label>Serial:</label>
                    <div>{{ zone?.soaRecord.serial }}</div>
                </div>
                <div class="zone-attr-container">
                    <label>Retry:</label>
                    <div v-if="!editing">{{ zoneRetry }}</div>
                    <input v-else type="number" v-model="zoneRetry"/>
                </div>
                <div class="zone-attr-container">
                    <label>Minimum:</label>
                    <div v-if="!editing">{{ zoneMinimum }}</div>
                    <input v-else type="number" v-model="zoneMinimum"/>
                </div>
                <div class="zone-attr-container">
                    <label>Refresh:</label>
                    <div v-if="!editing">{{ zoneRefresh }}</div>
                    <input v-else type="number" v-model="zoneRefresh"/>
                </div>
                <div class="zone-attr-container">
                    <label>Expire:</label>
                    <div v-if="!editing">{{ zoneExpire }}</div>
                    <input v-else type="number" v-model="zoneExpire"/>
                </div>
            </div>
        </div>

        <RecordFormVue @add-record="addRecordEvent" />

        <div class="flex flex-col items-center gap-2 p-3 w-full shadow border rounded-b-md">
            <RecordItemVue v-if="records.length > 0" v-for="(record, index) in records" :key="index" :index="index"
                :record="record" @update-record="updateRecordEvent" @delete-record="deleteRecordEvent" />
            <p v-else>No hay registros en esta zona</p>
        </div>

        <button
            class="inline-block px-6 py-2.5 mt-5 w-fit bg-red-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
            type="button" @click="deleteZoneEvent">
            Eliminar Zona
        </button>
    </div>
</template>

<style scoped>
.zone-attr-container {
    @apply flex flex-row items-center gap-2;
}

label {
    @apply text-sm underline text-slate-600 decoration-slate-400;
}

input {
    @apply border px-3 rounded-md;
}

input[type=number] {
    @apply w-32;
}
</style>