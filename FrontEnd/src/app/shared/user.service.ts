import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.post(this.baseURL, usr);

  }
}
