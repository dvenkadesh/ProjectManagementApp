import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';
import { UserService } from '../shared/user.service';
import { Response} from '../shared/response.model';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
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
  editProjectId: number;
  users: Array<User>;
  isEdit: boolean
  selectedUserName: string;


  constructor(public ProjectService: ProjectService, public userService: UserService) {
    this.EditOrAdd = 'Add Project';
    this.projectToAdd = new Project();
   }

  ngOnInit() {
    this.EditOrAdd = 'Add Project';
    this.resetForm();
    this.isEdit = false;
    this.getProjectList();
  }


  suspendProject(project: Project){
    this.ProjectService.removeProject(project).subscribe((res) => {
      //this.toastr.success('Project Suspended Successfully.');      
    });
    this.resetForm();
    this.getProjectList();
  }


  editProject(project: Project){
    this.EditOrAdd = "Update";
    this.projectToAdd = project;
    this.userService.getUserList().subscribe((res)=>{
      this.users = res.Data as User[];
      this.selectedUserName = this.users.find(
        x=> x._id === project.User.toString()).First_Name;        
    });

    this.selectedUserName = project.User.First_Name + '' + project.User.Last_Name;
    this.isStartEndDate = true;
    let newStartDate = new Date(this.projectToAdd.Start_Date);
    let newEndDate = new Date(this.projectToAdd.End_Date);
    var projstartDate, projendDate;

    projstartDate = <NgbDateStruct>{ year  : newStartDate.getFullYear(), month : newStartDate.getMonth() + 1,day   : newStartDate.getDate()  };
    this.startDate = projstartDate;
    projendDate = <NgbDateStruct>{ year  : newEndDate.getFullYear(), month : newEndDate.getMonth() + 1,day   : newEndDate.getDate()  };
    this.endDate = projendDate;
    this.editProjectId = project.Project_Id;   
    this.isEdit = true; 
  }

  resetForm(){
    this.projectToAdd = new Project();
    this.isEdit = false;
    this.EditOrAdd = "Add";
    //this.selectedUserName="";
    this.isStartEndDate=false;
    this.projectToAdd.Priority=0;
    this.startDate = new Date();
    this.endDate = new Date();
    //this.getProjectList();
    this.getProjectList();
  }

  getProjectList(){
    this.ProjectService.getProjectList().subscribe((res) =>{      
      this.ProjectService.projects = res as Project[];
    });
  }

  addUpdateProject(){

    if(!this.isEdit){
      this.projectToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.projectToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      
      this.ProjectService.postNewProject(this.projectToAdd).subscribe(res => {
        //this.toastr.success('Project Added Successfully');
        
      });
      this.getProjectList();
      this.resetForm();
      return;
      
      
    }else if(this.isEdit){ 
      this.projectToAdd.Start_Date = moment(this.startDate).add(-1, 'months').toDate();
      this.projectToAdd.End_Date = moment(this.endDate).add(-1, 'months').toDate();
      
      this.projectToAdd.Project_Id = this.editProjectId;
      this.ProjectService.putProject(this.projectToAdd).subscribe((res) => {
        this.getProjectList();
        this.resetForm();
        //this.toastr.success('Project Updated Successfully');
      });
      
    } 

    this.getProjectList();

    this.resetForm();
    return;
  }

}
