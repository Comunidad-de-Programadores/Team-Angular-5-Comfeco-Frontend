import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Community } from '../../models/communities/communities';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {

  private communities: Community[] =[
    {name:'Comunidad de Programadores', url: 'https://www.facebook.com/groups/2637132626546045', img:'https://cdn.discordapp.com/icons/775907616986890261/fab5c5c76da7db070db4195366a2b6e5.png'},
    {name:'El lenguaje de los programadores', url: 'https://www.facebook.com/lenguajeprogramador', img:'https://scontent.fmex28-1.fna.fbcdn.net/v/t1.0-9/55451604_2389303431088469_5227528833401356288_o.jpg?_nc_cat=104&ccb=3&_nc_sid=09cbfe&_nc_ohc=tPSRV222YAgAX_eIMQv&_nc_ht=scontent.fmex28-1.fna&oh=a94ce7a7663b00158b2de9cd0431e244&oe=605B314F'},
    {name:'Latam Dev', url: 'http://www.latamdev.org/', img:'https://pbs.twimg.com/profile_images/2419350924/fongw4dd7ha0odmckp69_400x400.jpeg'},
    {name:'Angular Hispano', url: 'http://angular.lat'},
    {name:'Latino .Net', url: 'https://latinonet.online/', img:'https://latinonet.online/assets/img/latinonet/Logo%20Hexagono.png'},
  ];

  constructor() { }

  getCommunities(){
    return of(this.communities);
  }
}
