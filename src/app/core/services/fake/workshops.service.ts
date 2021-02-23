import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Area, Workshop } from '../../models/workshops/workshops';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {

  private timeNow = Date.now();
  private tomorrow = new Date(this.timeNow);
  private yesterday = new Date(this.timeNow);
  // this.date.setDate(this.date.getDate()+1);

  private _workshops:Workshop[]=[
    {name:'State of JavaScript',idArea: 1, date: this.tomorrow , by:'Juan Pablo de la torre',urlSocial:'http://twitter.com'},
    {name:'IA con Python',idArea:2, date: this.yesterday, by:'Yesi Days',urlSocial:'http://twitter.com'},
    {name:'State of JavaScript',idArea: 1, date: this.tomorrow , by:'Juan Pablo de la torre',urlSocial:'http://twitter.com'},
    {name:'IA con Python',idArea:2, date: this.yesterday, by:'Yesi Days',urlSocial:'http://twitter.com'},
    {name:'State of JavaScript',idArea: 1, date: this.tomorrow , by:'Juan Pablo de la torre',urlSocial:'http://twitter.com'},
    {name:'IA con Python',idArea:2, date: this.yesterday, by:'Yesi Days',urlSocial:'http://twitter.com'},

  ];
  private _area:Area[]=[
    {id:1,name:'Frontend'},
    {id:2,name:'Backend'},
    {id:3,name:'DevOps'},
    {id:4,name:'Video Game Developers'},
    {id:5,name:'UI/UX'},
    {id:6,name:'Database Developer'},
    {id:7,name:'Cloud Computing'},
  ];

  constructor() {
      this.tomorrow.setDate(this.tomorrow.getDate()+1);
      this.yesterday.setDate(this.yesterday.getDate()-1);

   }

  getWorkshops():Observable<Workshop[]>{
    return of(this._workshops);
  }

  getAreas():Observable<Area[]>{
    return of(this._area);
  }

}
