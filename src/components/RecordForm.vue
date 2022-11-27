<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { postRecord } from "@/models"

const origin = useRoute().params.origin as string
let type = ref("")
const emit = defineEmits<{
    (e: "addRecord", data: any): void
}>()

function addRecord(event: SubmitEvent) {
    const fd = new FormData(event.target as HTMLFormElement)
    let data = {} as any
    for (const [k, v] of fd.entries()) {
        data[k] = v
    }
    postRecord(origin, data)
        .then(resp => {
            emit("addRecord", resp)
        })
        .catch(err => console.log(err))
}
</script>

<template>
    <form class="flex flex-row justify-start gap-3 w-full" @submit.prevent="addRecord">
        <div class="flex flex-row items-center gap-3 p-2 border shadow">
            <label for="type-select">
                Tipo
            </label>
            <select v-model="type" name="type" id="type-select" class="p-2 rounded-md shadow-sm text-slate-700">
                <option disabled value="">-</option>
                <option value="NS">NS</option>
                <option value="A">A</option>
                <option value="MX">MX</option>
                <option value="CNAME">CNAME</option>
                <option value="TXT">TXT</option>
            </select>
        </div>
        <div class="flex flex-row justify-between items-center p-2 w-full border shadow">
            <div v-if="type === ''" class="recordForm">
                <p>Selecciona un tipo de registro para añadir uno nuevo.</p>
            </div>
            <div v-else-if="type === 'NS'" class="recordForm">
                <div class="field-container">
                    <label for="ns-nameServer">Servidor de Nombres</label>
                    <input
                        type="text" required="true" name="nameServer" id="ns-nameServer">
                </div>
            </div>
            <div v-else-if="type === 'A'" class="recordForm">
                <div class="field-container">
                    <label for="a-name">Nombre</label>
                    <input type="text" required="true" name="name" id="a-name">
                </div>
                <div class="field-container">
                    <label for="a-ip">IP</label>
                    <input type="text" required="true" name="ip" id="a-ip">
                </div>
            </div>
            <div v-else-if="type === 'MX'" class="recordForm">
                <div class="field-container">
                    <label for="mx-priority">Prioridad</label>
                    <input type="number" name="priority" id="mx-priority">
                </div>
                <div class="field-container">
                    <label for="mx-emailServer">IP</label>
                    <input type="text" required="true" name="emailServer" id="mx-emailServer">
                </div>
            </div>
            <div v-else-if="type === 'CNAME'" class="recordForm">
                <div class="field-container">
                    <label for="cname-srcName">Fuente</label>
                    <input type="text" required="true" name="srcName" id="cname-srcName">
                </div>
                <div class="field-container">
                    <label for="cname-dstName">Destino</label>
                    <input type="text" required="true" name="dstName" id="cname-dstName">
                </div>
            </div>
            <div v-else-if="type === 'TXT'" class="recordForm">
                <div class="field-container">
                    <label for="txt-value">Texto</label>
                    <textarea required="true" name="value" id="txt-value" rows="1"></textarea>
                </div>
            </div>
            <button v-if="type !== ''"
                class="inline-block p-2.5 bg-gray-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                type="submit">
                Añadir Registro
            </button>
        </div>
    </form>
</template>

<style scoped>
label {
    @apply text-sm font-medium text-gray-900;
}

input, textarea {
    @apply text-sm rounded-lg p-1 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500;
}

.recordForm {
    @apply flex flex-row gap-10;
}

.field-container {
    @apply flex flex-row gap-3 items-center
}
</style>
