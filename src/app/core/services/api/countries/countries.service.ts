import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/core/models/countries/Countries';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl = environment.endpoindsUris.countries;
  private requestUrl = 'all/';
  constructor(private baseService:BaseService){}

  getCountries():Observable<Country[]>{
    return this.baseService.get<Country[]>(this.baseUrl,this.requestUrl);
  }
}
