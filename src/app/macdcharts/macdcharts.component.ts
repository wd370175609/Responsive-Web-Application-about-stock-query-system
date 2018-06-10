import { Component, OnInit ,Input,SimpleChanges,Output,EventEmitter} from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-macdcharts',
  templateUrl: './macdcharts.component.html',
  styleUrls: ['./macdcharts.component.css']
})
export class MacdchartsComponent implements OnInit {
  @Input() flag:boolean[];
  @Input() stockdata_macd:any[];
  @Input() err:boolean[];
  constructor() { }
  chart: Chart;
  
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges(changes: SimpleChanges) {
      
    if (this.stockdata_macd !== null && this.stockdata_macd != [] && typeof this.stockdata_macd !== "undefined" &&this.stockdata_macd["Technical Analysis: MACD"]!=null) {
      var arr=[];
      var arr1=[];
      var arr2=[];
      var date=[];
      var syb =this.stockdata_macd["Meta Data"]["1: Symbol"];
      var count=130
      if(Object.keys(this.stockdata_macd["Technical Analysis: MACD"]).length < 131){
        count=Object.keys(this.stockdata_macd["Technical Analysis: MACD"]).length-1;
      }
    for( var i = count;i >= 0; i-- ){
       arr.push(parseFloat(this.stockdata_macd["Technical Analysis: MACD"][Object.keys(this.stockdata_macd["Technical Analysis: MACD"])[i]]["MACD"]));
       arr1.push(parseFloat(this.stockdata_macd["Technical Analysis: MACD"][Object.keys(this.stockdata_macd["Technical Analysis: MACD"])[i]]["MACD_Hist"]));
       arr2.push(parseFloat(this.stockdata_macd["Technical Analysis: MACD"][Object.keys(this.stockdata_macd["Technical Analysis: MACD"])[i]]["MACD_Signal"]));
       date.push(Object.keys(this.stockdata_macd["Technical Analysis: MACD"])[i].substr(5,2)+"/"+Object.keys(this.stockdata_macd["Technical Analysis: MACD"])[i].substr(8,2));
       
      }
      
     this.chart=new Chart( {
        title: {
              text: 'Moving Average Convergence/Divergence (MACD)'
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
                  text: 'MACD'
              }
          },
          legend: {
              
              align: 'center'
              
          },
          plotOptions: {
                series: {
                  lineWidth: 1,
                }
            },
          series: [

          {   
            color:'rgb(251,0,0)',
            name :syb+' MACD',
              data: arr
          },
          {	
            color:'rgb(0,143,234)',
            name:syb+' MACD_Hist',
          data:arr1

          },
       {	
         color:'rgb(180,0,234)',
         name:syb+' MACD_Signal',
         data:arr2

       }


       ]
     });
var optionsStr=JSON.stringify({
  title: {
    text: 'Moving Average Convergence/Divergence (MACD)'
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
        text: 'MACD'
    }
},
legend: {
    
    align: 'center'
    
},
plotOptions: {
      series: {
        lineWidth: 1,
      }
  },
series: [

{   
  color:'rgb(251,0,0)',
  name :syb+' MACD',
    data: arr
},
{	
  color:'rgb(0,143,234)',
  name:syb+' MACD_Hist',
data:arr1

},
{	
color:'rgb(180,0,234)',
name:syb+' MACD_Signal',
data:arr2

}


]
})
     this.sendout.emit(optionsStr);
      }
    }

  ngOnInit() {
  }

}
