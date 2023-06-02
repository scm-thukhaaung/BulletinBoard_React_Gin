package postServices

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type PostServiceInterface interface {
	FindAll(ctx *gin.Context) []models.Post
	FindOne(postId string, ctx *gin.Context) models.Post
	Create(post request.PostRequest, ctx *gin.Context) models.Post
	CreateCsvPosts(csvPosts request.CsvPostRequest, ctx *gin.Context) []models.Post
	Update(post request.PostRequest, postId string, ctx *gin.Context) models.Post
	Delete(postId string, ctx *gin.Context)
}
