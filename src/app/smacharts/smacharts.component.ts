import { Component, OnInit, Input, SimpleChanges,Output,EventEmitter } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-smacharts',
  templateUrl: './smacharts.component.html',
  styleUrls: ['./smacharts.component.css']
})
export class SmachartsComponent implements OnInit {
  @Input() stockdata_sma;
  @Input() flag:boolean[];
  @Input() err:boolean[];
  
  constructor() { }
  chart: Chart;

  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges) {
    
    if (this.stockdata_sma !== null && this.stockdata_sma != []&& typeof this.stockdata_sma !== "undefined"&& this.stockdata_sma["Technical Analysis: SMA"]!=null) {
      // var syb = this.stockdata["Meta Data"]["1: Symbol"];
      var arr1 = [];
      var date = [];
      var count=130
      if(Object.keys(this.stockdata_sma["Technical Analysis: SMA"]).length < 131){
        count=Object.keys(this.stockdata_sma["Technical Analysis: SMA"]).length-1;
      }
      for (var i = count; i >= 0; i--) {
        arr1.push(parseFloat(this.stockdata_sma["Technical Analysis: SMA"][Object.keys(this.stockdata_sma["Technical Analysis: SMA"])[i]]["SMA"]));
        date.push(Object.keys(this.stockdata_sma["Technical Analysis: SMA"])[i].substr(5, 2) + "/" + Object.keys(this.stockdata_sma["Technical Analysis: SMA"])[i].substr(8, 2));
      }
      this.chart = new Chart({
        title: {
          text: this.stockdata_sma["Meta Data"]["2: Indicator"]
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
            text: 'SMA'
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
            name: 'SMA',
            data: arr1
          }]

      });
var optionsStr=JSON.stringify({
  title: {
    text: this.stockdata_sma["Meta Data"]["2: Indicator"]
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
      text: 'SMA'
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
      name: 'SMA',
      data: arr1
    }]




})





      this.sendout.emit(optionsStr);
    }
  }




  ngOnInit() {
  }

}
