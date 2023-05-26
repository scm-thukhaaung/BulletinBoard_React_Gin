package resetPwdServices

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type ResetPwdServiceInterface interface {
	SendResetMail(email request.MailRequest, ctx *gin.Context) bool
	ResetPwd(password string, ctx *gin.Context)
}
