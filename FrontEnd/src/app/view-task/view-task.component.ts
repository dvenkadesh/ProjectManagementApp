import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute } from '@angular/router';
import {ViewTaskService} from '../shared/view-task.service';
import {ProjectService} from '../shared/project.service';
import {AddTaskService} from '../shared/add-task.service';
import {AddTask, ParentTask} from '../shared/add-task.model';
import {Project} from '../shared/project.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  providers: [ViewTaskService]
})
export class ViewTaskComponent implements OnInit {

  constructor(public viewTaskService: ViewTaskService, public projectService: ProjectService,
    public modalService: BsModalService, private route: ActivatedRoute,
    public toastr: ToastrService, private router: Router,
    private addTaskService: AddTaskService) { 
      
    }

  modalRef: BsModalRef;
  taskProj: string;
  updTask: AddTask;
  selectedParent: ParentTask;
  selectedProjId: number;
  projects: Array<Project>;
  searchText: string;

  selectedProjName: string;
  selectedProj: Project;

  

  ngOnInit() {
    this.refreshTaskList();

  }
 

    selectProj() {
      if (this.selectedProj != null) {
        this.selectedProjName = this.selectedProj.Project_Name;
        this.taskProj = this.selectedProj._id;
        this.selectedProj = null;
        this.searchText = '';
        this.modalRef.hide();
  
        this.viewTaskService.getTaskForProjectList(this.taskProj).subscribe((res) =>{
          this.viewTaskService.tasks = res as AddTask[];
        });
  
      }
    }

  refreshTaskList(){
    this.viewTaskService.getTaskList().subscribe((res) =>{
      this.viewTaskService.tasks = res as AddTask[];
    });
  }





}
