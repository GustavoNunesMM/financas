<template>
    <div class="bg-white w-[400px]">
        <button class="w-full" @click="alterarMarcador">{{ marcadorSelecionado }}</button>
        <div v-if="marcador">
            <div v-for="(marcador, index) in marcadoresFiltrados" :key="index" @click="selecionarMarcador(index)">
                {{marcador}}
            </div>
            <input type="text" v-model="filtroMarcadores" >
        </div>

    </div>
</template>

<script lang="ts">
import {reactive, ref, watch} from 'vue'

export default{
setup(_, {emit}) {
    const marcador = ref<boolean>(false)
    const marcadores = reactive<string[]>(['Marcador 1', 'Marcador 2', 'Marcador 3'])
    const filtroMarcadores = ref<string>('')
    const marcadoresFiltrados = reactive<string[]>([...marcadores])
    const marcadorSelecionado = ref<string>('Marcadores')

    watch(filtroMarcadores, (value) => {
        if (value !== '') {
            marcadoresFiltrados.length = 0
            marcadores.forEach((marcador) => {
            if(marcador.includes(value)) {
                marcadoresFiltrados.push(marcador)
            }
        })
        } else {
            marcadoresFiltrados.length = 0
            marcadores.forEach((marcador) => {
                marcadoresFiltrados.push(marcador)
            })
        }
        
    })

    const alterarMarcador = () => {
        marcador.value = !marcador.value
        }
    const selecionarMarcador = (index:number) => {
        alterarMarcador()
        marcadorSelecionado.value = marcadores[index]
        emit('selecionarMarcador', marcadores[index] as string)
    }
    return {
        marcador,
        marcadores,
        filtroMarcadores,
        marcadorSelecionado,
        marcadoresFiltrados,
        alterarMarcador,
        selecionarMarcador
        }
    }
}
</script>