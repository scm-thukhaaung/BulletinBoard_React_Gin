package request

type PostRequest struct {
	Title           string `validate:"required,max=200,min=1" json:"Title"`
	Description     string `validate:"required,max=200,min=1" json:"Description"`
	Status          string `json:"Status"`
	Created_User_ID int   `json:"Created_User_ID"`
	Updated_User_ID int   `json:"Updated_User_ID"`
}

type CsvPostRequest struct {
	Posts []PostRequest `json:"Posts"`
}
