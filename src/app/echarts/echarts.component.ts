import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { EChartsOption, XAXisComponentOption } from "echarts";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";
import { weightRenderer } from "./weight.renderer";
import { JsonPipe } from "@angular/common";
import { GenericData } from "../../data/data.type";

@Component({
  selector: "app-echarts",
  standalone: true,
  imports: [NgxEchartsDirective, JsonPipe, EchartsComponent],
  templateUrl: "./echarts.component.html",
  styleUrl: "./echarts.component.css",
  providers: [provideEcharts()],
})
export class EchartsComponent implements OnChanges {
  @Input() data: Record<string, GenericData[]> | null = null;

  chartOption: EChartsOption = {
    renderer: "svg",
    darkMode: true,
    backgroundColor: "fff",
    grid: [
      { id: "grid-bottom", left: 50, right: 10, bottom: 50, height: 100 },
      { id: "grid-top", left: 50, right: 10, bottom: 50 },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        snap: false,
        label: {
          show: true,
          backgroundColor: "rgba(225, 149, 28, 1)",
          color: "#fff",
          fontSize: 20,
          height: 20,
          margin: 7,
        },
        lineStyle: {
          color: "rgba(225, 149, 28, 1)",
          type: "solid",
          width: 2,
        },
      },
      backgroundColor: "#333",
      valueFormatter: (value) => `${value}° C`,
      textStyle: { color: "#fff", fontSize: 18 },
      // formatter: "{b0}: {c0}<br />{b1}: {c1}",
    },
    yAxis: [
      {
        show: true,
        min: -40,
        max: 30,
        gridId: "grid-top",
        id: "y-axis-temperature",
        axisLabel: {
          formatter: (value: number) => (value >= -30 ? `${value}° C` : ""),
        },
        splitLine: { lineStyle: { color: "grey", type: "dashed" } },
      },
      {
        show: false,
        min: 0,
        max: 50000,
        gridId: "grid-bottom",
        id: "y-axis-weight",
      },
    ],
    dataZoom: [
      {
        type: "slider",
        xAxisId: ["x-axis-weight", "x-axis-temperature"],
        showDetail: false,
        // textStyle: { color: '#E1951C', lineHeight: 40, height: 40 },
        showDataShadow: false,
        borderColor: "rgba(0,0,0,0)",
        handleStyle: {
          color: "#E1951C",
          borderWidth: 1,
          borderColor: "#E1951C",
        },
        moveHandleSize: 0,
        brushSelect: false,
        bottom: 12,
      },
      {
        type: "inside",
        xAxisId: ["y-axis-weight", "x-axis-temperature"],
      },
    ],
  };

  chartNavigator: XAXisComponentOption = {
    id: "x-axis-navigator",
    type: "category",
    gridId: "grid-bottom",
    show: true,
    axisLine: { onZero: false, lineStyle: { width: 3, color: "#fff" } },
    offset: -104,
    axisTick: {
      show: true,
      interval: 0,
      inside: true,
      lineStyle: { color: "#000", width: 4, cap: "square" },
    },
    axisLabel: { fontSize: 16, margin: -27, padding: [0, 0, 0, 0] },
    axisPointer: { show: false },
    data: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      " 10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] && this.data) {
      const dataStartPoint = new Date(
        this.data[
          "eco_tag_temperature_celsius:25c13ba0-bd93-4b01-9245-8673e46f251c"
        ][0].startTime
      );
      dataStartPoint.setHours(0, 0, 0, 0);
      const min = dataStartPoint.getTime();
      const max = min + 1000 * 60 * 60 * 24;
      const weightData = this.data["eco_axles_combined_weight_kg"].map(
        (dataPoint) => ({
          value: [dataPoint.startTime, dataPoint.endTime, dataPoint.value],
        })
      );
      const t1Data = this.data[
        "eco_tag_temperature_celsius:25c13ba0-bd93-4b01-9245-8673e46f251c"
      ].map((dataPoint) => ({
        value: [dataPoint.middleTime, dataPoint.value],
      }));
      const t2Data = this.data[
        "eco_tag_temperature_celsius:299760ed-acad-4db5-9bd2-03ed1a68ba4a"
      ].map((dataPoint) => ({
        value: [dataPoint.middleTime, dataPoint.value],
      }));
      this.chartOption = {
        ...this.chartOption,
        xAxis: [
          {
            type: "time",
            gridId: "grid-bottom",
            id: "x-axis-weight",
            show: false,
            min,
            max,
            axisPointer: { show: false, label: { backgroundColor: "#777" } },
          },
          {
            type: "time",
            gridId: "grid-top",
            id: "x-axis-temperature",
            show: false,
            min,
            max,
            axisPointer: { show: true, snap: false },
          },
          this.chartNavigator,
        ],
        series: [
          {
            type: "line",
            smooth: true,
            data: t1Data,
            showSymbol: false,
            color: "#3BABF4",
            lineStyle: { width: 3 },
            xAxisId: "x-axis-temperature",
            yAxisId: "y-axis-temperature",
          },
          {
            type: "line",
            smooth: true,
            data: t2Data,
            showSymbol: false,
            color: "lightgreen",
            lineStyle: { width: 3 },
            xAxisId: "x-axis-temperature",
            yAxisId: "y-axis-temperature",
          },
          {
            type: "custom",
            renderItem: weightRenderer,
            data: weightData,
            yAxisIndex: 1,
            color: "yellow",
            xAxisId: "x-axis-weight",
            yAxisId: "y-axis-weight",
          },
          {
            type: "bar",
            data: [],
            xAxisId: "x-axis-navigator",
            yAxisId: "y-axis-weight",
          },
        ],
      };
    }
  }
}
