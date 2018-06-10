import { Component, OnInit ,Input,SimpleChanges,Output,EventEmitter} from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
@Component({
  selector: 'app-bbandscharts',
  templateUrl: './bbandscharts.component.html',
  styleUrls: ['./bbandscharts.component.css']
})
export class BbandschartsComponent implements OnInit {
  @Input() flag:boolean[];
  @Input() stockdata_bbands:any[];
  @Input() err:boolean[];
  constructor() { }
  chart: Chart;
  
  @Output() sendout: EventEmitter<string> = new EventEmitter<string>();
    ngOnChanges(changes: SimpleChanges) {
    
    if (this.stockdata_bbands !== null && this.stockdata_bbands != [] && typeof this.stockdata_bbands !== "undefined" &&this.stockdata_bbands["Technical Analysis: BBANDS"]!=null) {
      var arr=[];
      var arr1=[];
      var arr2=[];
      var date=[];
      var syb =this.stockdata_bbands["Meta Data"]["1: Symbol"];
      var count=130
      if(Object.keys(this.stockdata_bbands["Technical Analysis: BBANDS"]).length < 131){
        count=Object.keys(this.stockdata_bbands["Technical Analysis: BBANDS"]).length-1;
      }
    for(var i = count;i >= 0; i-- ){
       arr.push(parseFloat(this.stockdata_bbands["Technical Analysis: BBANDS"][Object.keys(this.stockdata_bbands["Technical Analysis: BBANDS"])[i]]["Real Middle Band"]));
       arr1.push(parseFloat(this.stockdata_bbands["Technical Analysis: BBANDS"][Object.keys(this.stockdata_bbands["Technical Analysis: BBANDS"])[i]]["Real Lower Band"]));
       arr2.push(parseFloat(this.stockdata_bbands["Technical Analysis: BBANDS"][Object.keys(this.stockdata_bbands["Technical Analysis: BBANDS"])[i]]["Real Upper Band"]));
       date.push(Object.keys(this.stockdata_bbands["Technical Analysis: BBANDS"])[i].substr(5,2)+"/"+Object.keys(this.stockdata_bbands["Technical Analysis: BBANDS"])[i].substr(8,2));
       
      }
      
    this.chart=new Chart({
        title: {
              text: 'Bollinger Bands (BBANDS)'
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
                  text: 'BBANDS'
              }
          },
          
          plotOptions: {
                series: {
                  lineWidth: 1
                }
            },
          series: [

          {   
            color:'rgb(251,0,0)',
            name :syb+' Real Middle Band',
              data: arr
       },
       {	
         color:'rgb(0,143,234)',
         name:syb+' Real Lower Band',
         data:arr1

       },
       {	
         color:'rgb(180,0,234)',
         name:syb+' Real Upper Band',
         data:arr2

       }


       ]
     });
var optionsStr = JSON.stringify({
  title: {
    text: 'Bollinger Bands (BBANDS)'
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
        text: 'BBANDS'
    }
},

plotOptions: {
      series: {
        lineWidth: 1
      }
  },
series: [

{   
  color:'rgb(251,0,0)',
  name :syb+' Real Middle Band',
    data: arr
},
{	
color:'rgb(0,143,234)',
name:syb+' Real Lower Band',
data:arr1

},
{	
color:'rgb(180,0,234)',
name:syb+' Real Upper Band',
data:arr2

}


]
      }
    )


      this.sendout.emit(optionsStr);
    }
  }
  ngOnInit() {
  }

}
