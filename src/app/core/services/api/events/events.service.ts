import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/app/core/models/user/user.models';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = environment.endpoindsUris.backend;
  private requestUrl = 'events/'

  constructor(private baseService:BaseService ) { }

  getEvents():Observable<Event[]>{
    return this.baseService.get<Event[]>(this.baseUrl,this.requestUrl);
  }

}
