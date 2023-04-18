import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { User } from '../user';
import { UserCacheService } from './user-cache.service';
import { UsersCacheService } from './users-cache.service';
const _url="https://reqres.in/api/users";
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient,
    private usersCacheService: UsersCacheService,
    private userCacheService: UserCacheService) {}
    ///////////////////////////////////////////
  getAllUsers(): Observable<User[]> {
  let users$ = this.usersCacheService.getValue();
  
  if (!users$) {
  users$ = this.http.get(_url).pipe(
  map((response: any) => response.data),
  shareReplay(1)
  );
  this.usersCacheService.setValue(users$);
  }
  return users$;
  }
  //////////////////////////////
  getUser(id: number): Observable<User> {
  let user$ = this.userCacheService.getValue(id);
  
  if (!user$) {
  user$ = this.http.get(_url + '/' + id).pipe(
  map((response: any) => response.data),
  shareReplay(1)
  );
  this.userCacheService.setValue(user$, id);
  }
  return user$;
  }
}
