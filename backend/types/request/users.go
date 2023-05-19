package request

type FindAllUserRequest struct {
}

type CreateUserRequest struct {
	Name            string `validate:"required,max=200,min=1" json:"name"`
	Email           string `validate:"required,max=200,min=1" json:"email"`
	Password        string `validate:"required,max=200,min=1" json:"password"`
	Profile_Photo   string `json:"profile_photo"`
	Type            string `default:"1" json:"type"`
	Phone           string `json:"phone"`
	Address         string `json:"address"`
	Date_Of_Birth   string `json:"date_of_birth"`
	Created_User_ID int    `json:"created_user_id"`
	// Updated_User_ID int    `json:"updated_user_id"`
	// Deleted_User_ID int    `json:"deleted_user_id"`
}
