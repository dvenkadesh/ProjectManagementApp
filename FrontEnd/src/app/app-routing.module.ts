import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserComponent} from './add-user/add-user.component';
import { AddProjectComponent} from './add-project/add-project.component';
import { AddTaskComponent} from './add-task/add-task.component';
import { ViewTaskComponent} from './view-task/view-task.component';


const routes: Routes = [
  { path: 'addUser', component: AddUserComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewTask', component: ViewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
