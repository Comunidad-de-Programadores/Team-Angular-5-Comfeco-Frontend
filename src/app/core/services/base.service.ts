import { Injectable, Inject, Optional,InjectionToken } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
private headers: HttpHeaders;
private config = {baseUrl:'https://restcountries.eu/rest/v2/'};
  constructor(private httpClient: HttpClient ) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type','application/json');
    this.headers.set('Accept', 'application/json');
  }

  get<T>(baseUrl:string, requestUrl: string, httpParams: any ={}):Observable<any>{
    return this.httpClient
            .get<T>(baseUrl+requestUrl, {headers: this.headers, params: httpParams});
  }

  post<T>(baseUrl:string, requestUrl:string, bodyRequest:any):Observable<any>{
    return this.httpClient.post<T>(baseUrl+requestUrl,bodyRequest,{headers: this.headers});
  }

  put<T>(baseUrl:string,requestUrl:string,bodyRequest:any):Observable<any>{
    return this.httpClient.put(baseUrl+requestUrl, bodyRequest,{headers: this.headers});
  }

  delete<T>(baseUrl:string,requestUrl:string):Observable<any>{
    return this.httpClient.delete(baseUrl+requestUrl,{headers: this.headers});
  }

}
