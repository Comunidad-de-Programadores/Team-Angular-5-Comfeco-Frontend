import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Area, Workshop } from 'src/app/core/models/workshops/workshops';
import { WorkshopsService } from 'src/app/core/services/fake/workshops.service';

@Component({
  selector: 'app-side-workshop',
  templateUrl: './side-workshop.component.html',
  styleUrls: ['./side-workshop.component.scss']
})
export class SideWorkshopComponent implements OnInit {

  workshops:Workshop[] = [];
  areas: Area[]=[];

  filterValue:number;

  constructor(private workshopsService: WorkshopsService) { }

  ngOnInit(): void {
    this.workshopsService.getAreas().subscribe(
      result=> this.areas= result,
      err=>{
        //TODO: NotificationService
      }
    );

    this.workshopsService.getWorkshops().subscribe(
      result=> this.workshops = result,
      err=>{
        // TODO: NotificatioService
      }
    );
  }

}
