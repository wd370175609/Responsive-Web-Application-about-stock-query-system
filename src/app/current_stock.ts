import {Component,Input,SimpleChanges,Output,EventEmitter} from '@angular/core';
import { AutoCompleteService } from'./app.component.service';  
import { FacebookService, InitParams} from 'ngx-facebook';
import {  LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook'
import exporting from 'highcharts/modules/exporting.src';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Http,Headers} from '@angular/http';
@Component({
  selector: 'current-stock',
  templateUrl: 'current_stock.html',
  styleUrls: ['current_stock.css']
})
export class current_stock{
  constructor(private http: Http,private autoCom:AutoCompleteService,private fb: FacebookService){
    let initParams: InitParams = {
      appId: '145220376111733',
      xfbml: true,
      version: 'v2.8'
    };
    fb.init(initParams);
  }

  
    date;
    timezone;
    day;
    lastprice;
    change;
    open;
    high;
    low;
    volume;
    close;
    changepercent;
    picsrc;
    col;
    symbol;
    former:any[];
    starclass="glyphicon glyphicon-star-empty";
    btnclass=true;
    text;
    pricechart:any;
    smachart;
    emachart;
    rsichart;
    ccichart;
    macdchart;
    bbandschart;
    stochchart;
    adxchart;
    URL:string;
  @Input() flag:boolean[];
  @Input() err:boolean[];
  @Input() stockdata:any[];
  @Input() stockdata_sma:any[];
  @Input() stockdata_ema:any[];
  @Input() stockdata_adx:any[];
  @Input() stockdata_cci:any[];
  @Input() stockdata_rsi:any[];
  @Input() stockdata_stoch:any[];
  @Input() stockdata_bbands:any[];
  @Input() stockdata_macd:any[];
  @Input() clear;
  @Input() starflag;

  ngOnChanges(changes:SimpleChanges){
    
    this.btnclass=true;
    this.starclass="glyphicon glyphicon-star-empty";
    if(this.stockdata!=null&&this.stockdata!=[]&&this.stockdata["Meta Data"]!=null&&this.stockdata["Time Series (Daily)"]!=null){
      // console.log(this.stockdata["Meta Data"]);
    this.btnclass=false;
    this.symbol=this.stockdata["Meta Data"]["2. Symbol"];
    for(var i = 0; i < localStorage.length; i++){
      var value = localStorage.getItem(localStorage.key(i));
      var symbol = value.split(" ")[0];
      if(symbol==this.symbol){
        this.starclass="glyphicon glyphicon-star";
      } 
    }
      
    
    this.date=this.stockdata["Meta Data"]["3. Last Refreshed"];
    this.timezone=this.stockdata["Meta Data"]["5. Time Zone"];
    this.day=this.date.substr(0,10);
    this.high=Number(this.stockdata["Time Series (Daily)"][this.day]["2. high"]).toFixed(2);
    this.low=Number(this.stockdata["Time Series (Daily)"][this.day]["3. low"]).toFixed(2);
    this.lastprice=Number(this.stockdata["Time Series (Daily)"][this.day]["4. close"]).toFixed(2);
    this.open = Number(this.stockdata["Time Series (Daily)"][this.day]["1. open"]).toFixed(2);
    this.volume=Number(this.stockdata["Time Series (Daily)"][this.day]["5. volume"]).toLocaleString();
    this.change =Number(this.stockdata["Time Series (Daily)"][this.day]["4. close"]-this.stockdata["Time Series (Daily)"][Object.keys(this.stockdata["Time Series (Daily)"])[1]]["4. close"]).toFixed(2);
      ///////close
    if(this.date!=this.day){
      this.close = Number(this.stockdata["Time Series (Daily)"][Object.keys(this.stockdata["Time Series (Daily)"])[1]]["4. close"]).toFixed(2);
      this.date=this.date.concat(" EST");
    } else{
      this.close= Number(this.stockdata["Time Series (Daily)"][this.day]["4. close"]).toFixed(2);
      this.date=this.date.concat(" 16:00:00 EST");
    }
    //////changepercent
    
    this.changepercent = Number((this.change*100)/this.stockdata["Time Series (Daily)"][Object.keys(this.stockdata["Time Series (Daily)"])[1]]["4. close"]).toFixed(2);
    if(this.change >= 0){
      this.picsrc="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png";
      this.col="green";
    } else {
      this.picsrc="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png";
      this.col="red";
    }
    ////////timestampe
    this.former=this.stockdata;

  }
  }
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
////////////////////////////////////////
getpricechart(input:string): void{
  //console.log(input);
  this.pricechart=input;
 // console.log(this.pricechart);
}
getsmachart(input:string):void{
  this.smachart=input;
}
getemachart(input:string):void{
  this.emachart=input;
}
getccichart(input:string):void{
  this.ccichart=input;
}

getstochchart(input:string):void{
  this.stochchart=input;
}
getbbandschart(input:string):void{
  this.bbandschart=input;
}
getrsichart(input:string):void{
  this.rsichart=input;
}
getmacdchart(input:string):void{
  this.macdchart=input;
}
getadxchart(input:string):void{
  this.adxchart=input;
}
////////////////////////////////////
Onclick(){
  this.text= this.symbol+" "+this.lastprice+" "+this.change+" "+this.changepercent+" "+this.picsrc+" "+this.col+" "+Number(this.stockdata["Time Series (Daily)"][this.day]["5. volume"]);
  if(this.starclass=="glyphicon glyphicon-star-empty"){
      this.starclass="glyphicon glyphicon-star";
      this.notify.emit(this.text);
  } 
  else{
    this.starclass="glyphicon glyphicon-star-empty";
    this.notify.emit(this.symbol);
  }
}




share(){
  var jsonStr:string;
  if($('ul.nav-tabs li.active a').attr("href")=="#price"){
   // console.log("1");
    jsonStr=this.pricechart;
  } else if($('ul.nav-tabs li.active a').attr("href")=="#sma"){
    jsonStr=this.smachart;
  }else if($('ul.nav-tabs li.active a').attr("href")=="#ema"){
    jsonStr=this.emachart;
  }else if($('ul.nav-tabs li.active a').attr("href")=="#cci"){
    jsonStr=this.ccichart;
  }else if($('ul.nav-tabs li.active a').attr("href")=="#adx"){
    jsonStr=this.adxchart;
  }else if($('ul.nav-tabs li.active a').attr("href")=="#stoch"){
    jsonStr=this.stochchart;
  }else if($('ul.nav-tabs li.active a').attr("href")=="#rsi"){
    jsonStr=this.rsichart;
  }else if($('ul.nav-tabs li.active a').attr("href")=="#bbands"){
    jsonStr=this.bbandschart;
  }else if($('ul.nav-tabs li.active a').attr("href")=="#macd"){
    jsonStr=this.macdchart;
  }
  var url = 'http://export.highcharts.com/';
  //console.log(jsonStr);
  var dataString = encodeURI('async=false&type=jpeg&width=400&options=' + jsonStr);
  var fb1=this.fb
    $.ajax({
          type: 'POST',
          data: dataString,
          url: url,
          success: function (data) {
             // console.log('get the file from relative url: ', data);
              this.URL=url+data;
              //console.log(this.URL);
              let params: UIParams = {
                method: 'feed',
                picture:this.URL
              };
              fb1.ui(params)
              .then((res: UIResponse) => console.log(res))
              .catch((e: any) => console.error(e))
              
          },
          error: function (err) {
              debugger;
              console.log('error', err.statusText)
          }
      });
    
    
  
      
   
   }
}


