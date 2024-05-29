import {
  CustomSeriesRenderItem,
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from 'echarts';
import { GenericData } from '../../data/data.type';

export const weightRenderer: CustomSeriesRenderItem = (
  params: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI
) => {
  const height = api.value(2) as number;
  const start = api.coord([api.value(0), height]);
  const size = api.size!([
    (api.value(1) as number) - (api.value(0) as number),
    height,
  ]) as number[];
  return {
    type: 'rect',
    shape: { x: start[0], y: start[1], width: size[0], height: size[1] },
    style: api.style(),
  };
};
