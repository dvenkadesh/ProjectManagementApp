import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from './response.model';
//import{Observable} from 'rxjs/Observable'
import {Observable} from 'rxjs'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  selectedProject: Project;
  project: Project[];
  readonly baseURL = 'http://localhost:3000/project';
  constructor(private http: HttpClient) { }

  postNewProject(newproject : Project){
    return this.http.post<Response<Project>>(this.baseURL+'/add', newproject);
    
  }
}
