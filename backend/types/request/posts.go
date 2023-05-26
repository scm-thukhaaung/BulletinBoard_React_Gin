package request

type PostRequest struct {
	Title           string `validate:"required,max=200,min=1" json:"title"`
	Description     string `validate:"required,max=200,min=1" json:"description"`
	Status          uint   `json:"status"`
	Created_User_ID uint   `json:"created_user_id"`
	Updated_User_ID uint   `json:"updated_user_id"`
}

type CsvPostRequest struct {
	Posts []PostRequest `json:"posts"`
}
