
import { MatAutocompleteModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { AutoCompleteService } from './app.component.service';
import { Component, OnInit, ChangeDetectionStrategy, Input,Pipe,PipeTransform ,ElementRef,ChangeDetectorRef,ViewChild} from '@angular/core';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';

import { DomSanitizer } from '@angular/platform-browser'


@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit{
  items=[];
  fav_text="";
  fav_content;
  visible = true;
  order = 0;
  sorttype="Default";
  orderclass:any=true;
  rightabled=true;
  clear=false;
 checkauto;
 saveUsername=true;
  flag1show=true;
  starflag=true;
  constructor(private autoCom: AutoCompleteService,private elRef:ElementRef, private cdRef:ChangeDetectorRef) {
    this.Print();

  }
  
  //  @ViewChild("auto_refresh") checktoggle;
   
   ngAfterViewInit(){
    // function click(){
    //   this.autofresh();
    // }
    // $("#auto_refresh").click(function(){
    //   click();
    // })
    // $("#auto_refresh").trigger("click");
    
  }
  // var a=this.checktoggle.nativeElement
  // a.onchange = function(){ this.autofresh();}

  ngOnInit(){
    
    
     
  }
  
  Print(){
    if(localStorage.length>0){
      this.flag1show=true;
    } else{
      this.flag1show=false;
    }
    //console.log("print");
    this.items=[];
    // this.fav_text="";
    for(var i = 0; i < localStorage.length; i++){
      var key=localStorage.key(i);
      this.items.push(JSON.parse(key));
    }
    // for(var i = 0; i < localStorage.length; i++){
    //   var message=localStorage.getItem(localStorage.key(i));
    //   var symbol = message.split(" ")[0];
    //   var price = message.split(" ")[1];
    //   var change = message.split(" ")[2];
    //   var changepercent = message.split(" ")[3];
    //   var picsrc = message.split(" ")[4];
    //   var col = message.split(" ")[5];
    //   var volume =message.split(" ")[6].toLocaleString();
    //   var text = "<tr><th>"+symbol+"</th><td>"+price+"</td><td style=\"color:"+col+";\">"+change+"("+changepercent+"%)<img src='"+picsrc+"'width='15px' height='15px'></td><td>"+Number(volume).toLocaleString()+"</td><td><button id='"+symbol+"' class='btn btn-default trash'><span class='glyphicon glyphicon-trash'></span></button></td></tr>"
    //   this.fav_text +=text;
    // } 
  }




  onClear(){
    this.rightabled=true;
    this.clear=!this.clear;
    this.in_value="";
    this.visible = true;
    this.flag = [false, false, false, false, false, false, false, false, false, false, false];
    this.err = [false, false, false, false, false, false, false, false, false, false, false];
  }




  slide(){
    this.visible=!this.visible;
  }




  ////////////////receive output
  onNotify(message:string): void {
    if(message.length < 6){
      for(var i = 0; i < localStorage.length; i++){
        var value = localStorage.getItem(localStorage.key(i));
        var symbol = value.split(" ")[0];
        if(symbol==message){
          localStorage.removeItem(localStorage.key(i));
        } 
      }
    }else{
    var symbol = message.split(" ")[0];
    var price = message.split(" ")[1];
    var change = message.split(" ")[2];
    var changepercent = message.split(" ")[3];
    var picsrc = message.split(" ")[4];
    var col = message.split(" ")[5];
    var volume =Number(message.split(" ")[6]).toLocaleString();
    var key ={'sym':symbol,'pri':price,'cg':change,'cgp':changepercent,'picsrc':picsrc,'color':col,'vol':volume};
    localStorage.setItem(JSON.stringify(key),message);
    }
    this.Print();
  }

  /////////delete

delete(event:any){
  var sym=event.target.id
  for(var i = 0; i < localStorage.length; i++){
    var value = localStorage.getItem(localStorage.key(i));
    var symbol = value.split(" ")[0];
    if(symbol==sym){
      localStorage.removeItem(localStorage.key(i));
    } 
  }
  this.starflag=!this.starflag;
  this.orderedprint();
}


orderedprint(){
  var value1= this.sorttype;
  this.sortchoose(value1);
}


/////////////////
autofresh(){
  setInterval(()=>{this.refresh();},5000);
}
//////////////////appear everytime// refresh
  refresh() {

    var data
    for (var i = 0; i < localStorage.length; i++) {
      var message=localStorage.getItem(localStorage.key(i));
      var symbol = message.split(" ")[0];
      this.autoCom.getAutoinfo(symbol, "stock-price").subscribe(response => {
        data = response.json();
        //console.log(data);
        if (data != null && data["Meta Data"] != null) {
          var today = data["Meta Data"]["3. Last Refreshed"].substr(0, 10);
          var symbol = data["Meta Data"]["2. Symbol"];
          var stockprice = Number(data["Time Series (Daily)"][today]["4. close"]).toFixed(2);
          var change = Number(data["Time Series (Daily)"][today]["4. close"] - data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[1]]["4. close"]).toFixed(2);
          var changepercent = Number((Number(change) * 100) / data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[1]]["4. close"]).toFixed(2);
          var volume = Number(data["Time Series (Daily)"][today]["5. volume"]);
          var picsrc,col;
          if (Number(change) >= 0) {
            picsrc = "http://cs-server.usc.edu:45678/hw/hw8/images/Up.png";
            col="green";
          } else {
            picsrc = "http://cs-server.usc.edu:45678/hw/hw8/images/Down.png";
            col="red";
          }
          for(var i = 0; i < localStorage.length; i++){
            var value = localStorage.getItem(localStorage.key(i));
            var symbol1 = value.split(" ")[0];
            if(symbol1==symbol){
              localStorage.removeItem(localStorage.key(i));
            } 
          }
          var input=symbol+" "+stockprice+" "+change+" "+changepercent+" "+picsrc+" "+col+" "+volume;
          var key ={'sym':symbol,'pri':stockprice,'cg':change,'cgp':changepercent,'picsrc':picsrc,'color':col,'vol':volume};
          localStorage.setItem(JSON.stringify(key),input);
         this.orderedprint();
          // this.fav_text="<tr><th (click)='clickitem("+this.items[i].sym+")'>"+this.items[i].sym+"</th><td>"+this.items[i].sp+"</td><td style=\"color:"+this.items[i].col+";\">"+this.items[i].cg+"("+this.items[i].cgp+"%)<img src='"+this.items[i].picsrc+"'width='15px' height='15px'></td><td>"+this.items[i].vol+"</td><td><button class='btn btn-default'><span class='glyphicon glyphicon-trash'></span></button></td></tr>"
          // this.cdRef.detectChanges();
          // this.elRef.nativeElement.querySelector('th').addEventListener('click', this.clickitem.bind(this));
        }
      });
    }
   
  }

  sortchoose(value1){
    
    if(value1 == "Symbol"){
      //console.log(this.orderclass);
      this.orderclass=false;
     // console.log(this.orderclass);
      this.sortsym();
    } else if(value1 == "Price"){
      this.orderclass=false;
      this.sort0(1);
     
    } else if(value1 =="Change"){
      this.orderclass=false;
      this.sort0(2);
      
    } else if(value1 =="Change Percent"){
      this.orderclass=false;
      this.sort0(3);
     
    }  else if (value1 =="Volume"){
      this.orderclass=false;
      this.sort0(6);
    
    } else if(value1  =="Default"){
      this.orderclass=true;
      this.Print();
    }
  }


  ///////sort 
  sortorder(event:any){
    var value = event.target.value;
    if(value=="Ascending"){
      this.order=0;
    } else {
      this.order=1;
    }
    var value1= this.sorttype;
  //  this.sortchoose(value1);
  if(value1 == "Symbol"){
   // console.log(this.orderclass);
    this.orderclass=false;
    //console.log(this.orderclass);
    this.sortsym();
  } else if(value1 == "Price"){
    this.orderclass=false;
    this.sort0(1);
   
  } else if(value1 =="Change"){
    this.orderclass=false;
    this.sort0(2);
    
  } else if(value1 =="Change Percent"){
    this.orderclass=false;
    this.sort0(3);
   
  }  else if (value1 =="Volume"){
    this.orderclass=false;
    this.sort0(6);
  
  } else if(value1  =="Default"){
    this.orderclass=true;
    this.Print();
  }
  }
