package userServices

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserServiceInterface interface {
	FindOne(userId string, ctx *gin.Context) models.User
	FindAll(ctx *gin.Context) []models.User
	Create(user request.CreateUserRequest, ctx *gin.Context)
	Update(user request.UpdateUserRequest, userId string, ctx *gin.Context) models.User
	Delete(userId string, ctx *gin.Context)
}
