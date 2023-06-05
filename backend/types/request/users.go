package request

type FindAllUserRequest struct {
}

type UserRequest struct {
	Name            string `validate:"required,max=200,min=1" json:"Name"`
	Email           string `validate:"required,max=200,min=1" json:"Email"`
	Password        string `validate:"required,max=200,min=1" json:"Password"`
	Profile_Photo   string `json:"Profile_Photo"`
	Type            string `default:"1" json:"Type"`
	Phone           string `json:"Phone"`
	Address         string `json:"Address"`
	Date_Of_Birth   string `json:"Date_Of_Birth"`
	Created_User_ID int    `json:"Created_User_ID"`
	Updated_User_ID int    `json:"Updated_User_ID"`
}

type LoginRequest struct {
	Email    string `validate:"required,max=200,min=1" binding:"required" json:"email"`
	Password string `validate:"required,max=200,min=1" json:"password"`
}

type CsvUserRequest struct {
	Users []UserRequest `json:"users"`
}
