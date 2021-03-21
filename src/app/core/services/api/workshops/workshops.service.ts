import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../base.service';
import { Workshop } from '../../../models/workshops/workshops'
@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  private baseUrl = environment.endpoindsUris.backend;
  private requestUrl = 'workshops/'
  constructor(private baseService:BaseService) { }

  getWorkshops():Observable<Workshop[]>{
    return this.baseService.get<Workshop[]>(this.baseUrl,this.requestUrl);
  }
}
