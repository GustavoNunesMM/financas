<template>
    <div class="w-auto p-5 bg-white ">
        itens - {{ itens }}
        valorAgregado - {{ valorAgregado }}
        valorAgregadoMarcador - {{ valorAgregadoMarcador }}

    </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'

interface valorSimples {
    nome: string,
    valor: string,
    valorNumerico: number,
    marcador: string
}

export default {
    props:{ 
        itensProp: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const itens = reactive<valorSimples[]>(props.itensProp as valorSimples[])
        let valorAgregado = ref<number>(0)
        let valorAgregadoMarcador = reactive<{[key:string]:string}>({})

        valorAgregado.value = itens.reduce((acc, item) => acc + item.valorNumerico, 0)

        valorAgregadoMarcador = itens.reduce( (acc: {[key: string]: string}, item) => {
            // acc: {key: value}, item
            // Se o marcador já existe no acumulador, soma o valor
            acc[item.marcador] ? acc[item.marcador] += item.valor : acc[item.marcador] = item.valor
            return acc
        },{})

        
        return {
            itens,
            valorAgregado,
            valorAgregadoMarcador
        }
    }
}
</script>