import { Component, OnInit, Input, SimpleChanges,Output,EventEmitter } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
@Component({
  selector: 'app-emacharts',
  templateUrl: './emacharts.component.html',
  styleUrls: ['./emacharts.component.css']
})
export class EmachartsComponent implements OnInit {
  @Input() stockdata_ema;
  @Input() flag:boolean[];
  @Input() err:boolean[];
  constructor() { }
  chart: Chart;
  
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges(changes: SimpleChanges) {
      
    if (this.stockdata_ema !== null && this.stockdata_ema != [] && typeof this.stockdata_ema !== "undefined"&&this.stockdata_ema["Technical Analysis: EMA"]!=null) {
        // var syb = this.stockdata["Meta Data"]["1: Symbol"];
        var arr1 = [];
        var date = [];
        var count=130
        if(Object.keys(this.stockdata_ema["Technical Analysis: EMA"]).length < 131){
          count=Object.keys(this.stockdata_ema["Technical Analysis: EMA"]).length-1;
        }
        for (var i = count; i >= 0; i--) {
          arr1.push(parseFloat(this.stockdata_ema["Technical Analysis: EMA"][Object.keys(this.stockdata_ema["Technical Analysis: EMA"])[i]]["EMA"]));
          date.push(Object.keys(this.stockdata_ema["Technical Analysis: EMA"])[i].substr(5, 2) + "/" + Object.keys(this.stockdata_ema["Technical Analysis: EMA"])[i].substr(8, 2));
        }
        this.chart = new Chart({
          title: {
            text: this.stockdata_ema["Meta Data"]["2: Indicator"]
          },
  
          subtitle: {
            text: '<a style=\"color:blue\"href=\"https://www.alphavantage.co/\">Source: Alpha Vantage</a>'
          },
          xAxis: {
            categories: date,
            tickInterval: 5,
          },
          yAxis: {
            title: {
              text: 'EMA'
            }
          },
          
          plotOptions: {
            series: {
              lineWidth: 1
            }
          },
          series: [
  
            {
              color: 'rgb(251,0,0)',
              name: 'EMA',
              data: arr1
            }]
  
        });
  
        var optionsStr=JSON.stringify({

          title: {
            text: this.stockdata_ema["Meta Data"]["2: Indicator"]
          },
  
          subtitle: {
            text: '<a style=\"color:blue\"href=\"https://www.alphavantage.co/\">Source: Alpha Vantage</a>'
          },
          xAxis: {
            categories: date,
            tickInterval: 5,
          },
          yAxis: {
            title: {
              text: 'EMA'
            }
          },
          
          plotOptions: {
            series: {
              lineWidth: 1
            }
          },
          series: [
  
            {
              color: 'rgb(251,0,0)',
              name: 'EMA',
              data: arr1
            }]

        })
        this.sendout.emit(optionsStr);

      }
    }
  ngOnInit() {
  }

}
