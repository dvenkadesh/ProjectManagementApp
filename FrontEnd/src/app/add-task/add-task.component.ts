import { Component, OnInit } from '@angular/core';
import { AddTaskService } from '../shared/add-task.service';
import { AddTask } from '../shared/add-task.model';
import { Response} from '../shared/response.model';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(public addTaskService: AddTaskService) {
  this.buttonName = 'AddTask'; 
  this.taskToAdd = new AddTask();
  this.isParentTask = false;}

  ngOnInit() {
    this.buttonName = 'AddTask';
    this.resetTask();
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
