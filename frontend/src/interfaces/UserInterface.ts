import { Post } from "./PostInterface";


export interface UserInterface {
    ID?: number,
    CreatedAt?: Date,
    UpdatedAt?: Date,
    DeletedAt?: Date,
    Name?: string,
    Email?: string,
    Password?: string,
    Profile_Photo?: string,
    Type?: string,
    Phone?: string,
    Address?: string,
    Date_Of_Birth?: string,
    Created_User_ID?: number,
    Updated_User_ID?: number,
    Deleted_User_ID?: number,
    HasError?: boolean,
    Post?: Post
}

export interface CsvUserItem {
    ID?: number,
    Name?: string,
    Email?: string,
    Type?: string,
    HasError?: boolean
}
