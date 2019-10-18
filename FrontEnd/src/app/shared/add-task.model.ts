import { User } from './user.model';
import { Project } from './project.model';

export class AddTask {
    Task_Id: number;
    Task_Name: string;
    Priotity: number;
    Start_Date: Date;
    End_Date: Date;
    Status : number;
    User: User;
    Parent: ParentTask;
    Project: Project;
}

export class ParentTask {
    Parent_Id : number;
    Parent_Task : string;
    Project_Id: number;
}
