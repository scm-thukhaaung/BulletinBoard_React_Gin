package postServices

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type PostServiceInterface interface {
	FindAll(ctx *gin.Context) []models.Post
	FindOne(postId string, ctx *gin.Context) models.Post
	Create(post request.CreatePostRequest, ctx *gin.Context)
	Update(post request.UpdatePostRequest, postId string, ctx *gin.Context) models.Post
	Delete(postId string, ctx *gin.Context)
}
