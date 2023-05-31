export interface CsvPostItem {
    ID?: number,
    Title?: string,
    Description?: string,
    Status?: string,
    HasError?: boolean
}

export interface Post {
    ID?: number,
    CreatedAt?: Date,
    UpdatedAt?: Date,
    DeletedAt?: Date | null,
    Title?: String,
    Description?: string,
    Status?: string,
    Created_User_ID?: number,
    Updated_User_ID?: number,
    Deleted_User_ID?: number | null,
    HasError?: boolean
}
