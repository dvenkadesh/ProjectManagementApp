import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './response.model';
//import{Observable} from 'rxjs/Observable'
import {Observable} from 'rxjs'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AddTask } from './add-task.model';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  selectedTask: AddTask;
  users: AddTask[];
  readonly baseURL = 'http://localhost:3000/task';
  constructor(private http: HttpClient) { }

  postNewTask(addtask : AddTask){
    return this.http.post<Response<AddTask>>(this.baseURL+'/add', addtask);
    
  }
}
