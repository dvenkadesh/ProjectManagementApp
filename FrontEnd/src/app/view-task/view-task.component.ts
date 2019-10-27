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

  constructor(public modalService: BsModalService, private route: ActivatedRoute,
    public viewTaskService: ViewTaskService, public projectService: ProjectService,
    private addTaskService: AddTaskService,  public toastr: ToastrService, private router: Router
    ) { 
      
    }

    modalRef: BsModalRef;
    searchText: string;
    selectedProjId: number;
    taskProj: string;
    updTask: AddTask;
    selectedParent: ParentTask;
    selectedProjName: string;
    projects: Array<Project>;

    selectedProj: Project;


  

  ngOnInit() {
    this.refreshTaskList();

  }

  
    openModal(template: TemplateRef<any>, type: number) {
      if (type === 1) {
        this.projectService.getProjectList().subscribe((res) => {
          this.projects = res as Project[];
          this.modalRef = this.modalService.show(template);
        },
          (error) => {
            console.log(error);
          });
      } 
    }

  completeTask(task: AddTask){
    this.updTask = task;
    this.updTask.Status = 1;
    this.viewTaskService.putTask(this.updTask).subscribe((res) => {
      this.refreshTaskList();
    })
  }

  refreshTaskList(){
    this.viewTaskService.getTaskList().subscribe((res) =>{
      this.viewTaskService.tasks = res as AddTask[];
    });
  }



  cancelProj() {
    this.modalRef.hide();
    this.selectedProj = null;

  }


  setIndexProj(proj: Project) {
    this.selectedProj = proj;
    this.searchText = proj.Project_Name;
  }

  editTask(task: AddTask){
    this.router.navigate(['/addTask', { task: JSON.stringify(task) }]);
  }
 

  sortTask(sortKey: string){
    this.viewTaskService.getSortTaskList(sortKey).subscribe((res) => {
      this.viewTaskService.tasks = res as AddTask[];
    });
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
  










}
