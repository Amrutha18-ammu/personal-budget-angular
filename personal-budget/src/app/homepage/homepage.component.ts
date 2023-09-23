import { AfterViewInit, Component,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
         '#ffcd56',
         '#ff6384',
         '#36a2eb',
         '#fd6b19',
         '#FF8C00',
         '#6495ED',
         '#A52A2A',
        ]
      }
    ],
    labels: []
  };

  constructor(private dataService: DataServiceService) {
    const el = document.getElementById('myChart');
    console.log('Is my chart there?' , el);
   }

  ngAfterViewInit(): void {
    this.dataService.getMyBudget()
    .subscribe((res:any)=> {
      let test = 'amrutha'
      for ( var i = 0; i < res.length; i++) {
        this.dataSource.datasets[0].data[i] = res[i].budget;
        this.dataSource.labels[i] = res[i].title;
      }
      this.createChart();
    });

  }
  createChart() {
    //var ctx = document.getElementById("myChart").getContext('2d');
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource

    });
  }
}
function subscribe(arg0: (res: any) => void) {
  throw new Error('Function not implemented.');
}

