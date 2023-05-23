package request

type CreatePostRequest struct {
	Title           string `validate:"required,max=200,min=1" json:"title"`
	Description     string `validate:"required,max=200,min=1" json:"description"`
	Status          int    `json:"status"`
	Created_User_ID int    `json:"created_user_id"`
	Updated_User_ID string `json:"updated_user_id"`
	Deleted_User_ID string `json:"deleted_user_id"`
}

type UpdatePostRequest struct {
	Id              int    `validate:"required"`
	Title           string `validate:"max=200, main=1" json:"title"`
	Description     string `validate:"max=200,min=1" json:"description"`
	Status          int    `json:"status"`
	Updated_User_ID string `json:"updated_user_id"`
}