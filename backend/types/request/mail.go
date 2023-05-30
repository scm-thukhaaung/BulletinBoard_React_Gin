package request

type MailRequest struct {
	Email string `validate:"max=200,min=1" json:"email"`
}

type PasswordRequest struct {
	Password string `validate:"required,max=200,min=1" json:"password"`
}
