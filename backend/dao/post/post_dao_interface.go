package postDao

import "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"

type PostDaoInterface interface {
	FindAll() []models.Post
	FindOne(postId int) models.Post
	Create(post models.Post)
	Update(post models.Post)
	Delete(postId int)
}