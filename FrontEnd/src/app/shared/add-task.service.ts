import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AddTask, ParentTask } from './add-task.model';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  selectedTask: AddTask = new AddTask();
  ParentTask = new ParentTask();
  tasks: AddTask[];
  readonly baseURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }



  getParentList() {
    return this.http.get(this.baseURL + 'parent');
  }

  postNewTask(addTask: AddTask) {
    return this.http.post(this.baseURL + 'task', addTask);
  }

  getSearchParentList(searchKey: string) {
    let params = new HttpParams().set("searchKey", searchKey);
    return this.http.get(this.baseURL + 'parent', { params: params });
  }

  postParentTask(parent: ParentTask) {
    return this.http.post(this.baseURL + 'parent', parent);
  }


     getParentForId(id: any) {
      let params = new HttpParams().set("_id", id);
      return this.http.get(this.baseURL + 'parent', { params: params });
    }

}
