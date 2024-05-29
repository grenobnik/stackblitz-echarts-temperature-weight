import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { weightRenderer } from './weight.renderer';
import { JsonPipe } from '@angular/common';
import { GenericData } from '../../data/data.type';

@Component({
  selector: 'app-echarts',
  standalone: true,
  imports: [NgxEchartsDirective, JsonPipe, EchartsComponent],
  templateUrl: './echarts.component.html',
  styleUrl: './echarts.component.css',
  providers: [provideEcharts()],
})
export class EchartsComponent implements OnChanges {
  @Input() data: Record<string, GenericData[]> | null = null;

  chartOption: EChartsOption = {
    renderer: 'svg',
    darkMode: true,
    backgroundColor: 'fff',
    grid: [
      { id: 'weight', left: '4%', bottom: '17%', width: '94%', height: '20%' },
      { id: 'temperature', left: '4%', top: '4%', width: '94%', height: '69%' },
    ],
    xAxis: [
      { type: 'time', gridId: 'weight', id: 'weight', show: true },
      { type: 'time', gridId: 'temperature', id: 'temperature', show: false },
    ],
    yAxis: [
      { min: -20, max: 30, gridId: 'temperature', id: 'temperature' },
      { show: false, min: 0, max: 50000, gridId: 'weight', id: 'weight' },
    ],
    series: [],
    dataZoom: [
      {
        type: 'slider',
        xAxisId: ['weight', 'temperature'],
      },
      {
        type: 'inside',
        xAxisId: ['weight', 'temperature'],
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      const weightData = this.data['eco_axles_combined_weight_kg'].map(
        (dataPoint) => ({
          value: [dataPoint.startTime, dataPoint.endTime, dataPoint.value],
        })
      );
      const t1Data = this.data[
        'eco_tag_temperature_celsius:25c13ba0-bd93-4b01-9245-8673e46f251c'
      ].map((dataPoint) => ({
        value: [dataPoint.middleTime, dataPoint.value],
      }));
      const t2Data = this.data[
        'eco_tag_temperature_celsius:299760ed-acad-4db5-9bd2-03ed1a68ba4a'
      ].map((dataPoint) => ({
        value: [dataPoint.middleTime, dataPoint.value],
      }));
      this.chartOption = {
        ...this.chartOption,
        series: [
          {
            type: 'line',
            smooth: true,
            data: t1Data,
            showSymbol: false,
            color: 'blue',
            lineStyle: { width: 4 },
            xAxisId: 'temperature',
            yAxisId: 'temperature',
            dataGroupId: '1',
          },
          {
            type: 'line',
            smooth: true,
            data: t2Data,
            showSymbol: false,
            color: 'green',
            lineStyle: { width: 4 },
            xAxisId: 'temperature',
            yAxisId: 'temperature',
          },
          {
            type: 'custom',
            renderItem: weightRenderer,
            data: weightData,
            yAxisIndex: 1,
            color: 'grey',
            xAxisId: 'weight',
            yAxisId: 'weight',
            dataGroupId: '1',
          },
        ],
      };
    }
  }
}
