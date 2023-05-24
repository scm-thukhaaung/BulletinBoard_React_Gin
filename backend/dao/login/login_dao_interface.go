package loginDao

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
)

type LoginDaoInterface interface {
	Login(email string, password string, ctx *gin.Context) models.User
}