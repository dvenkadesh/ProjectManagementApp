import { User } from './user.model';
import { Project } from './project.model';


export class AddTask {
    Status : number;
    Start_Date: Date;
    End_Date: Date;
    Priotity: number;
    Project: Project;
    Task_Id: number;
    Parent: ParentTask;
    Task_Name: string;
    User: User;
}

export class ParentTask {
    Parent_Id : number;
    Parent_Task : string;
    Project_Id: number;
}
