package userServices

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserServiceInterface interface {
	Create(user request.UserRequest, ctx *gin.Context)
	CreateCsvUsers(csvUsers request.CsvUserRequest, ctx *gin.Context) []models.User
	FindOne(userId string, ctx *gin.Context) models.User
	FindAll(ctx *gin.Context) []models.User
	Update(user request.UserRequest, userId string, ctx *gin.Context) models.User
	Delete(userId string, ctx *gin.Context)
}
