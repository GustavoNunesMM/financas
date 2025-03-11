<template>
  <div class="bg-gray-800 h-full w-full text-black ">
    <entrada class="w-full" />
    <lista class="w-full bg-gray-400"/>
    <apresentacaoDados/> 
    <mensal/>
  </div>

</template>

<script lang="ts">
import entrada from './components/entrada.vue'
import lista from './components/listados.vue'
import apresentacaoDados from './components/apresentacaoDados.vue'
import mensal from './components/mensal.vue'

export default {
  components: { entrada, lista, apresentacaoDados, mensal },
  setup() {    
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
