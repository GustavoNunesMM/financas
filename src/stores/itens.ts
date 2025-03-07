import { defineStore } from 'pinia'

enum tipoGasto {
  'debito',
  'credito'
}
interface itensInterface{
  nome: string,
  valor: string,
  valorNumerico:number,
  marcador:string,
  marcadorAtivo:boolean,
  data: string,
  tipoGasto: tipoGasto,
}

export interface itensState {
  itens: itensInterface[],
  nome: string,
  data: string,
  valorFormatado: string,
  valorNumerico: number,
  selecionarMarcador: boolean,
  marcadorSelecionado: string,
  editando: number,
  tipoGasto: tipoGasto,
}

export const useItensStore = defineStore('counter',  {
    state: ():itensState => ({
      itens: [],
      nome: '',
      data: '01/01/2000',
      valorFormatado: '0,00',
      valorNumerico: 0,
      selecionarMarcador: false,
      marcadorSelecionado: 'Marcador',
      editando: (-1),
      tipoGasto: 0,
    }),
    actions: {
      adicionarValor() {
        this.itens.push({
          nome: this.nome, 
          valor: this.valorFormatado, 
          data: this.data,
          valorNumerico: this.valorNumerico, 
          marcador: this.marcadorSelecionado,
          tipoGasto: this.tipoGasto,
          marcadorAtivo: false,
        })

        this.nome = ''
        this.valorFormatado = '0,00'
      },

      formatarValor(num: string) {
        let novoValor = num.replace(/\D/g, '')
        if (novoValor.length < 3) {
            novoValor = novoValor.padStart(3, '0')
        }
        const valorNumerico = parseInt(novoValor, 10)/100
        const valorFormatado = valorNumerico.toLocaleString('pt-BR', {maximumFractionDigits: 2, useGrouping: false})
        return {
            valorNumerico, valorFormatado
        }
      },

      editar (index: number) {
        return index === this.editando ? this.editando = -1 : this.editando = index
      },
      remover (index: number) {
        this.itens.splice(index, 1)
      },

      selecionarMarcadorLista(marcador:string) {
        this.selecionarMarcador = !this.selecionarMarcador
        this.itens[this.editando].marcador = marcador
      },

      alterarMarcador() {
        this.selecionarMarcador = !this.selecionarMarcador
      },

      alterarGasto() {
        const keyEnum = Object.keys(tipoGasto).filter(key => isNaN(Number(key)))
        this.tipoGasto = (this.tipoGasto + 1) % keyEnum.length // Avança para o próximo índice
      },

  },
    getters: {
      valorAgregado():any {
        return this.itens.reduce((acc, item) => acc + item.valorNumerico, 0)
      },
      valorAgregadoMarcador():{[key:string]:string}{
        return this.itens.reduce( (acc: {[key: string]: string}, item) => {
          // acc: {key: value}, item
          // Se o marcador já existe no acumulador, soma o valor
          acc[item.marcador] ? acc[item.marcador] += item.valor : acc[item.marcador] = item.valor
          return acc
      },{})

    },
  }
})
