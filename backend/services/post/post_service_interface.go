package postServices

import (
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type PostServiceInterface interface {
	FindOne(postId int) models.Post
	FindAll() []models.Post
	Create(post request.CreatePostRequest)
	Update(post request.UpdatePostRequest)
	Delete(postId int)
}