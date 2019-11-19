import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './response.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = new User();
  users: User[];
  readonly baseURL = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  postUser(usr: User) {
    return this.http.post<Response<User>>(this.baseURL+'/add', usr);
  }


  getUserList() {
    return this.http.get<Response<User[]>>(this.baseURL);
  }

  removeUser(usr: User) {
    return this.http.get<Response<User>>(this.baseURL + '/delete/' + usr.Employee_Id);
  }


  putUser(usr: User) {
    return this.http.post<Response<User>>(this.baseURL + '/edit/' + usr.User_Id, usr);
  }



  getSortUserList(sortKey: string) {
    let params = new HttpParams().set("sortKey", sortKey);
    return this.http.get<Response<User[]>>(this.baseURL, { params: params });
  }

  getSearchUserList(searchKey: string) {
    let params = new HttpParams().set("searchKey", searchKey);
    return this.http.get<Response<User[]>>(this.baseURL, { params: params });
  }

  getUserForId(id: any) {
    let parms = new HttpParams().set("_id", id);
    return this.http.get<Response<User>>(this.baseURL, { params: parms });
  }



}
