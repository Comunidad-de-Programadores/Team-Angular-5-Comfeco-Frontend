import { Component, OnInit } from '@angular/core';
import { Community } from 'src/app/core/models/communities/communities';
import { CommunitiesService } from 'src/app/core/services/fake/communities.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  communities: Community[]=[];

  constructor(private communitiesService: CommunitiesService) { }

  ngOnInit(): void {
    this.communitiesService.getCommunities().subscribe(
      result=>this.communities = result,
    );
  }

}
