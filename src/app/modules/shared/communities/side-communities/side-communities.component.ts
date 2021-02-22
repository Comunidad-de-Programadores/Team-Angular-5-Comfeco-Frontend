import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-communities',
  templateUrl: './side-communities.component.html',
  styleUrls: ['./side-communities.component.scss']
})
export class SideCommunitiesComponent implements OnInit {

  @Input() communities:[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
