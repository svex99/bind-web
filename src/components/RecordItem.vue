<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router";
import { type Record, patchRecord } from "@/models"
import DeleteIconVue from "./icons/DeleteIcon.vue";
import OKIconVue from "./icons/OKIcon.vue";
import EditIconVue from "./icons/EditIcon.vue";
import CancelIconVue from "./icons/CancelIcon.vue";

const origin = useRoute().params.origin as string
const props = defineProps<{
    index: number
    record: Record
}>()
const emit = defineEmits<{
    (e: "updateRecord", index: number, record: Record): void
    (e: "deleteRecord", index: number): void
}>()

let editing = ref(false)
let recordString = ref("")

bindRecord(props.record)

function bindRecord(record: Record) {
    const r = Object(record)
    switch (record.type) {
        case "A":
            recordString.value = `${r.name} IN A ${r.ip}`
            break;
        case "NS":
            recordString.value = `@ IN NS ${r.nameServer}`
            break;
        case "MX":
            recordString.value = `@ IN MX ${r.priority} ${r.emailServer}`
            break;
        case "TXT":
            recordString.value = `@ IN TXT "${r.value}"`
            break;
        case "CNAME":
            recordString.value = `${r.srcName} IN CNAME ${r.dstName}`
            break;
        default:
            break;
    }
}

function updateRecord(event: SubmitEvent) {
    const fd = new FormData(event.target as HTMLFormElement)
    let data = {} as any
    for (const [k, v] of fd.entries()) {
        data[k] = v
    }
    data.type = props.record.type
    patchRecord(origin, recordString.value, data)
        .then(resp => {
            emit("updateRecord", props.index, resp)
            bindRecord(resp)
            editing.value = false
        })
        .catch(err => console.log(err))
}
</script>

<template>
    <div class="flex flex-row justify-between items-center py-1 px-5 w-full border shadow-sm hover:bg-slate-100">
        <template v-if="!editing">
            <div class="text text-slate-700">{{ recordString + "\n" }}</div>
            <div class="flex flex-row gap-10">
                <button @click="editing = true">
                    <EditIconVue />
                </button>
                <button @click="emit('deleteRecord', index)">
                    <DeleteIconVue />
                </button>
            </div>
        </template>
        <form v-else @submit.prevent="updateRecord" class="flex flex-row justify-between items-center w-full">
            <template v-if="record.type === 'A'">
                <div class="input-container">
                    <label>Nombre</label>
                    <input type="text" name="name" required="true" />
                </div>
                <div class="input-container">
                    <label>IP</label>
                    <input type="text" name="ip" required="true" />
                </div>
            </template>
            <template v-else-if="record.type === 'NS'">
                <div class="input-container">
                    <label>Servidor de Nombres</label>
                    <input type="text" name="nameServer" required="true" />
                </div>
            </template>
            <template v-else-if="record.type === 'MX'">
                <div class="input-container">
                    <label>Prioridad</label>
                    <input type="number" name="priority" required="true" />
                </div>
                <div class="input-container">
                    <label>Servidor de Correo</label>
                    <input type="text" name="emailServer" required="true" />
                </div>
            </template>
            <template v-else-if="record.type === 'TXT'">
                <div class="input-container">
                    <label>Valor</label>
                    <textarea required="true" name="value" rows="1"></textarea>
                    <p class="text-xs text-red-500">No encierre el valor entre comillas</p>
                </div>
            </template>
            <template v-else-if="record.type === 'CNAME'">
                <div class="input-container">
                    <label>Fuente</label>
                    <input type="text" name="srcName" required="true" />
                </div>
                <div class="input-container">
                    <label>Destino</label>
                    <input type="text" name="dstName" required="true" />
                </div>
            </template>
            <p v-else>Tipo de registro desconocido '{{ record.type }}'</p>

            <div class="flex flex-row gap-10">
                <button @click="editing = false">
                    <CancelIconVue />
                </button>
                <button type="submit">
                    <OKIconVue />
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
button {
    @apply p-1 border rounded shadow-sm;
}

input, textarea {
    @apply text-sm rounded-lg p-1 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500;
}

.input-container {
    @apply flex flex-row items-center gap-2;
}
</style>