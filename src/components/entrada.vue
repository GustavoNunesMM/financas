<template>
    <div class="flex  flex-col items-center">
        <input class="text-black" type="text"  placeholder="Nome" v-model="nome">
        <input class="text-black" type="number" @input="formatarValorNumerico" placeholder="Digite um valor" v-model="valorFormatado" />
        <marcadores @selecionarMarcador="selecionarMarcadorFunc"/>
        <button @click="adicionarValor()">Adicionar</button>
    </div>
    
</template>

<script lang="ts">
import {ref, reactive, computed} from 'vue'
import { formatarValor } from '../utils/validate'
import marcadores from './marcadores.vue'

import { useItensStore } from '../stores/itens'
import { storeToRefs } from 'pinia'

export default{
    components:{ 
        marcadores
    },
    setup(_, {emit}) {
        const itensStore = useItensStore()
        const {itens, nome, valorFormatado, valorNumerico} = storeToRefs(itensStore)

        const nome = ref<string>('')
        const valorFormatado = ref<string>('0,00')
        const valorNumerico = ref<number>(0)
        const marcadorSelecionado = ref<string>('')

        const conjuntoValores = reactive<{ nome: string; valor: string, valorNumerico:number, marcador:string }[]>([])
        function formatarValorNumerico(event:Event) {
            const input= (event.target as HTMLInputElement).value
            const response = formatarValor(input)
            valorFormatado.value = response.valorFormatado
            valorNumerico.value = response.valorNumerico
        }

        const adicionarValor = () => {
            conjuntoValores.push({nome: nome.value, valor: valorFormatado.value, valorNumerico: valorNumerico.value, marcador: marcadorSelecionado.value})
            emit('alterarListagem', conjuntoValores)
            nome.value = ''
            valorFormatado.value = '0'
        }
        const selecionarMarcadorFunc = (marcador:string) => {
            marcadorSelecionado.value = marcador
        }

        return {
            nome, 
            valorFormatado,
            conjuntoValores,
            valorNumerico,
            adicionarValor,
            selecionarMarcadorFunc,
            formatarValorNumerico,
        }
    }
}

</script>

