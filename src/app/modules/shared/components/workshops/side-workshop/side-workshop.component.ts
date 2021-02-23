import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { forkJoin } from 'rxjs';
import { Area, Workshop } from 'src/app/core/models/workshops/workshops';
import { WorkshopsService } from 'src/app/core/services/fake/workshops.service';

@Component({
  selector: 'app-side-workshop',
  templateUrl: './side-workshop.component.html',
  styleUrls: ['./side-workshop.component.scss']
})
export class SideWorkshopComponent implements OnInit {

  ws:Workshop[] = [];
  displayWorkshops:Workshop[];
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
      result=> this.ws = result,
      err=>{
        // TODO: NotificatioService
      }
    );

    this.displayWorkshops = this.ws;
    console.log('data: ',this.ws)

  }

  onSelectArea(val: MatSelectChange){
    this.displayWorkshops = this.ws.filter(
      item=>item.idArea === val.value
    );
  }

  workshopStatus(date: Date):string{
    let moreIcon = 'more_horiz';
    let dondeIcon = 'done';
    return (date.getTime()> Date.now())? moreIcon:dondeIcon;
  }

  displayTime(date:Date):string{
    return (date.getHours()<10?'0':'')
            + date.getHours()
            + ':'
            +(date.getMinutes()<10?'0':'')
            + date.getMinutes();
  }


}
