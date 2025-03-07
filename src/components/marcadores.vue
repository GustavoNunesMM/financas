<template>
    <div class="bg-white w-[400px]">
        <button class="w-full" @click="chamarAlterarMarcador">{{ marcadorSelecionado }}</button>
        <div v-if="selecionarMarcador && index === editando">
            <div v-for="(marcador, index) in marcadoresFiltrados" :key="index" @click="chamarselecionarMarcador(index)">
                {{marcador}}
            </div>
            <input type="text" v-model="filtroMarcadores" >
        </div>

    </div>
</template>

<script lang="ts">
import {watch} from 'vue'
import { useMarcadorStore } from '../stores/marcador'
import { storeToRefs } from 'pinia'
import { useItensStore } from '../stores/itens'

export default{
    props:{
        index: {
            type: Number,
            required: true
        }
    },
    setup(props) {
    const index = props.index

    const marcadorStore = useMarcadorStore()
    const {marcadores, filtroMarcadores, marcadoresFiltrados} = storeToRefs(marcadorStore)

    const itensStore = useItensStore()
    const {editando, selecionarMarcador, marcadorSelecionado} = storeToRefs(itensStore)
    
    
    marcadorStore.filtrarMarcador()
    
        watch(filtroMarcadores, (value) => {
        // Limpa o array de marcadores filtrados
        marcadoresFiltrados.value = [];
        // Filtra os marcadores com base no valor do filtro
        value? marcadoresFiltrados.value = marcadores.value.filter((marcador) => marcador.includes(value)) 
        : marcadoresFiltrados.value = [...marcadores.value]
        })

    const chamarAlterarMarcador = () => {
        index === editando.value ? itensStore.alterarMarcador() : null
        }

    const chamarselecionarMarcador = (index:number) => {
        const novoMarcador = marcadores.value[index]
        itensStore.selecionarMarcadorLista(novoMarcador)
        }

    return {
        editando,
        index,
        marcadores,
        filtroMarcadores,
        marcadorSelecionado,
        selecionarMarcador,
        marcadoresFiltrados,
        chamarAlterarMarcador,
        chamarselecionarMarcador
        }
    }
}
</script>