import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventModel } from '../../models/events/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events:EventModel[]=[
    {id:'asduuytiyudyasi',name:'Ng Conf Salt Lake City',description:'',img:'https://i.ytimg.com/vi/n-RTxeyLbsk/maxresdefault.jpg'},
    {id:'asdliuo8767da',name:'NG Conf Honduras 2021',description:'',img:'https://pbs.twimg.com/media/Et1yIUOWYAE6w7U.jpg'},
    {id:'lldsdosd98',name:'Next JS Conf',description:'',img:'https://nextjs.org/static/twitter-cards/conf/card.png'},
    {id:'dds768768asdasd',name:'Vue Conf Toronto',description:'',img:'https://secure.meetupstatic.com/photos/event/b/3/3/f/highres_491985887.jpeg'},
  ]

  constructor() { }

  getEvents():Observable<EventModel[]>{
    return of(this.events);
  }
}
