import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Area, Workshop } from '../../models/workshops/workshops';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {

  private timeNow = Date.now();
  private finalized = new Date(this.timeNow);
  private  toStart= new Date(this.timeNow);
  // this.date.setDate(this.date.getDate()+1);

  private _workshops:Workshop[]=[
    {name:'State of JavaScript',idArea: 1, date: this.toStart , by:'Juan Pablo de la torre',urlSocial:'http://twitter.com'},
    {name:'IA con Python',idArea:2, date: this.finalized, by:'Yesi Days',urlSocial:'http://twitter.com'},
    {name:'Serverless. ¿Buena idea? ',idArea: 2, date: this.finalized , by:'Juan Pablo de la torre',urlSocial:'http://twitter.com'},
    {name:'Animaciones en Unity',idArea:4, date: this.toStart, by:'Yesi Days',urlSocial:'http://twitter.com'},
    {name:'NgRX from zero to hero',idArea: 1, date: this.toStart , by:'Juan Pablo de la torre',urlSocial:'http://twitter.com'},
    {name:'Ng Baires ng + firebase',idArea:6, date: this.toStart, by:'Yesi Days',urlSocial:'http://twitter.com'},
    {name:'Angular Power Up',idArea:1, date: this.finalized, by:'Yesi Days',urlSocial:'http://twitter.com'},
    {name:'Todo List in 10 minuts',idArea:1, date: this.toStart, by:'Yesi Days',urlSocial:'http://twitter.com'},
    {name:'Alexa IO',idArea:7, date: this.finalized, by:'Yesi Days',urlSocial:'http://twitter.com'},

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
      this.toStart.setHours(this.toStart.getHours()+5);
      this.finalized.setHours(this.finalized.getHours()-4);

   }

  getWorkshops():Observable<Workshop[]>{
    return of(this._workshops);
  }

  getAreas():Observable<Area[]>{
    return of(this._area);
  }

}
