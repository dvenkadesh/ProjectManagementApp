import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectService} from '../shared/project.service';

import { Ng5SliderModule } from 'ng5-slider';
import { Routes, RouterModule, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';


import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { OnInit, TemplateRef  } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


describe('ProjectComponent', () => {
  let component: ProjectComponent;

  let temp: TemplateRef<any>;

  let fixture: ComponentFixture<ProjectComponent>;

  let modalRef: BsModalRef;

  let service: ProjectService;

  var today = new Date();
  const proj: Project = {_id: '5d4b781546ec9c1f24548854', Project_Id: 1, Project_Name: 'OMNIA',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'RAM', Last_Name: 'KUMAR', Employee_Id: 203563,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}};

  const projs: Project[] = [{_id: '5d4b781546ec9c1f24548854', Project_Id: 1, Project_Name: 'OMNIA',
    Start_Date: moment(today.getDate()).add(-1, 'months').toDate(),
    End_Date: moment(today.getDate()+40).add(-1, 'months').toDate(),
    Priority: 1,
    User: {User_Id: 1, First_Name: 'RAM', Last_Name: 'KUMAR', Employee_Id: 203563,        
    Project_Id: 1212, Task_Id: 0, _id: '5d4b781546ec9c1f24548852'}}];

    const users: User[] =
    [{
      User_Id: 1,
      First_Name: 'RAM',
      Last_Name: 'KUMAR',
      Employee_Id: 12345,
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    }];

    const user: User =
    {
      User_Id: 1,
      First_Name: 'RAM',
      Last_Name: 'KUMAR',
      Employee_Id: 12345,
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent ],
      imports: [
        FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule,
         NgbModule, Ng5SliderModule, RouterModule.forRoot([])
      ],
      providers: [FormBuilder, ProjectService,
        {provide: BsModalService, useValue: {}},
        {provide: ToastrService, useValue:{}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('call searchProject', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getSearchProjectList').and.returnValue(of(res));
    component.projectService.projects = undefined;
    component.searchProject('TMS');
    expect(component.projectService.projects).toBeDefined;
  });

  it('call suspendProject', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'removeProject').and.returnValue(of(res));
    
    component.suspendProject(proj);
    expect(component.resetForm);
    expect(component.getProjectList);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call resetUserForm', () => {
    component.resetForm();
    expect(component.isEdit).toBe(false);
  });



  it('call editProject', () =>{
    component.projectToAdd = undefined;
    component.users = undefined;
    const res = { Success: true, Data: users }
    spyOn(component.userService, 'getUserList').and.returnValue(of(res));
    component.editProject(proj);
    expect(component.EditOrAdd).toBe('Update');
    expect(component.projectToAdd).toBeDefined;
    expect(component.users).toBeDefined;
  });



  it('call getProjects', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getProjectList').and.returnValue(of(res));
    component.projectService.projects = undefined;
    component.getProjectList();
    expect(component.projectService.projects).toBeDefined;
  });

  
  it('call openModel for proj', () =>{
    
    const res = { Success: true, Data: users }
    spyOn(component.userService, 'getUserList').and.returnValue(of(res));
    component.users = undefined;
    component.openModal(temp, 1);
    expect(1);
    expect(component.users).toBeDefined;
  });

  it('call setIndexUser', () => {
    component.setIndexUser(user);
    expect(component.selectedUser);
  });

  it('call sortProject', () =>{
    const res = { Success: true, Data: projs }
    spyOn(component.projectService, 'getSortProjectList').and.returnValue(of(res));
    component.projectService.projects = undefined;
    component.sortProject('Proejct_Name');
    expect(component.projectService.projects).toBeDefined;
  });




});