sort(event:any){
  
   this.sorttype = event.target.value;
   var value=event.target.value;
  this.sortchoose(value);
}


//////////////////////////////////////////////////////////
sortsym(){
  var map = new Map();
  var arr=[] ;
  for(var i = 0; i < localStorage.length; i++){
    var mess=localStorage.getItem(localStorage.key(i));
    var data = mess.split(" ")[0];
    arr.push(data);
    map.set(data,mess);
  }
  if(this.order == 1){
    arr.sort(function(a,b){
     if(a > b) return 1;
     else return -1;
      }
    )
  } else{
    arr.sort(function(a,b){
      if(a < b) return 1;
      else return -1;
       }
     )
  }
    //console.log(arr);
    // this.fav_text="";
    this.items=[];
    for(var i =0; i< arr.length; i++){
    
      var message = map.get(arr[i]);
      // var sym = message.split(" ")[0];
      // var price = message.split(" ")[1];
      // var change = message.split(" ")[2];
      // var changepercent = message.split(" ")[3];
      // var picsrc = message.split(" ")[4];
      // var col = message.split(" ")[5];
      // var volume =message.split(" ")[6];
      // var text = "<tr><th>"+sym+"</th><td>"+price+"</td><td style=\"color:"+col+";\">"+change+"("+changepercent+"%)<img src='"+picsrc+"'width='15px' height='15px'></td><td>"+Number(volume).toLocaleString()+"</td><td><button class='btn btn-default'(click)='delete("+sym+")'><span class='glyphicon glyphicon-trash'></span></button></td></tr>"
      // this.fav_text +=text;
      var symbol = message.split(" ")[0];
      var price = message.split(" ")[1];
      var change = message.split(" ")[2];
      var changepercent = message.split(" ")[3];
      var picsrc = message.split(" ")[4];
      var col = message.split(" ")[5];
      var volume =message.split(" ")[6].toLocaleString();
      var key ={'sym':symbol,'pri':price,'cg':change,'cgp':changepercent,'picsrc':picsrc,'color':col,'vol':volume};
      this.items.push(key);
    }
}
  sort0(num){
  var map = new Map();
  var arr=[] ;
  for(var i = 0; i < localStorage.length; i++){
    var mess=localStorage.getItem(localStorage.key(i));
    var data = parseFloat(mess.split(" ")[num]);
    arr.push(data);
    map.set(data,mess);
  }
  if(this.order == 1){
   // console.log("1");
    arr.sort(function(a,b){
     if(a < b) return 1;
     else return -1;
      }
    )
  } else{
    arr.sort(function(a,b){
     // console.log("2");
      if(a > b) return 1;
      else return -1;
       }
     )
  }
    //console.log(arr);
    this.items=[];
    for(var i =0; i< arr.length; i++){
      var message = map.get(arr[i]);
      // var sym = message.split(" ")[0];
      // var price = message.split(" ")[1];
      // var change = message.split(" ")[2];
      // var changepercent = message.split(" ")[3];
      // var picsrc = message.split(" ")[4];
      // var col = message.split(" ")[5];
      // var volume =message.split(" ")[6];
      // var text = "<tr><th>"+sym+"</th><td>"+price+"</td><td style=\"color:"+col+";\">"+change+"("+changepercent+"%)<img src='"+picsrc+"'width='15px' height='15px'></td><td>"+Number(volume).toLocaleString()+"</td><td><button class='btn btn-default'(click)='delete("+sym+")'><span class='glyphicon glyphicon-trash'></span></button></td></tr>"
      // this.fav_text +=text;
      var symbol = message.split(" ")[0];
      var price = message.split(" ")[1];
      var change = message.split(" ")[2];
      var changepercent = message.split(" ")[3];
      var picsrc = message.split(" ")[4];
      var col = message.split(" ")[5];
      var volume =message.split(" ")[6].toLocaleString();
      var key ={'sym':symbol,'pri':price,'cg':change,'cgp':changepercent,'picsrc':picsrc,'color':col,'vol':volume};
      this.items.push(key);
    }
   

}

