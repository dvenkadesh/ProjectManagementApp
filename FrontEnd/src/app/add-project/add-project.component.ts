import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';
import { Response} from '../shared/response.model';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [ProjectService]
})
export class AddProjectComponent implements OnInit {
  EditOrAdd: string;
  projectToAdd: Project;
  startDate: Date;
  endDate: Date;
  isStartEndDate: boolean;

  constructor(public ProjectService: ProjectService) {
    this.EditOrAdd = 'Add Project';
    this.projectToAdd = new Project();
   }

  ngOnInit() {
    this.EditOrAdd = 'Add Project';
    this.resetForm();
  }

  resetForm(){
    this.projectToAdd = new Project();
    //this.isEdit = false;
    this.EditOrAdd = "Add";
    //this.selectedUserName="";
    this.isStartEndDate=false;
    this.projectToAdd.Priority=0;
    this.startDate = new Date();
    this.endDate = new Date();
    //this.getProjectList();
  }

  addUpdateProject(){

    this.projectToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
    this.projectToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();


    this.ProjectService.postNewProject(this.projectToAdd).subscribe(res => {
      alert ('The  Task added successfully!');
      
    });

    this.resetForm();
    return;
  }

}
