import { Component, OnInit, Input, SimpleChanges,Output,EventEmitter } from '@angular/core';
import { Chart,ChartModule} from 'angular-highcharts';
import {Http} from '@angular/http';
@Component({
  selector: 'app-pricecharts',
  templateUrl: './pricecharts.component.html',
  styleUrls: ['./pricecharts.component.css']
 
})
export class PricechartsComponent implements OnInit {
  constructor(private http: Http) { }
  @Input() stockdata: any[];
  @Input() flag:boolean[];
  @Input() err:boolean[];
  chart: Chart;
  data;
  URL;
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges) {
    
    if(this.stockdata!=null && this.stockdata!=[]&&this.stockdata["Meta Data"]!=null){
    var syb = this.stockdata["Meta Data"]["2. Symbol"];
    var arr2=[];
    var arr1=[];
    var date=[];
    var count=130

    if(Object.keys(this.stockdata["Time Series (Daily)"]).length < 131){
      count=Object.keys(this.stockdata["Time Series (Daily)"]).length-1;
    }
    for (var i = count; i >= 0; i--) {
      arr2.push(parseFloat(this.stockdata["Time Series (Daily)"][Object.keys(this.stockdata["Time Series (Daily)"])[i]]["5. volume"]));
      arr1.push(parseFloat(this.stockdata["Time Series (Daily)"][Object.keys(this.stockdata["Time Series (Daily)"])[i]]["4. close"]));
      date.push(Object.keys(this.stockdata["Time Series (Daily)"])[i].substr(5, 2) + "/" + Object.keys(this.stockdata["Time Series (Daily)"])[i].substr(8, 2));
    }
    

    this.chart = new Chart({
      chart: {
        type: 'area',
        zoomType: 'x',
        panning: true,
        panKey: 'shift'
      },
      title: {
        text: syb+' Stock Price and Volume'
      },
      subtitle: {
        text: '<a style=\"color:blue\"href=\"https://www.alphavantage.co/\">Source: Alpha Vantage</a>'
      },
      xAxis: {
        categories: date,
        tickInterval: 5,
      },
      yAxis: [
        {
          title: {
            text: 'Stock Price'
          }
        },
        {
          
          title: {
            text: 'Volume',
          },
          opposite: true

        }],
      
      tooltip: {
        headerFormat: '{point.key} <br>',
        shared: false
      },
      
      series: [
        {
          yAxis: 0,
          type: 'area',  
          color: 'rgb(66,0,255)',
          name: 'Price',
          data: arr1,
        },
        {
          yAxis: 1,
          type: 'column',
          color: 'rgb(255,100,100)',
          name: 'Volume',
          data: arr2
        }
      ]

    });
    var optionsStr = JSON.stringify({
      chart: {
        type: 'area',
        zoomType: 'x',
        panning: true,
        panKey: 'shift'
      },
      title: {
        text: syb+' Stock Price and Volume'
      },
      subtitle: {
        text: '<a style=\"color:blue\"href=\"https://www.alphavantage.co/\">Source: Alpha Vantage</a>'
      },
      xAxis: {
        categories: date,
        tickInterval: 5,
      },
      yAxis: [
        {
          title: {
            text: 'Stock Price'
          }
        },
        {
          
          title: {
            text: 'Volume',
          },
          opposite: true
  
        }],
      
      tooltip: {
        headerFormat: '{point.key} <br>',
        shared: false
      },
      
      series: [
        {
          yAxis: 0,
          type: 'area',  
          color: 'rgb(66,0,255)',
          name: 'Price',
          data: arr1,
        },
        {
          yAxis: 1,
          type: 'column',
          color: 'rgb(255,100,100)',
          name: 'Volume',
          data: arr2
        }
      ]
  
    })
    
    this.sendout.emit(optionsStr);
    
  }
  ////////send back URL
  
    }

  



  // add point to chart serie


  ngOnInit() {
  }

}
