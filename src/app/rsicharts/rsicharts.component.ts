import { Component, OnInit, Input, SimpleChanges,Output,EventEmitter} from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
@Component({
  selector: 'app-rsicharts',
  templateUrl: './rsicharts.component.html',
  styleUrls: ['./rsicharts.component.css']
})
export class RsichartsComponent implements OnInit {
  @Input() stockdata_rsi;
  @Input() flag:boolean[];
  @Input() err:boolean[];
  constructor() {}
  chart: Chart;
  
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges(changes: SimpleChanges) {
      
    if (this.stockdata_rsi !== null && this.stockdata_rsi != [] && typeof this.stockdata_rsi !== "undefined" &&this.stockdata_rsi["Technical Analysis: RSI"]!=null) {
        // var syb = this.stockdata["Meta Data"]["1: Symbol"];
        var arr1 = [];
        var date = [];
        var count=130
        if(Object.keys(this.stockdata_rsi["Technical Analysis: RSI"]).length < 131){
          count=Object.keys(this.stockdata_rsi["Technical Analysis: RSI"]).length-1;
        }
        for (var i = count; i >= 0; i--) {
          arr1.push(parseFloat(this.stockdata_rsi["Technical Analysis: RSI"][Object.keys(this.stockdata_rsi["Technical Analysis: RSI"])[i]]["RSI"]));
          date.push(Object.keys(this.stockdata_rsi["Technical Analysis: RSI"])[i].substr(5, 2) + "/" + Object.keys(this.stockdata_rsi["Technical Analysis: RSI"])[i].substr(8, 2));
        }
        this.chart = new Chart({
          title: {
            text: this.stockdata_rsi["Meta Data"]["2: Indicator"]
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
              text: 'RSI'
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
              name: 'RSI',
              data: arr1
            }]
  
        });
  var optionsStr=JSON.stringify({
    title: {
      text: this.stockdata_rsi["Meta Data"]["2: Indicator"]
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
        text: 'RSI'
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
        name: 'RSI',
        data: arr1
      }]



  })




        this.sendout.emit(optionsStr);
      }
    }

  ngOnInit() {
  }

}
