import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  selectedProject: Project = new Project();
  projects: Project[];
  readonly baseURL = 'http://localhost:3000/project';

  constructor(private http: HttpClient) { }



    getSearchProjectList(searchKey: string) {
      let params = new HttpParams().set("searchKey", searchKey);
      return this.http.get(this.baseURL, { params: params });
    }

    removeProject(project: Project) {
      return this.http.get(this.baseURL + '/' + project.Project_Id);
    }


  postNewProject(project: Project) {
    return this.http.post(this.baseURL, project);
  }


    getSortProjectList(sortKey: string) {
      let params = new HttpParams().set("sortKey", sortKey);
      return this.http.get(this.baseURL, { params: params });
    }

  putProject(project: Project) {
    return this.http.post(this.baseURL + '/edit/' + project.Project_Id, project);
  }


  getProjectList() {
    return this.http.get(this.baseURL);
  }











}
