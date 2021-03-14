import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/core/models/user/user.models';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private baseUrl = environment.endpoindsUris.backend;
  private requestUrl = 'groups/';
  constructor(private baseService: BaseService) { }

  getGroups():Observable<Group[]>{
    return this.baseService.get<Group[]>(this.baseUrl,this.requestUrl);
  }
}
