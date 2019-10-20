import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Response} from '../shared/response.model';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {

 // UsersList       : User[];
  EditOrAdd: String;

  constructor(public userService: UserService) { 
    this.EditOrAdd = "Add";
   // this.resetForm(); 
  }
  

  ngOnInit() {
    this.EditOrAdd = "Add";
    this.resetForm();
    this.refreshUserList();
   
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.userService.selectedUser = {
        _id:"",
        User_Id: null,
        First_Name:"",
        Last_Name: "",
        Employee_Id:null,
        Project_Id: null,
        Task_Id: null

      }
    }
    this.refreshUserList();
  }

  onSubmit(form: NgForm) {
    this.EditOrAdd = "Add";

    if(!this.userService.selectedUser.First_Name){
      console.log ("ente rname");
      return;
    }

    if(!this.userService.selectedUser.Last_Name){
      console.log ("enter name");
      return;
    }

    if(!this.userService.selectedUser.Employee_Id){
      console.log ("enter id");
      return;
    }
    
    if (!form.value.User_Id){
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        });
        console.log ("inserted");
        return;
    }else{
      console.log("form value is " + form.value.User_Id);
      this.userService.putUser(form.value).subscribe((res) => {
        if(res.Success){
          this.resetForm(form);
          //  this.refreshUserList();
          this.EditOrAdd = "Add";
        }else{
          console.log ("error");
        }
        
      });
      console.log ("updated");
      return;

    }

  }

  refreshUserList(){
    this.userService.getUserList().subscribe(res => {
      if (res.Success) {
        this.userService.users = res.Data;
      }

    });
 }

 editUser(usr : User){
  this.userService.selectedUser = usr;
  this.EditOrAdd = 'Update';
 }

 deleteUser(usr : User){
  this.userService.removeUser(usr).subscribe((res) => {
    if(res.Success){
      this.refreshUserList();
      this.resetForm();
    }else{
      console.log ("error");
    }
    
  });

 }

 searchUsers(searchKey: string){
  this.userService.getSearchUserList(searchKey).subscribe((res) => {
    if(res.Success){
      if ((res.Data as User[]).length == 0) {
        console.log ("no user found");
      }
      this.userService.users = res.Data as User[];
    }else{
      console.log ("error");
    }
    
  });
 }

 sortUsers(sortKey: string){
  this.userService.getSortUserList(sortKey).subscribe((res) => {
    if(res.Success){
      this.userService.users = res.Data as User[];
    }else{
      console.log ("error");
    }
    
  });
   
 }

}
