<template>
    <div class="w-auto p-5 bg-white ">
        itens - {{ itens }}
        valorAgregado - {{ valorAgregado }}
        valorAgregadoMarcador - {{ valorAgregadoMarcador }}
    </div>
</template>

<script lang="ts">
import { useItensStore } from '../stores/itens'
import { storeToRefs } from 'pinia'

export default {

    setup() {
        const itensStore = useItensStore()
        const {itens, valorAgregado, valorAgregadoMarcador} = storeToRefs(itensStore)
        
        return {
            itens,
            valorAgregado,
            valorAgregadoMarcador
        }
    }
}
</script>