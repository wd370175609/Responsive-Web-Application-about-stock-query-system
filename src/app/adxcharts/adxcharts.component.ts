import { Component, OnInit, Input, SimpleChanges,Output,EventEmitter } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
@Component({
  selector: 'app-adxcharts',
  templateUrl: './adxcharts.component.html',
  styleUrls: ['./adxcharts.component.css']
})
export class AdxchartsComponent implements OnInit {
  @Input() stockdata_adx;
  @Input() flag:boolean[];
  @Input() err:boolean[];
  constructor() { }
  chart: Chart;
  
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges(changes: SimpleChanges) {
      
    if (this.stockdata_adx !== null && this.stockdata_adx != [] && typeof this.stockdata_adx !== "undefined"&&this.stockdata_adx["Technical Analysis: ADX"]!=null) {
        // var syb = this.stockdata["Meta Data"]["1: Symbol"];
        var arr1 = [];
        var date = [];
        var count=130
        if(Object.keys(this.stockdata_adx["Technical Analysis: ADX"]).length < 131){
          count=Object.keys(this.stockdata_adx["Technical Analysis: ADX"]).length-1;
        }
        for (var i = count; i >= 0; i--) {
          arr1.push(parseFloat(this.stockdata_adx["Technical Analysis: ADX"][Object.keys(this.stockdata_adx["Technical Analysis: ADX"])[i]]["ADX"]));
          date.push(Object.keys(this.stockdata_adx["Technical Analysis: ADX"])[i].substr(5, 2) + "/" + Object.keys(this.stockdata_adx["Technical Analysis: ADX"])[i].substr(8, 2));
        }
        this.chart = new Chart({
          title: {
            text: this.stockdata_adx["Meta Data"]["2: Indicator"]
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
              text: 'ADX'
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
              name: 'ADX',
              data: arr1
            }]
  
        });
  
     
      var optionsStr=JSON.stringify({
        title: {
          text: this.stockdata_adx["Meta Data"]["2: Indicator"]
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
            text: 'ADX'
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
            name: 'ADX',
            data: arr1
          }]


      })
      this.sendout.emit(optionsStr);
    }
  }
  ngOnInit() {
  }

}
