import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Badge, Event, Group, GroupMembers, UserDetail } from 'src/app/core/models/user/user.models';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.endpoindsUris.backend;
  private requestUrl = 'usersf/';
  constructor(private baseService: BaseService, private afs: AngularFirestore) {
  }

  addNewUser(user: UserDetail): Observable<UserDetail> {
    return this.baseService.post<UserDetail>(this.baseUrl, 'fb-users', user);
  }

  getUserById(userId: string): Observable<UserDetail> {
    return this.baseService.get<UserDetail>(this.baseUrl, this.requestUrl + userId);
  }

  addBadgeToUser(userId: string, badge: Badge): Observable<UserDetail> {
    return this.baseService.post<UserDetail>(this.baseUrl, this.requestUrl + userId + '/badges', badge);
  }

  addGroupToUser(userId: string, group: Group): Observable<UserDetail> {
    return this.baseService.post<Group>(this.baseUrl, this.requestUrl + userId + '/groups', group);
  }

  removeGroupToUser(userId: string, group: Group): Observable<UserDetail> {
    return this.baseService.put(this.baseUrl, this.requestUrl + userId + '/groups', group);
  }

  addEventToUser(userId: string, event: Event): Observable<UserDetail> {
    return this.baseService.post<Event>(this.baseUrl, this.requestUrl + userId + '/events', event);
  }

  removeEventToUser(userId: string, event: Event): Observable<UserDetail> {
    return this.baseService.put(this.baseUrl, this.requestUrl + userId + '/events', event);
  }

  postUserActivity(userId: string, message: { description: string }): Observable<UserDetail> {
    return this.baseService.post(this.baseUrl, this.requestUrl + userId + '/activities', message);
  }

  getGroupMembersUserById(userId: string, groupId: string): Observable<GroupMembers[]> {
    return this.baseService.get<GroupMembers[]>(this.baseUrl, this.requestUrl + userId + '/group-members/' + groupId);
  }

}
