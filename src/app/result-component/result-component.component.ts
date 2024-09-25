import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Chart, registerables} from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-result-component',
  templateUrl: './result-component.component.html',
  styleUrl: './result-component.component.css'
})
export class ResultComponentComponent {
 
}