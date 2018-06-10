import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AutoCompleteService {


  constructor(private http: Http) { }
  getAutoinfo(that, type) {
    
      if (that != null && that != "") {
        return this.http.get('http://minchenyu.us-east-2.elasticbeanstalk.com/?Symbol='+that+'&type='+type);
      }
      else{
        return this.http.get('http://minchenyu.us-east-2.elasticbeanstalk.com');
      }
    }

}
