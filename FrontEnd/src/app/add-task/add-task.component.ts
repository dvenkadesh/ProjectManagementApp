import { Component, OnInit, TemplateRef  } from '@angular/core';
import { AddTaskService } from '../shared/add-task.service';
import { AddTask, ParentTask  } from '../shared/add-task.model';
import { Response} from '../shared/response.model';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjectService } from '../shared/project.service';
import { UserService } from '../shared/user.service';
import { Project } from '../shared/project.model';
import { User } from '../shared/user.model';

import * as moment from 'moment';
 
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [AddTaskService]
})
export class AddTaskComponent implements OnInit {
  buttonName: string;
  taskToAdd: AddTask;
  startDate: Date;
  endDate: Date;
  isParentTask: boolean;
 // modalRef: BsModalRef;

  constructor(public userService: UserService, 
    public projectService: ProjectService,public addTaskService: AddTaskService) {
      
  this.buttonName = 'AddTask'; 
  this.taskToAdd = new AddTask();
  this.isParentTask = false;}
  projects: Array<Project>;
  parents: Array<ParentTask>;
  users: Array<User>;

  ngOnInit() {
    this.buttonName = 'AddTask';
    this.resetTask();
  }

  openModal(template: TemplateRef<any>, type: number) {

    if (type === 1) {

      this.projectService.getProjectList().subscribe((res) => {
        this.projects = res as Project[];
       // this.modalRef = this.modalService.show(template);

      },
        (error) => {
        });

    } else if (type == 2) {

      this.addTaskService.getParentList().subscribe((res) => {
        this.parents = res as ParentTask[];
       // this.modalRef = this.modalService.show(template);
      });
    } else if (type == 3) {

      this.userService.getUserList().subscribe((res) => {
        this.users = res.Data as User[];
       // this.modalRef = this.modalService.show(template);
      });
    }

  }

  resetTask() {
    //alert ('Parent Task added !');
    this.taskToAdd = new AddTask();
   // this.selectedProjName = null;
    //this.isParentTask = false;
    this.startDate = null;
    this.endDate = null;
   // this.selectedUserName = null;
    //this.selectedParentTask = null;
    this.taskToAdd.Priotity = 0;
    this.buttonName = 'AddTask';
  } 

  addTask() {

    var strDt = moment(this.startDate).add(-1, 'months').toDate();
    var endDt = moment(this.endDate).add(-1, 'months').toDate();

    if (this.isParentTask) {
    }else{
      this.taskToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.taskToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();

      this.addTaskService.postNewTask(this.taskToAdd).subscribe((res) => {
        alert ('The  Task added successfully!');
      });
      return;
    }

  }

}
