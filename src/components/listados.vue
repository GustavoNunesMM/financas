<template>
    <div v-if="itensAgrupadosMes.length > 0" class="flex text-black flex-col items-center bg-white w-full h-[500px]">
        <div v-for="(item, index) in itensAgrupadosMes" :key="index" class="bg-gray-200 p-2 m-2 flex flex-row">
            <div>
                <input type="text" placeholder="nome" v-model="item.nome" :disabled="index !== editando">
                <input type="text" placeholder="valor" @input="formatarValorNumerico" v-model="item.valor" :disabled="index !== editando">
                <input type="date" placeholder="data"  v-model="item.data" :disabled="index !== editando">
                <marcadores :index="index"/>
            </div>
            <button @click="chamarEdicao(index)">Editar Termo</button>
            <button @click="chamarRemover(index)">Remover Termo</button>
        </div>
    </div>
    
</template>

<script lang="ts">
import marcadores from './marcadores.vue'
import { useItensStore } from '../stores/itens'
import { storeToRefs } from 'pinia'

export default{
    components: {
        marcadores
    },
    setup() {
        const itensStore = useItensStore()
        const {itensAgrupadosMes, editando} = storeToRefs(itensStore)

        const chamarEdicao = (index: number) => { itensStore.editar(index) }

        function formatarValorNumerico(event:Event) {
            const input= (event.target as HTMLInputElement).value
            const response = itensStore.formatarValor(input)
            itensAgrupadosMes.value[editando.value] = {
                ...itensAgrupadosMes.value[editando.value],
                valor: response.valorFormatado,
                valorNumerico: response.valorNumerico
            }
        }

        const chamarRemover = (index:number) => itensStore.remover(index)


        return {itensAgrupadosMes,editando,chamarEdicao, chamarRemover, formatarValorNumerico}
}
}
</script>