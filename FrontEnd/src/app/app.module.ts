import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddTaskComponent,
    AddProjectComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
