import { Injectable, Inject, Optional,InjectionToken } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
private headers: HttpHeaders;
private config = {baseUrl:''};
  constructor(private httpClient: HttpClient ) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type','application/json');
    this.headers.set('Accept', 'application/json');
  }

  get<T>(requestUrl: string, httpParams: any ={}):Observable<any>{
    return this.httpClient
            .get<T>(this.config.baseUrl+requestUrl, {headers: this.headers, params: httpParams});
  }

  post<T>(requestUrl:string, bodyRequest:any):Observable<any>{
    return this.httpClient.post<T>(this.config.baseUrl+requestUrl,bodyRequest,{headers: this.headers});
  }

  put<T>(requestUrl:string,bodyRequest:any):Observable<any>{
    return this.httpClient.put(this.config.baseUrl+requestUrl, bodyRequest,{headers: this.headers});
  }

  delete<T>(requestUrl:string):Observable<any>{
    return this.httpClient.delete(this.config.baseUrl+requestUrl,{headers: this.headers});
  }

}
