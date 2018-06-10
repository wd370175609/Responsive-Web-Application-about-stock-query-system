import { Component, OnInit, Input, SimpleChanges,Output,EventEmitter } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-ccicharts',
  templateUrl: './ccicharts.component.html',
  styleUrls: ['./ccicharts.component.css']
})
export class CcichartsComponent implements OnInit {
  @Input() stockdata_cci;
  @Input() flag:boolean[];
  @Input() err:boolean[];
  constructor() { }
  chart: Chart;
  
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges(changes: SimpleChanges) {
      
    if (this.stockdata_cci !== null && this.stockdata_cci != []&& typeof this.stockdata_cci !== "undefined"&&this.stockdata_cci["Technical Analysis: CCI"]!=null) {
        // var syb = this.stockdata["Meta Data"]["1: Symbol"];
        var arr1 = [];
        var date = [];
        var count=130
        if(Object.keys(this.stockdata_cci["Technical Analysis: CCI"]).length < 131){
          count=Object.keys(this.stockdata_cci["Technical Analysis: CCI"]).length-1;
        }
        for (var i = count; i >= 0; i--) {
          arr1.push(parseFloat(this.stockdata_cci["Technical Analysis: CCI"][Object.keys(this.stockdata_cci["Technical Analysis: CCI"])[i]]["CCI"]));
          date.push(Object.keys(this.stockdata_cci["Technical Analysis: CCI"])[i].substr(5, 2) + "/" + Object.keys(this.stockdata_cci["Technical Analysis: CCI"])[i].substr(8, 2));
        }
        this.chart = new Chart({
          title: {
            text: this.stockdata_cci["Meta Data"]["2: Indicator"]
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
              text: 'CCI'
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
              name: 'CCI',
              data: arr1
            }]
  
        });
        var optionsStr=JSON.stringify({
          title: {
            text: this.stockdata_cci["Meta Data"]["2: Indicator"]
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
              text: 'CCI'
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
              name: 'CCI',
              data: arr1
            }]

        })
        this.sendout.emit(optionsStr);
      }
    }

  ngOnInit() {
  }

}
