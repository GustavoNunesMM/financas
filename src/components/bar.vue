<template>
    <div>
        <canvas ref="barChart"></canvas>
    </div>
</template>

<script>
import { ref, onMounted, watch } from "vue"
import { Bar } from "chart.js/auto"

export default {
    props: {
        chartData: {
            type: Object,
            required: true,
        },
        chartOptions: {
            type: Object,
            default: () => ({}),
        },
    },
    setup() {
        const barChart = ref(null)

        // Instância do gráfico
        let chartInstance = null

        // Função para renderizar o gráfico
        const renderChart = () => {
            if (chartInstance) {
            chartInstance.destroy() // Destrói o gráfico anterior se existir
            }
            const ctx = barChart.value.getContext("2d")
            chartInstance = new Bar(ctx, {
            data: props.chartData,
            options: props.chartOptions,
            })
        }

        // Renderiza o gráfico quando o componente é montado
        onMounted(() => {
            renderChart()
        })

        // Observa mudanças nos dados e re-renderiza o gráfico
        watch(
            () => props.chartData, () => {renderChart();},{ deep: true }
        )
    }
}
// Referência para o elemento canvas

</script>

<style scoped>
div {
    max-width: 600px;
    margin: 0 auto;
}
</style>