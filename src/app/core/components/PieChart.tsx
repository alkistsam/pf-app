import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsAccessibility from 'highcharts/modules/accessibility'
import { ExtendedPoint, PieProps } from '../../shared/interfaces/interfaces'
import './PieChart.scss'
import * as XLSX from 'xlsx'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  HighchartsAccessibility(Highcharts)
}

function downloadXLSX(chartData: ExtendedPoint[]) {
  const worksheet = XLSX.utils.json_to_sheet(chartData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  XLSX.writeFile(workbook, 'chart-data.xlsx')
}

const PieChartModal: React.FC<PieProps> = ({ isOpen, onClose, character }) => {
  if (!isOpen) return null
  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Character Film Distribution',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      shared: true,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Films',
        colorByPoint: true,
        data: character?.map((char) => ({
          name: char.name,
          y: char.films.length,
          extra: char.tvShows.length,
        })) as ExtendedPoint[],
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            'viewFullscreen',
            'separator',
            {
              text: 'Download XLSX',
              onclick: function () {
                const chart = this as unknown as Highcharts.Chart
                if (chart.series && chart.series[0] && chart.series[0].data) {
                  const seriesData = chart.series[0].data as Array<
                    Highcharts.Point & { options: { extra: number } }
                  >
                  const chartData: ExtendedPoint[] = seriesData.map((point) => ({
                    name: point.name || '',
                    y: point.y || 0,
                    extra: point.options && point.options.extra ? point.options.extra : 0,
                  }))

                  downloadXLSX(chartData)
                }
              },
            },
            'viewData',
          ],
        },
      },
    },
  }

  return (
    <div className="piechart-modal-backdrop" onClick={onClose}>
      <div className="piechart-modal-content" onClick={(e) => e.stopPropagation()}>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  )
}

export default PieChartModal
