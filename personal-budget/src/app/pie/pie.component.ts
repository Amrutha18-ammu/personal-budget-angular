import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataServiceService , Budget} from '../data-service.service';

@Component({
  selector: 'pb-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})

export class PieComponent implements OnInit {
  public dataSource = []
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(private dataService: DataServiceService) {
    const el = document.getElementById('myChart');
    console.log('Is my chart there?' , el);
   }

  ngOnInit(): void {
    this.dataService.getMyBudget()
    .subscribe((res: Budget[])=> {
      this.createSvg();
      this.createColors();
      this.dataSource = res;
      this.drawChart();
    });
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.dataSource.map(d => d.budget.toString()))
  .range([
    '#ffcd56',
    '#ff6384',
    '#36a2eb',
    '#fd6b19',
    '#FF8C00',
    '#6495ED',
    '#A52A2A',
   ]);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.dataSource))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.dataSource))
  .enter()
  .append('text')
  .text((d: any)=> d.data.title)
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}
}
