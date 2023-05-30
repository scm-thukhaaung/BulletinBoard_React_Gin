package resetPwdDao

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
)

type ResetPwdDaoInterface interface {
	SearchByMail(email string, ctx *gin.Context) models.User
}