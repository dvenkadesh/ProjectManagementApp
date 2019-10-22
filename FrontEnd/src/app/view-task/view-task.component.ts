  
import { Component, OnInit, TemplateRef  } from '@angular/core';
import {BsModalService } from 'ngx-bootstrap/modal';
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
  

  constructor(public modalService: BsModalService) { }

  ngOnInit() {
  }

  projects: Array<Project>;
 modalRef: BsModalRef;



    openModal(template: TemplateRef<any>, type: number) {
      console.log('i am in');
    /* if (type === 1) {
      this.projectService.getProjectList().subscribe((res) => {
        this.projects = res as Project[];
        this.modalRef = this.modelservice.show(template);
      },
        (error) => {
          console.log(error);
        });
    }  */
  }   

}
