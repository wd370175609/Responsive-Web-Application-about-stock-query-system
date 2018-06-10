import { Component, OnInit,Input,SimpleChanges,Output,EventEmitter } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
@Component({
  selector: 'app-stochcharts',
  templateUrl: './stochcharts.component.html',
  styleUrls: ['./stochcharts.component.css']
})
export class StochchartsComponent implements OnInit {
  @Input() flag:boolean[];
  @Input() stockdata_stoch:any[];
  @Input() err:boolean[];
  constructor() { }
  chart: Chart;
  
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges(changes: SimpleChanges) {
      
    if (this.stockdata_stoch !== null && this.stockdata_stoch != [] && typeof this.stockdata_stoch !== "undefined" &&this.stockdata_stoch["Technical Analysis: STOCH"]!=null) {
      var arr=[];
      var arr1=[];
      var date=[];
      var syb =this.stockdata_stoch["Meta Data"]["1: Symbol"];
      var count=130
      if(Object.keys(this.stockdata_stoch["Technical Analysis: STOCH"]).length < 131){
        count=Object.keys(this.stockdata_stoch["Technical Analysis: STOCH"]).length-1;
      }
    for(var i = count;i >= 0; i-- ){
       arr.push(parseFloat(this.stockdata_stoch["Technical Analysis: STOCH"][Object.keys(this.stockdata_stoch["Technical Analysis: STOCH"])[i]]["SlowK"]));
       arr1.push(parseFloat(this.stockdata_stoch["Technical Analysis: STOCH"][Object.keys(this.stockdata_stoch["Technical Analysis: STOCH"])[i]]["SlowD"]));
       date.push(Object.keys(this.stockdata_stoch["Technical Analysis: STOCH"])[i].substr(5,2)+"/"+Object.keys(this.stockdata_stoch["Technical Analysis: STOCH"])[i].substr(8,2));
       
      }
      
      this.chart=new Chart({
        title: {
              text: 'Stochastic Oscillator (STOCH)'
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
                  text: 'STOCH'
              }
          },
       
          plotOptions: {
                series: {
                  lineWidth: 1,

                }
            },
          series: [

          {   
            color:'rgb(251,0,0)',
            name :syb+' SlowK',
              data: arr
       },
       {	
         color:'rgb(0,143,234)',
         name:syb+' SlowD',
         data:arr1

       }


       ]
     });
     var optionsStr=JSON.stringify({
      title: {
        text: 'Stochastic Oscillator (STOCH)'
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
            text: 'STOCH'
        }
    },
 
    plotOptions: {
          series: {
            lineWidth: 1,

          }
      },
    series: [

    {   
      color:'rgb(251,0,0)',
      name :syb+' SlowK',
        data: arr
 },
 {	
   color:'rgb(0,143,234)',
   name:syb+' SlowD',
   data:arr1

 }


 ]


     })
     this.sendout.emit(optionsStr);
      }
    }
  ngOnInit() {
  }

}
