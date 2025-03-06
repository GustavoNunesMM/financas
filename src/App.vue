<template>
  <div class="bg-gray-800 h-full w-full text-black ">
    <entrada class="w-full" @alterarListagem="atualizaValor" />

    <lista class="w-full bg-gray-400" v-if="itens.length > 0" @alterarListagem="atualizarLista" :itensProp="itens"/>

    <apresentacaoDados :itensProp="itens"/>
  </div>

</template>

<script lang="ts">
import { ref } from 'vue'
import entrada from './components/entrada.vue'
import lista from './components/listados.vue'
import apresentacaoDados from './components/apresentacaoDados.vue'

export default {
  components: { entrada, lista, apresentacaoDados },
  setup() {
    const itens = ref<string[]>([])
    const atualizaValor = (valor:string[]) => {
      itens.value = valor
    }
    const atualizarLista = (valor:string[]) => {
      itens.value = valor
    }
    return {
      itens, 
      atualizaValor,
      atualizarLista,
    }
    
  }
}
</script>

<style>
body, html, #app{
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
