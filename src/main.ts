import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { EchartsComponent } from './app/echarts/echarts.component';
import { data as data20240523 } from './data/data-gq397cc-20240523';
import { data as data20240522 } from './data/data-gq397cc-20240522';
import { data as data20240521 } from './data/data-gq397cc-20240521';
import { data as data20240517 } from './data/data-gq397cc-20240517';
import { GenericData } from './data/data.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EchartsComponent],
  template: `
    <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 10px">
      <button style="width: 100px; height: 30px" [style.font-weight]="date === '17/05' ? 'bold' : 'normal'" (click)="date = '17/05'">
        17/05
      </button>
      <button style="width: 100px; height: 30px" [style.font-weight]="date === '21/05' ? 'bold' : 'normal'" (click)="date = '21/05'">
        21/05
      </button>
      <button style="width: 100px; height: 30px" [style.font-weight]="date === '22/05' ? 'bold' : 'normal'" (click)="date = '22/05'">
        22/05
      </button>
      <button style="width: 100px; height: 30px" [style.font-weight]="date === '23/05' ? 'bold' : 'normal'" (click)="date = '23/05'">
        23/05
      </button>
    </div>
    <app-echarts [data]="files[date]" />
  `,
})
export class App {
  data20240517: Record<string, GenericData[]> = data20240517;
  data20240521: Record<string, GenericData[]> = data20240521;
  data20240522: Record<string, GenericData[]> = data20240522;
  data20240523: Record<string, GenericData[]> = data20240523;
  files = {
    '17/05': this.data20240517,
    '21/05': this.data20240521,
    '22/05': this.data20240522,
    '23/05': this.data20240523,
  };

  date: '17/05' | '21/05' | '22/05' | '23/05' = '17/05';
}

bootstrapApplication(App);
