import { Component, Input, OnInit } from '@angular/core';
import { Community } from 'src/app/core/models/communities/communities';
import { CommunitiesService } from 'src/app/core/services/fake/communities.service';

@Component({
  selector: 'app-side-communities',
  templateUrl: './side-communities.component.html',
  styleUrls: ['./side-communities.component.scss']
})
export class SideCommunitiesComponent implements OnInit {

  communities:Community[]=[];

  constructor(private communitiesService: CommunitiesService) { }

  ngOnInit(): void {
    this.communitiesService.getCommunities().subscribe(
      result=>this.communities = result,
    );
  }

}
