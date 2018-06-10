import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { Component,SimpleChanges,Input,ChangeDetectorRef }     from '@angular/core';
import { HttpModule,Http }              from '@angular/http';
import { BrowserModule }           from '@angular/platform-browser';
import { ChartModule }             from 'angular2-highcharts'; 
import * as moment from 'moment';

@Component({
    selector: 'app-histcharts',
    styleUrls: ["./histcharts.component.css"],
    templateUrl:"./histcharts.component.html" 
})
export class HistchartsComponent {
  
  @Input() flag:boolean[];
  @Input() hisdata:any[];
  @Input() err:boolean[];  
  innerWidth: number;
    constructor() {
        
      
    }

   
    
    options: Object;
    ngOnChanges(change:SimpleChanges){
    
      if(this.hisdata!=null && this.hisdata!=[]&&this.hisdata["Meta Data"]!=null&&this.hisdata["Time Series (Daily)"]!=null){
        var syb = this.hisdata["Meta Data"]["2. Symbol"];
        
        var arr1=[];
        var count=999;
        if(Object.keys(this.hisdata["Time Series (Daily)"]).length < 1000){
          count=Object.keys(this.hisdata["Time Series (Daily)"]).length-1;
        }
        // console.log(count);
        for (var i = count; i >= 0; i--) {
          var temp=[];
          temp =[moment(Object.keys(this.hisdata["Time Series (Daily)"])[i],"YYYY-MM-DD").unix()*1000,parseFloat(this.hisdata["Time Series (Daily)"][Object.keys(this.hisdata["Time Series (Daily)"])[i]]["4. close"])]
          arr1.push(temp);
          // temp.push(moment(Object.keys(this.hisdata["Time Series (Daily)"])[i]));
        }
        
        this.options = { 
            title: {
              text: syb+' Stock Value'
          },
          subtitle: {
            text: '<a style=\"color:blue\"href=\"https://www.alphavantage.co/\">Source: Alpha Vantage</a>'
          },
          yAxis: {
            title: {
                text: 'Stock Value'
            }
          },
          tooltip:{
            spilt:false
          },
          rangeSelector: {
            
                        buttons: [{
                            type: 'week',
                            count: 1,
                            text: '1w'
                        }, {
                            type: 'month',
                            count: 1,
                            text: '1m'
                        }, {
                          type: 'month',
                          count: 3,
                          text: '3m'
                      }, {
                            type: 'month',
                            count: 6,
                            text: '6m'
                        }, {
                          type: 'ytd',
                          text: 'YTD'
                      },{
                            type: 'year',
                            count: 1,
                            text: '1y'
                        }, {
                            type: 'all',
                            text: 'All'
                        }],
                        selected: 0
                    },
            
            series : [{
               type: 'area',
                name : 'AAPL', 
                data : arr1,
                tooltip: {
                    valueDecimals: 2 
                }
            }]
        };
    
    }
}

}