package resetPwdServices

import (
	"bytes"
	"fmt"
	"html/template"
	"net/smtp"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	constants "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/consts"
	resetPwdDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/pwd-reset"
	userDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	models "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	utilSvc "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/utils"

	// "github.com/go-mail/mail"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type ResetPwdService struct {
	ResetPwdDaoInterface resetPwdDao.ResetPwdDaoInterface
}

// SendResetPwd implements MailServiceInterface.
func (service *ResetPwdService) SendResetMail(email request.MailRequest, ctx *gin.Context) bool {

	userData := service.ResetPwdDaoInterface.SearchByMail(email.Email, ctx)

	if userData.ID != 0 {
		tokenString, _ := utilSvc.GenerateToken(userData.ID, ctx)
		from := os.Getenv("SENDER_EMAIL")
		password := os.Getenv("SENDER_PWD")

		// Receiver email address.
		to := []string{email.Email}

		// smtp server configuration.
		smtpHost := "smtp.gmail.com"
		smtpPort := "587"

		// Authentication.
		auth := smtp.PlainAuth("", from, password, smtpHost)
		t, _ := template.ParseFiles("templates/mailTemplate.html")

		var body bytes.Buffer

		mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
		body.Write([]byte(fmt.Sprintf("Subject: Regarding Password Reset \n%s\n\n", mimeHeaders)))

		t.Execute(&body, struct {
			Url   string
			Token string
		}{
			Url:   "http://localhost:8080/api/reset?token=" + tokenString,
			Token: tokenString,
		})

		// Sending email.
		err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, body.Bytes())
		helper.ErrorPanic(err, ctx)
		return true
	}
	return false
}

func (service *ResetPwdService) ResetPwd(password string, ctx *gin.Context) {
	tokenString := ctx.GetHeader("Authorization")
	jwtToken := utilSvc.ParseToken(tokenString, ctx)
	
	if claims, ok := jwtToken.Claims.(jwt.MapClaims); ok && jwtToken.Valid {
		// Extract the userId from the claims
		userId := claims["id"].(string)

		userDao := userDao.NewUserDao(initializers.DB)
		var user models.User
		user.Password = password
		userDao.Update(user, userId, ctx )
		return

	} else {
		helper.ErrorPanic(constants.NotValidToken, ctx)
		return
	}
}

func NewResetService(ResetPwdDaoInterface resetPwdDao.ResetPwdDaoInterface) ResetPwdServiceInterface {
	return &ResetPwdService{
		ResetPwdDaoInterface: ResetPwdDaoInterface,
	}
}
