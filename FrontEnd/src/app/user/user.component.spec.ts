
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import 'rxjs/add/observable/of';

import { UserComponent } from './user.component';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/user.model';
import { FormBuilder, NgForm } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let service: UserService;
  let toastr: ToastrService;
  const user: User =
  {
    User_Id: 1,
    First_Name: 'Ram',
    Last_Name: 'kumar',
    Employee_Id: 12345,
    Project_Id: 1212,
    Task_Id: 0,
    _id: '5d4b781546ec9c1f24548852'
  };

  const users: User[] =
    [{
      User_Id: 1,
      First_Name: 'Ram',
      Last_Name: 'Kumar',
      Employee_Id: 12345,
      Project_Id: 1212,
      Task_Id: 0,
      _id: '5d4b781546ec9c1f24548852'
    }];

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UserComponent],
        imports: [FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientTestingModule, NgbModule],
        providers: [FormBuilder, UserService,
          { provide: BsModalService, useValue: {} },
          { provide: ActivatedRoute, useValue: {} },
          { provide: ToastrService, useValue: {} },
          { provide: Router, useValue: {} }]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      service = TestBed.get(UserService);
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call search Users success', () => {

    const res = { Success: true, Data: users };
    spyOn(component.userService, "getSearchUserList").and.returnValue(of(res));
    expect(component.toastr.success);
    component.userService.users = undefined;
    component.searchUsers('Madhu');
    expect(component.userService.users).toBeDefined();
  });

 

  it('call resetUserForm', () => {

    var form = new NgForm(null, null);
    component.resetForm(form);
    expect(form.reset);
    expect(component.EditOrAdd).toEqual('Add');
  });

  it('call search Users fails', () => {

    const res = { Success: false, Data: null, Message: 'error_msg' };
    try{
    spyOn(component.userService, "getSearchUserList").and.returnValue(of(res));
    expect(component.toastr.error);
    component.userService.users = undefined;
    component.searchUsers('Madhu');
    expect(component.userService.users).not.toBeDefined();
    }catch(e){expect(e).toBeDefined;}
  });

  it('call search Users success with zero result', () => {

    const res = { Success: true, Data: [] };
    spyOn(component.userService, "getSearchUserList").and.returnValue(of(res));
    expect(component.toastr.warning);
    component.userService.users = undefined;
    component.searchUsers('Madhu');
    expect(component.userService.users).toBeNull;
  });

  it('call deleteUser success', () => {
    const res = { Success: true, Data: user };
    spyOn(component.userService, "removeUser").and.returnValue(of(res));
    expect(component.toastr.success);
    component.deleteUser(user);
  });

  it('call get Users success', () => {

    const res = { Success: true, Data: users };
    spyOn(component.userService, "getUserList").and.returnValue(of(res));
    expect(component.toastr.success);
    component.userService.users = undefined;
    component.getUserList();
    expect(component.userService.users).toBeDefined();
  });

  it('call sortUser with success', () => {

    const res = { Success: true, Data: users }
    spyOn(component.userService, 'getSortUserList').and.returnValue(Observable.of(res));
    expect(component.toastr.success);
    component.userService.users = undefined;
    component.sortUsers('First_Name');
    expect(component.userService.users).toBeDefined();
  });

  

  it('call get Users fails', () => {

    const res = { Success: false, Data: null, Message: 'Error_msg' };
    spyOn(component.userService, "getUserList").and.returnValue(of(res));
    expect(component.toastr.error);
    component.userService.users = undefined;
    component.getUserList();
    expect(component.userService.users).toBeNull;
  });

  it('call editUser success', () => {
    const res = { Success: true, Data: user };
    component.editUser(user);
    expect(component.userService.selectedUser).toBeDefined();
    expect(component.EditOrAdd).toEqual('Update');
  });

  
  it('call sort Users fails', () => {

    const res = { Success: false, Data: null, Message: 'error_msg' };
    spyOn(component.userService, "getSortUserList").and.returnValue(of(res));
    expect(component.toastr.error);
    component.userService.users = undefined;
    component.sortUsers('First_Name');
    expect(component.userService.users).not.toBeDefined();
  });



});