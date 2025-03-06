import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useItensStore = defineStore('counter',  {
    state: () => ({
      itens: [],
    }),
    actions: {
      
    },
    getters: {
      doubleCount: (state) => state.count * 2,
    },
})
