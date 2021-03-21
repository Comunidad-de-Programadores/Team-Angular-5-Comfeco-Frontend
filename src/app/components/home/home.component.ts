import { Component, OnInit } from '@angular/core';
import { InputItem } from 'src/app/core/models/carousel/Inputs';
import { ScreenMediaSizes } from 'src/app/core/models/utils/screen-media-size';
import { LeadsService } from 'src/app/core/services/fake/leads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  leads: InputItem[]=[];
  sponsors: InputItem[]=[];

  itemsXPageLeads=4;
  itemsXPageSponsors=6;

  nextEventTimeTarget='04/02/2022 12:00 AM';

  // TODO: crear servicio para calcular tamaño actual de pantalla
  screenMediaSize:ScreenMediaSizes={lg:1600, xlg:1920};
  isMobile = false;

  constructor(private ls: LeadsService) { }

  ngOnInit(): void {
    this.ls.getSponsors().subscribe(
      result=> this.sponsors = result,
      err=>{} // TODO: notificationService
    );
    this.ls.getTeamLeaders().subscribe(
      result=> this.leads = result,
      err=> {} // TODO: notificationService
    );

    this.onResize(window.innerWidth);
  }

  // TODO: crear servicio para calcular tamaño en pantalla
  public onResize(width){
    let size = width;
    if(size> this.screenMediaSize.lg){
      this.itemsXPageLeads = 4;
      this.itemsXPageSponsors = 6;
      this.isMobile = false;
    }

    if(size < this.screenMediaSize.lg ){
      this.itemsXPageLeads=3;
      this.itemsXPageSponsors=4;
      this.isMobile = false;
    }


    if(size> this.screenMediaSize.xlg){
      this.itemsXPageLeads = 5;
      this.isMobile = false
    }

    if(size < 1415){
      this.itemsXPageLeads=2;
      this.itemsXPageSponsors = 3;
      this.isMobile = false;
    }

    if(size > 1200){
      this.isMobile = false;
    }

    if(size < 1200){
      this.itemsXPageLeads=3;
      this.itemsXPageSponsors= 4;
      this.isMobile = true;
    }

    if(size < 1080){
      this.itemsXPageLeads=3;
      this.itemsXPageSponsors = 1;
      this.isMobile = true;
    }

    if(size < 1080){
      this.itemsXPageLeads=3;
      this.itemsXPageSponsors = 4;
      this.isMobile = true;
    }

    if(size < 800){
      this.itemsXPageLeads=2;
      this.itemsXPageSponsors = 3;
      this.isMobile = true;
    }

    if(size < 600){
      this.itemsXPageLeads=1;
      this.itemsXPageSponsors = 2;
      this.isMobile = true;
    }


    // console.log('tamaño de la pantalla', width)

  }


}
