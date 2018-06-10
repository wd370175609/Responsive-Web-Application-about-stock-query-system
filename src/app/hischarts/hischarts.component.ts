import { Component, OnInit,Input,SimpleChanges } from '@angular/core';
import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { BrowserModule }           from '@angular/platform-browser';
import { ChartModule,Chart}             from 'angular-highcharts'; 
// import { ChartModule as ChartModule2 }             from 'angular2-highcharts';
// import { HttpModule,Http }              from '@angular/http'; 
@Component({
  selector: 'app-hischarts',
  templateUrl: './hischarts.component.html',
  styleUrls: ['./hischarts.component.css']
})
export class HischartsComponent implements OnInit {
  @Input() flag:boolean[];
  @Input() hisdata:any[];
  @Input() err:boolean[];  
  chart: Chart;
  // chart: Object;
  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    if(this.hisdata!=null && this.hisdata!=[]&&this.hisdata["Meta Data"]!=null&&this.hisdata["Time Series (Daily)"]!=null){
    var syb = this.hisdata["Meta Data"]["2. Symbol"];
    
    var arr1=[];
    var date=[];
    for (var i = 999; i >= 0; i--) {
      arr1.push(parseFloat(this.hisdata["Time Series (Daily)"][Object.keys(this.hisdata["Time Series (Daily)"])[i]]["4. close"]));
      date.push(Object.keys(this.hisdata["Time Series (Daily)"])[i].substr(5, 2) + "/" + Object.keys(this.hisdata["Time Series (Daily)"])[i].substr(8, 2));
    }
    this.chart = new Chart({
      chart: {
        height: 400,
        
    },

    title: {
        text: syb+' Stock Value'
    },
    subtitle: {
      text: '<a style=\"color:blue\"href=\"https://www.alphavantage.co/\">Source: Alpha Vantage</a>'
    },
    xAxis: {
      categories: date,
      tickInterval: 5,
    },
    series: [{
        name: 'Stock Value',
        data: arr1,
        type: 'area',
    }],

    
});
     

  }
  }

  ngOnInit() {
  }

}
