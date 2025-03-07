import { defineStore } from 'pinia'

interface marcadorInterface {
    marcadores: string[],
    filtroMarcadores: string,
    marcadoresFiltrados: string[]
}

export const useMarcadorStore = defineStore('marcador',  {
    state: ():marcadorInterface => ({
        marcadores: ['Marcador 1', 'Marcador 2', 'Marcador 3'],
        filtroMarcadores: '',
        marcadoresFiltrados: []
    }),
    actions: {
        filtrarMarcador() {
            this.marcadoresFiltrados = this.marcadores.filter((marcador) => marcador.includes(this.filtroMarcadores))
        }
    }
})
