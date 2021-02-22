import { Component, Input, OnInit } from '@angular/core';
import { Community } from 'src/app/core/models/communities/communities';

@Component({
  selector: 'app-side-communities',
  templateUrl: './side-communities.component.html',
  styleUrls: ['./side-communities.component.scss']
})
export class SideCommunitiesComponent implements OnInit {

  @Input() communities:Community[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
