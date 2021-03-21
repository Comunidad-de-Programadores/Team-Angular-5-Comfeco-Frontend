import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { forkJoin } from 'rxjs';
import { KnowledgeArea, Workshop } from 'src/app/core/models/workshops/workshops';
import { KnowledgeAreaService } from 'src/app/core/services/api/knowledge/area/knowledge-area.service';
import { WorkshopsService } from 'src/app/core/services/api/workshops/workshops.service';

@Component({
  selector: 'app-side-workshop',
  templateUrl: './side-workshop.component.html',
  styleUrls: ['./side-workshop.component.scss'],
  providers: [DatePipe]

})
export class SideWorkshopComponent implements OnInit {

  ws:Workshop[] = [];
  displayWorkshops:Workshop[];
  areas: KnowledgeArea[];



  filterValue:number;

  constructor(private knowledgeAreaService: KnowledgeAreaService, private workshopsService: WorkshopsService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.knowledgeAreaService.getKnowledgeAreas().subscribe(
      result=> this.areas= result,
      err=>{
        //TODO: NotificationService
      }
    );

    this.workshopsService.getWorkshops().subscribe(
      result=> {
        this.ws = result.filter(n =>  new Date(new Date(n.date)).getDay()=== new Date().getDay());
        this.displayWorkshops = this.ws;
        console.log('data: ',this.displayWorkshops)
      },
      err=>{
        // TODO: NotificatioService
      }
    );

  


  }

  onSelectArea(val: MatSelectChange){
    this.displayWorkshops = this.ws.filter(
      item=>item.knowledge_area.id === val.value
    );
  }

  workshopStatus(date: Date):string{
    let moreIcon = 'more_horiz';
    let dondeIcon = 'done';
    return (new Date(date).getTime()> Date.now())? moreIcon:dondeIcon;
  }

  displayTime(dateF:Date):string{
     let date = new Date(dateF)
    return (date.getHours()<10?'0':'')
            + date.getHours()
            + ':'
            +(date.getMinutes()<10?'0':'')
            + date.getMinutes();
  }


}
