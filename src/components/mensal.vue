<template>
    <div class="flex flex-col items-center">
        <div class="coluna bg-white">
            <div class="anoSelecionado" v-for="(ano, index) in anos" :key="index" @click="selecionarAno(ano)">
                {{ano}}
                {{ anoSelecionado }}
            </div>
            <div class="mesSelecionado" v-for="(mes, index) in meses" :key="index" @click="selecionarMes(index)">
                {{mes}}
            </div>
            {{ mesSelecionado }}
        </div>
        <div class="bg-gray-200">
            {{ itensAgrupadosMes }}
        </div>

    </div>
</template>

<script lang="ts">
import {ref} from 'vue'
import {useItensStore} from '../stores/itens'
import {storeToRefs} from 'pinia'


export default {
    setup() {
        const itensStore = useItensStore()
        const {mesSelecionado, meses, itensAgrupadosMes, anos, anoSelecionado} = storeToRefs(itensStore)
        const selecionarMes = (mes:number) => itensStore.selecionarMes(mes)
        const selecionarAno = (ano:string) => itensStore.selecionarAno(ano)
        selecionarMes(-1)
        

        return {
            meses,
            mesSelecionado,
            itensAgrupadosMes,
            anos,
            anoSelecionado,
            selecionarAno,
            selecionarMes
        }
    }
}
</script>