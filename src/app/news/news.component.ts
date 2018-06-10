import { Component, OnInit,Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
@Input() newsdata:any[];
@Input() flag:boolean[];
@Input() err:boolean[];
channel;
title=[];
link=[];
author=[];
pubdate=[];
  constructor() { }
  ngOnChanges(change:SimpleChanges){
    if(this.newsdata!=null && this.newsdata!=[]&&this.newsdata["rss"]["channel"]!= null&&this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"]!= null){
      var j=0,i=0;
      while(i<5 && j < Object.keys(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"]).length){  
        if(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"][Object.keys(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"])[j]]["link"][0].substr(0,32) == "https://seekingalpha.com/article"){
         // console.log(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"][Object.keys(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"])[j]]["link"][0]);
            this.title.push(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"][Object.keys(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"])[j]]["title"][0]);
            this.link.push(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"][Object.keys(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"])[j]]["link"][0]);
            this.author.push(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"][Object.keys(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"])[j]]["sa:author_name"][0]);
            this.pubdate.push(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"][Object.keys(this.newsdata["rss"]["channel"][Object.keys(this.newsdata["rss"]["channel"])[0]]["item"])[j]]["pubDate"][0].substr(0,25)+" EST");
            i++;
          }
           j++;
      }
    
    }
  }
  ngOnInit() {
  }

}
