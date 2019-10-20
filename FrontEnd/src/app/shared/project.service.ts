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

 // selectedProject: Project;
  projects: Project[];
  readonly baseURL = 'http://localhost:3000/project';
  constructor(private http: HttpClient) { }


    //delete an existing project based on project Id.
    removeProject(project: Project) {
      return this.http.get(this.baseURL + '/' + project.Project_Id);
    }

    
    //update an existing project based on Project Id.
    putProject(project: Project) {
      return this.http.post(this.baseURL + '/edit/' + project.Project_Id, project);
    }

  getProjectList() {
    return this.http.get(this.baseURL);
  }

      //Retrieve projects
      retrieveProjects(searchKey?: string, sortKey?: string): Observable<Response<Project[]>> {
        let params = new HttpParams();  
        if (searchKey)
          params = params.append('searchKey', searchKey);
        if (sortKey)
          params = params.append('sortKey', sortKey);
    
        return this.http .get<Response<Project[]>>(`${this.baseURL}`, { params: params });
      }



  postNewProject(newproject : Project){
    return this.http.post<Response<Project>>(this.baseURL+'/add', newproject);
    
  }

      // Retrieve projet by project id
      getProjectById(ProjectId: number): Observable<Response<Project>> {
        return this.http.get<Response<Project>>(`${this.baseURL}${ProjectId}`);
      }
}
