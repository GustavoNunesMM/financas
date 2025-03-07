<template>
    <div class="flex  flex-col items-center">
        <input class="text-black" type="text"  placeholder="Nome" v-model="nome">
        <input class="text-black" type="number" @input="chamarFormatarValor" placeholder="Digite um valor" v-model="valorFormatado" />
        <input class="text-black" type="date" placeholder="Digitar data" v-model="data" />
        <div class="flex flex-row">
            <input id="debito" class="text-black" type="checkbox" @click="alterarTipoGasto" :checked="tipoGasto === 0"/> 
            <label for="debito">debito</label>
            <input id="credito" class="text-black" type="checkbox" @click="alterarTipoGasto" :checked="tipoGasto === 1" />
            <label for="credito">debito</label>
        </div>
        <marcadores :index="-1"/>
        <button @click="chamarAdcionarValor()">Adicionar</button>
    </div>
    
</template>

<script lang="ts">
import type { StoreGeneric } from 'pinia'
import marcadores from './marcadores.vue'

import { useItensStore } from '../stores/itens'
import { storeToRefs } from 'pinia'

export default{
    components:{ 
        marcadores
    },
    setup() {
        const itensStore = useItensStore()
        const {itens, nome, valorFormatado, valorNumerico, data, tipoGasto} = storeToRefs(itensStore as StoreGeneric)

        const chamarFormatarValor = (event:Event) => {
            const input= (event.target as HTMLInputElement).value
            const respose = itensStore.formatarValor(input)
            valorFormatado.value = respose.valorFormatado
            valorNumerico.value = respose.valorNumerico
        }
        const chamarAdcionarValor = () => itensStore.adicionarValor()
        const alterarTipoGasto = () => itensStore.alterarGasto()

        return {
            nome, 
            data,
            tipoGasto,
            valorFormatado,
            itens,
            valorNumerico,
            chamarAdcionarValor,
            chamarFormatarValor,
            alterarTipoGasto
        }
    }
}

</script>

