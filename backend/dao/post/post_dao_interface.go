package postDao

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
)

type PostDaoInterface interface {
	FindAll(ctx *gin.Context) []models.Post
	FindOne(postId string, ctx *gin.Context) models.Post
	Create(post models.Post, ctx *gin.Context) models.Post
	AddCsvPosts(posts []models.Post, ctx *gin.Context) []models.Post
	Update(post models.Post, postId string, ctx *gin.Context) models.Post
	Delete(postId string, ctx *gin.Context)
}
