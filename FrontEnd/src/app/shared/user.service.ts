import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './response.model';
//import{Observable} from 'rxjs/Observable'
import {Observable} from 'rxjs'; 

//import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


//import 'rxjs/add/operator/toPromise';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[];
  readonly baseURL = 'http://localhost:3000/user';


  constructor(private http: HttpClient) { }

  postUser(usr : User){
    return this.http.post<Response<User>>(this.baseURL+'/add', usr);

  }

  getUserList() {
    return this.http.get<Response<User[]>>(this.baseURL);
  }

  removeUser(usr: User) {
    return this.http.get<Response<User>>(this.baseURL + '/delete/' + usr.Employee_Id);
  }

  putUser(usr: User) {
    return this.http.post<Response<User>>(this.baseURL + '/edit/' + usr._id, usr);
  }

    //search for users.
    getSearchUserList(searchKey: string) {
      let params = new HttpParams().set("searchKey", searchKey);
      return this.http.get<Response<User[]>>(this.baseURL, { params: params });
    }

      //sort the user list based on column key.
  getSortUserList(sortKey: string) {
    let params = new HttpParams().set("sortKey", sortKey);
    return this.http.get<Response<User[]>>(this.baseURL, { params: params });
  }

}
