import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { Response} from '../shared/response.model';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  public EditOrAdd: String;

  constructor(public userService: UserService,
    public toastr: ToastrService) {
    this.EditOrAdd = "Add";  

  }

  ngOnInit() {
    this.EditOrAdd = "Add";
    this.resetForm();
    this.getUserList();
  }

  
  //delete existing user.
  deleteUser(usr: User) {
    this.userService.removeUser(usr).subscribe((res) => {
      if(res.Success){
        this.getUserList();
        this.toastr.success('User deleted Successfully');
      }else{
      //  this.toastr.error(res.Message);
      }
      
    });
    
    this.EditOrAdd = "Add";
  }

  
  getUserList() {
    
    this.userService.getUserList().subscribe(res => {
         
      if (res.Success) {
        this.userService.users = res.Data;
      } else {
        this.toastr.error(res.Message);
      }
    });
  }

    resetForm(form?: NgForm) {
      if (form) {
        form.reset();
        this.getUserList();
        this.EditOrAdd = "Add";
      }
    }
    

  editUser(usr: User) {
    this.userService.selectedUser = usr;
    this.EditOrAdd = 'Update';
  }


    sortUsers(sortKey: string) {
      this.userService.getSortUserList(sortKey).subscribe((res) => {
        if(res.Success){
          this.userService.users = res.Data as User[];
        }else{
       //   this.toastr.error(res.Message);
        }
        
      });
    }
  


  searchUsers(searchKey: string) {
    this.userService.getSearchUserList(searchKey).subscribe((res) => {
      if(res.Success){
        if ((res.Data as User[]).length == 0) {
          this.toastr.warning('No Users found for search criteria');
        }
        this.userService.users = res.Data as User[];
      }else{
       // this.toastr.error(res.Message);
      }
      
    });
  }
  onSubmit(form: NgForm) {
    
    if(!this.userService.selectedUser.First_Name){
       //this.toastr.error('Enter the User First Name');
       return;
     }
 
     if(!this.userService.selectedUser.Last_Name){
     //  this.toastr.error('Enter the User Last Name');
       return;
     }
 
     if(!this.userService.selectedUser.Employee_Id){
     //  this.toastr.error('Enter the User Employee Id');
       return;
     }
     if (!form.value.User_Id) {
       this.userService.postUser(form.value).subscribe((res) => {
         if(res.Success){
           this.toastr.success('User Added successfully');
           this.resetForm(form);
           this.getUserList();
         }else{
        //   this.toastr.error(res.Message);
         }
       });
       return;
 
     } else {
       
       this.userService.putUser(form.value).subscribe((res) => {
         if(res.Success){
           this.toastr.success('User details updated successfully');
           this.resetForm(form);
           this.getUserList();
           this.EditOrAdd = "Add";
         }else{
          // this.toastr.error(res.Message);
         }
         
       });
       
       return;
     }
   }

}
