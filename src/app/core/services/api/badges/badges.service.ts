import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Badge } from 'src/app/core/models/user/user.models';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {

  private baseUrl= environment.endpoindsUris.backend;
  private requestUrl = 'badges/';

  constructor(private baseService:BaseService) { }
  getBadges():Observable<Badge[]>{
    return this.baseService.get<Badge[]>(this.baseUrl,this.requestUrl);
  }

}
