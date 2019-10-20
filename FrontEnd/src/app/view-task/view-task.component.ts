  
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
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  project     : Project;

  constructor(private router      : Router,
    private route       : ActivatedRoute) { }

  ngOnInit() {
  }

  selectedProject(project: Project) {
    this.project = project;
    //this.retrieveTasks();
  }

}
