import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { InputItem } from 'src/app/core/models/carousel/Inputs';
import { LeadsService } from 'src/app/core/services/fake/leads.service';
import { CommunitiesService } from 'src/app/core/services/fake/communities.service';
import { Community } from 'src/app/core/models/communities/communities';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  leads: InputItem[]=[];
  sponsors: InputItem[]=[];

  constructor(private ls: LeadsService) { }

  ngOnInit(): void {
    this.ls.getSponsors().subscribe(
      result=> this.sponsors = result
    );
    this.ls.getTeamLeaders().subscribe(
      result=> this.leads = result
    );

  }

}
