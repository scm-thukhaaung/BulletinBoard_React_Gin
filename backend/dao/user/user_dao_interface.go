package userDao

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
)

type UserDaoInterface interface {
	Create(user models.User, ctx *gin.Context)
	AddCsvUsers(users []models.User, ctx *gin.Context) []models.User
	FindOne(userId string, ctx *gin.Context) models.User
	FindAll(ctx *gin.Context) []models.User
	Update(user models.User, userId string, ctx *gin.Context) models.User
	Delete(userId string, ctx *gin.Context)
}
