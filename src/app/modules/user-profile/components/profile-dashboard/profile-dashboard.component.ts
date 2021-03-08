import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetCurrentPage } from 'src/app/core/store/user-profile/user-profile.actions';
import {ProfileDashboardRoutes} from '../../utils/user-profile-dashboard-routes'

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss'],
  animations:[
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class ProfileDashboardComponent implements OnInit {

  dashboardRoutes = ProfileDashboardRoutes;

  public currentPage$: Observable<string>;

  constructor(private store:Store) {
    this.currentPage$ = store.select(state=>state.userProfile.currentPage)
  }


  ngOnInit(): void {
  }

  onSelectCurrentPage(page:string){
    this.store.dispatch(new SetCurrentPage(page));
  }

}