///////////////////
 data=[];

  valid = true;
  in_value = "";
  text = "";
  myControl: FormControl = new FormControl();
  stockdata: any[];
  stockdata_sma: any[];
  stockdata_ema: any[];
  stockdata_rsi: any[];
  stockdata_cci: any[];
  stockdata_adx: any[];
  stockdata_stoch: any[];
  stockdata_bbands: any[];
  stockdata_macd: any[];
  hisdata: any[];
  newsdata: any[];
  myclick: String;
  flag = [false, false, false, false, false, false, false, false, false, false, false];
  err = [false, false, false, false, false, false, false, false, false, false, false];
  // send_check(dataname:any[],datatype:String,num:number){
  //   // console.log("1");
  //   this.autoCom.getAutoinfo(this.in_value, datatype).subscribe(response => {
  //     dataname = response.json();
  //     console.log(dataname);
  //     if(dataname["Meta Data"]!=null){
  //       console.log("0");
  //       this.flag[num]=true;
  //     } else{
  //       console.log("1");
  //       this.send_check(dataname,datatype,num);
  //     }
  //   });



  // this.err[num]=true;
  // }
  link(event:any){
    this.in_value= event.target.id
    this.onClick();
  }
  clickitem(that){
    this.in_value = that;
    this.onClick();
  }
  onClick() {
  
    this.rightabled=false;
    this.visible = false;
    this.flag = [false, false, false, false, false, false, false, false, false, false, false];
    // this.send_check(this.stockdata,"stock-price",0);
    this.err = [false, false, false, false, false, false, false, false, false, false, false];


    this.autoCom.getAutoinfo(this.in_value, "stock-price").subscribe(response => {
      this.stockdata = response.json();
      //console.log(this.stockdata);
      if (this.stockdata["Meta Data"] != null) {
        this.flag[0] = true;
      } else {
        this.err[0] = true;

      }
    });



    setTimeout(500);

    this.autoCom.getAutoinfo(this.in_value, "SMA").subscribe(response => {
      this.stockdata_sma = response.json();
      //console.log(this.stockdata_sma);
      if (this.stockdata_sma["Meta Data"] != null && this.stockdata_sma["Technical Analysis: SMA"] != null) {
        this.flag[1] = true;
      } else {
        this.err[1] = true;

      }
    });
    setTimeout(500);

    this.autoCom.getAutoinfo(this.in_value, "EMA").subscribe(response => {
      this.stockdata_ema = response.json();
      //console.log(this.stockdata_ema);
      if (this.stockdata_ema["Meta Data"] != null && this.stockdata_ema["Technical Analysis: EMA"] != null) {
        this.flag[2] = true;
      } else {
        this.err[2] = true;

      }
    });
    setTimeout(500);
    this.autoCom.getAutoinfo(this.in_value, "RSI").subscribe(response => {
      this.stockdata_rsi = response.json();
      //console.log(this.stockdata_rsi);
      if (this.stockdata_rsi["Meta Data"] != null && this.stockdata_rsi["Technical Analysis: RSI"] != null) {
        this.flag[3] = true;
      } else {
        this.err[3] = true;

      }
    });

    setTimeout(500);
    this.autoCom.getAutoinfo(this.in_value, "ADX").subscribe(response => {
      this.stockdata_adx = response.json();
      //console.log(this.stockdata_adx);
      if (this.stockdata_adx["Meta Data"] != null && this.stockdata_adx["Technical Analysis: ADX"] != null) {
        this.flag[4] = true;
      } else {
        this.err[4] = true;

      }
    });
    setTimeout(500);
    this.autoCom.getAutoinfo(this.in_value, "CCI").subscribe(response => {
      this.stockdata_cci = response.json();
      //console.log(this.stockdata_cci);
      if (this.stockdata_cci["Meta Data"] != null && this.stockdata_cci["Technical Analysis: CCI"] != null) {
        this.flag[5] = true;
      } else {
        this.err[5] = true;

      }
    });
    setTimeout(500);

    this.autoCom.getAutoinfo(this.in_value, "STOCH").subscribe(response => {
      this.stockdata_stoch = response.json();
      //console.log(this.stockdata_stoch);
      if (this.stockdata_stoch["Meta Data"] != null) {
        this.flag[6] = true;
      } else {
        this.err[6] = true;

      }
    });
    setTimeout(500);
    this.autoCom.getAutoinfo(this.in_value, "BBANDS").subscribe(response => {
      this.stockdata_bbands = response.json();
      //console.log(this.stockdata_bbands);
      if (this.stockdata_bbands["Meta Data"] != null && this.stockdata_bbands["Technical Analysis: BBANDS"] != null) {
        this.flag[7] = true;
      } else {
        this.err[7] = true;

      }
    });
    setTimeout(500);
    this.autoCom.getAutoinfo(this.in_value, "MACD").subscribe(response => {
      this.stockdata_macd = response.json();
      // console.log(this.stockdata_macd);
      if (this.stockdata_macd["Meta Data"] != null && this.stockdata_macd["Technical Analysis: MACD"] != null) {
        this.flag[8] = true;
      } else {
        this.err[8] = true;

      }
    });
    this.autoCom.getAutoinfo(this.in_value, "stock-price").subscribe(response => {

      this.hisdata = response.json();
      // console.log(this.hisdata);
      if (this.hisdata["Meta Data"] != null) {
        this.flag[9] = true;
      } else {
        this.err[9] = true;

      }
    });
    setTimeout(500);
    this.autoCom.getAutoinfo(this.in_value, "news").subscribe(response => {
      // console.log(this.newsdata);
      this.newsdata = response.json();
      if (this.newsdata["rss"]["channel"] != null) {
        this.flag[10] = true;
      } else {
        this.err[10] = true;

      }
    });
  }
  onKey(event: any) {


    if (this.in_value.length != 0 && this.in_value.split(" ").length - 1 != this.in_value.length) {
      this.valid = false;
      event.target.style = "";
      this.text = "";
      this.autoCom.getAutoinfo(this.in_value, "auto").subscribe(response => {
        this.data = response.json();
      });

    }
    else {
      this.valid = false;
      event.target.style = "border-color:red";
      this.text = "Please enter a stock ticker symbol";
    }

  }



}
type PaneType = 'left' | 'right';