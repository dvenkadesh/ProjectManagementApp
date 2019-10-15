import { Component, OnInit } from '@angular/core';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {

  constructor(public userService: UserService, public toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = {
        _id:"",
        First_Name:"",
        Last_Name: "",
        Employee_Id:null

      }
    }
  }

  onSubmit(form: NgForm) {

    this.userService.postUser(form.value).subscribe((res) => {
      this.resetForm(form);

    });
  }






}
