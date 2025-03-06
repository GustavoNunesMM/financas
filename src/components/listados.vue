<template>
    <div class="flex text-black flex-col items-center bg-white w-full h-[500px]">
        <div v-for="(item, index) in itens" :key="index" class="bg-gray-200 p-2 m-2 flex flex-row">
            <div>
                <input type="text" placeholder="nome" v-model="item.nome" :disabled="index !== editando">
                <input type="text" placeholder="valor" @input="formatarValorNumerico" v-model="item.valor" :disabled="index !== editando">
                <marcadores @selecionarMarcador="selecionarMarcadorFunc" :disabled="index !== editando"/>
            </div>
            <button @click="editar(index)">Editar Termo</button>
            <button @click="remover(index)">Remover Termo</button>
        </div>
    </div>
    
</template>

<script lang="ts">
import {ref, reactive, watch} from 'vue'
import { formatarValor } from '../utils/validate'
import marcadores from './marcadores.vue'

interface valorSimples {
    nome: string,
    valor: string,
    valorNumerico: number,
    marcador: string
}

export default{
    props:{ 
        itensProp: {
            type: Array,
            required: true
        }
    },
    components: {
        marcadores
    },
    setup(props, {emit}) {
        let itens = reactive<valorSimples[]>(props.itensProp as valorSimples[])
        const editando = ref<number>(-1)
        function editar (index: number) {
            index === editando.value ? editando.value = -1 : editando.value = index
        }

        function formatarValorNumerico(event:Event) {
            console.log(event)
            const input= (event.target as HTMLInputElement).value
            const response = formatarValor(input)
            itens[editando.value] = {
                ...itens[editando.value],
                valor: response.valorFormatado,
                valorNumerico: response.valorNumerico
            }
        }

        function remover (index: number) {
            itens.splice(index, 1)
        }

        function selecionarMarcadorFunc(novoMarcador:string) {
            itens[editando.value] = {
                ...itens[editando.value],
                marcador: novoMarcador
            }
        }
        watch( () => itens, (newValue) => {
            emit('alterarListagem', newValue)
        })

        return {itens,editando,editar, remover, formatarValorNumerico,selecionarMarcadorFunc}
    }
}
</script>