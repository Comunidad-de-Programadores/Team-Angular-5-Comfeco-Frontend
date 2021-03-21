import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Badge } from 'src/app/core/models/user/user.models';
import { UserProfileStateModel } from 'src/app/core/store/user-profile/user-profile.model';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';

@Component({
  selector: 'app-badgets',
  templateUrl: './badgets.component.html',
  styleUrls: ['./badgets.component.scss']
})
export class BadgetsComponent implements OnInit {

  @Select(UserProfileState.getBadges) badges$:Observable<Badge[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
