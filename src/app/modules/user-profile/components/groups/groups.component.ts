import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddUserActivity } from 'src/app/core/store/user-profile/user-profile.actions';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private store:Store) { }

  ngOnInit(): void {
  }

  addUserGroup(){
    this.store.dispatch(new AddUserActivity(`Te has unido al grupo "Front Coders"  registro: ${Date.now()}`));
  }


}
