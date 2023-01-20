import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAPI } from 'src/api/user.api';
import { IUser } from '../model/user.interface';

@Injectable()
export class UserService {
  usersMap: Map<string, IUser>;

  constructor(private _userAPI: UserAPI) { }

  getUsers(): Observable<IUser[]> {
    return this._userAPI.getUsers().pipe(
      map((users) => {
        this.usersMap = new Map<string, IUser>();
        users.forEach(user => {
          this.usersMap.set(user.id, user);
        })
        return users
      })
    );
  }

  getUserById(userId: string) {
    return this.usersMap ? this.usersMap.get(userId) : undefined;
  }

  createUser(user: IUser): Observable<IUser> {
    this.usersMap.set(user.id, user);
    return this._userAPI.createUser(user)
  }

  // updateUser(user: IUser): Observable<IUser> {
  // code here
  // }

  // deleteUser(userId: string): void {
  // code here
  // }
}