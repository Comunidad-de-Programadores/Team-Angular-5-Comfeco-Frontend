import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgxsModule } from '@ngxs/store';
import { UserProfileState } from 'src/app/core/store/user-profile/user-profile.state';
import { MaterialModule } from '../material/material.module';
import { BadgetsComponent } from './components/badgets/badgets.component';
import { GroupsComponent } from './components/groups/groups.component';
import { EventsComponent } from './components/events/events.component';
import { RouterModule } from '@angular/router';
import { FrameworkChipColorPipe } from './utils/pipes/framework-chip-color.pipe';
import { ProfileConfigComponent } from './components/profile-config/profile-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveEventGroupDialogComponent } from './components/shared/leave-event-group-dialog/leave-event-group-dialog.component';


@NgModule({
  declarations: [ProfileDashboardComponent, UserProfileComponent, BadgetsComponent, GroupsComponent, EventsComponent, FrameworkChipColorPipe,ProfileConfigComponent, LeaveEventGroupDialogComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([UserProfileState])
  ]
})
export class UserProfileModule { }
