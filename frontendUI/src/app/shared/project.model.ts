import { User } from './user.model';

export class Project {
    _id: string;
    Project_Id: number;
    Project_Name: string;
    Start_Date: Date;
    End_Date: Date;
    Priority: number;
    User: User;
}
