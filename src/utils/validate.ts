export function formatarValor(num: string):{valorNumerico:number, valorFormatado:string} {
    let novoValor = num.replace(/\D/g, '')
    if (novoValor.length < 3) {
        novoValor = novoValor.padStart(3, '0')
    }
    const valorNumerico = parseInt(novoValor, 10)/100
    const valorFormatado = valorNumerico.toLocaleString('pt-BR', {maximumFractionDigits: 2, useGrouping: false})
    return {
        valorNumerico, valorFormatado
    }

}