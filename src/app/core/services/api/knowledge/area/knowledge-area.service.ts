import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KnowledgeArea } from 'src/app/core/models/workshops/workshops';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../../base.service';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeAreaService {
  private baseUrl = environment.endpoindsUris.backend;
  private requestUrl = 'knowledge-areas/'

  constructor(private baseService:BaseService) { }

  getKnowledgeAreas():Observable<KnowledgeArea[]>{
    return this.baseService.get<KnowledgeArea[]>(this.baseUrl,this.requestUrl);
  }
}
