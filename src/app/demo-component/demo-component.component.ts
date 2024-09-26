import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo-component.component.html',
  styleUrls: ['./demo-component.component.css']
})
export class DemoComponentComponent implements OnInit {

  data: any;
  ansQuestion: any = [
    // "0_3",
    // "1_3",
    // "2_3",
    // "3_3",
    // "4_3",
    // "5_3",
    // "6_3",
    // "7_3",
    // "8_3",
    // "9_3",
    // "10_2",
    // "11_2",
    // "12_2",
    // "13_3",
    // "14_3",
    // "15_3",
    // "16_3",
    // "17_1",
    // "18_3",
    // "19_4",
    // "20_4",
    // "21_2"
];
  isSubmitted: boolean = false;
  correctAns: any = [];

  resultScore: number = 0;
  chart: any;
  donut: any;
  val2: string = '';
  
  public config: any = {
    type: 'bar',
    data: {
      labels: ['A', 'B', 'C', 'A', 'B', 'C', 'D'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  public configdonut: any;

  constructor(private api: ApiService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    // Fetch the quiz data
    this.api.getAll().subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
  }

  Submit() {
    this.isSubmitted = true;

    // Submit the answers and process the result
    this.api.getCountMatches(this.ansQuestion).subscribe((response) => {
      this.resultScore = response.score;
      this.correctAns = response.correctAns;
      this.val2 = (this.data.length - this.resultScore).toString(); // Assuming 11 is total possible score
      console.log("val",this.val2);
      
      // Configure the donut chart based on the response
      this.configdonut = {
        type: 'pie',
        data: {
          labels: ['Correct', 'Incorrect'],
          datasets: [{
            data: [this.resultScore, this.val2],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
            hoverOffset: 4
          }]
        }
      };

      // Destroy previous chart instances before creating new ones
      if (this.chart) this.chart.destroy();
      if (this.donut) this.donut.destroy();

      // Create new chart instances for bar and donut charts
      this.chart = new Chart('myChart', this.config);
      this.donut = new Chart('myDonut', this.configdonut);
    });
  }
}