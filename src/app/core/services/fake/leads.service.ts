import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InputItem } from '../../models/carousel/Inputs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

   leads: InputItem [] = [
    {title:'Marcos Rivas' , icon: "/assets/logo-frameworks/svelte-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-marcos_rivas.webp" },
    {title: 'Vanesa Marley', icon: "/assets/logo-frameworks/react-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-vanessa_marely.webp" },
    {title: 'Mayra Rodríguez', icon: "/assets/logo-frameworks/angular-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-mayra_rodr%C3%ADguez.webp" },
    {title: 'Diego Montoya', icon: "/assets/logo-frameworks/angular-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-diego_montoya.webp" },
    {title: 'Silvestre Vivo', icon: "/assets/logo-frameworks/svelte-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-silvestre_vivo.webp" },
    {title: 'Naomi Leon', icon: "/assets/logo-frameworks/vue-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-noemi_leon.webp' },
    {title: 'Ignacio Anaya', icon: "/assets/logo-frameworks/vue-icon.svg", src: "https://www.comfeco.com/images/leaders/leader-ignacio_anaya.webp", url:"google.com" },
    {title: 'Bezael Pérez', icon: "/assets/logo-frameworks/angular-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-bezael_perez.webp', url:"google.com" },
    {title: 'Cristopher Paniagua', icon: "/assets/logo-frameworks/vue-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-cristopher_paniagua.webp', url:"google.com" },
    {title: 'Diego Plascencia', icon: "/assets/logo-frameworks/react-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-diego_plascencia.webp', url:"google.com" },
    {title: 'Fernando de la Rosa', icon: "/assets/logo-frameworks/vue-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-fernando_de_la_rosa.webp', url:"google.com" },
    {title: 'Lara Díaz', icon: "/assets/logo-frameworks/react-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-lara_diaz.webp', url:"google.com" },
    {title: 'Lina María Montaño Ramírez', icon: "/assets/logo-frameworks/react-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-lina_mar%C3%ADa_monta%C3%B1o_ram%C3%ADrez.webp', url:"google.com" },
    {title: 'Manuel Muñoz', icon: "/assets/logo-frameworks/svelte-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-manuel_mu%C3%B1os.webp', url:"google.com" },
    {title: 'Manuel Ojeda', icon: "/assets/logo-frameworks/vue-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-manuel_ojeda.webp', url:"google.com" },
    {title: 'Nicolas Molina', icon: "/assets/logo-frameworks/angular-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-nicolas_molina.webp', url:"google.com" },
    {title: 'Noah Kaufman', icon: "/assets/logo-frameworks/svelte-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-noah_kaufman.webp', url:"google.com" },
    {title: 'Oscar Barajas', icon: "/assets/logo-frameworks/svelte-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-oscar_barajas.webp', url:"google.com" },
    {title: 'Anartz Mugika ledo', icon: "/assets/logo-frameworks/angular-icon.svg", src: 'https://www.comfeco.com/images/leaders/leader-anartz_mugika_ledo.webp', url:"google.com" },

  ];

  sponsors: InputItem[] =[
    {title:'Huawei' , src: "https://www.comfeco.com/images/sponsors/sponsor-huawei.webp" },
    {title: 'Fernando Herrera', src: 'https://www.comfeco.com/images/sponsors/sponsor-fernando_herrera.webp' },
    {title: 'Leónidas Esteban', src: 'https://www.comfeco.com/images/sponsors/sponsor-leonidas_esteban.webp' },
    {title: 'Stackly Code', src: 'https://www.comfeco.com/images/sponsors/sponsor-stacklycode.webp' },
    {title: 'José Dimas Luján',  src: 'https://www.comfeco.com/images/sponsors/sponsor-jose_dimas_lujan.webp' },
    {title: 'Domini Code', src: 'https://www.comfeco.com/images/sponsors/sponsor-dominicode.webp'},
    {title: 'TekkiTv', src: 'https://www.comfeco.com/images/sponsors/sponsor-tekkitv.webp'},
    {title: 'CodelyTv', src: 'https://www.comfeco.com/images/sponsors/sponsor-codelytv.webp'},
    {title: 'LatamDev',  src: 'https://www.comfeco.com/images/sponsors/sponsor-latamdev.webp'},
    {title: 'Código Facilito', src: 'https://www.comfeco.com/images/sponsors/sponsor-codigofacilito.webp'},
    {title: 'EggHead',  src: 'https://www.comfeco.com/images/sponsors/sponsor-egghead.webp'}
  ];

  constructor() { }


  getTeamLeaders(): Observable<InputItem[]>{
    return  of(this.leads);
  }


  getSponsors(): Observable<InputItem[]>{
    return  of(this.sponsors);
  }


  // getTeamLeaders(){
  //   return  this.leads;
  // }


  // getSponsors(){
  //   return  this.sponsors;
  // }
}
