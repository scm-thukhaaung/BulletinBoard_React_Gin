package postDao

import (
	"fmt"

	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"gorm.io/gorm"
)

type PostDao struct {
	DB *gorm.DB
}

// Delete implements PostDaoInterface.
func (postDao *PostDao) Delete(postId int) {
	var post models.Post
	post.ID = uint(postId)
	postDao.DB.Unscoped().Delete(&post)
}

// FindOne implements PostDaoInterface.
func (postDao *PostDao) FindOne(postId int) models.Post {
	var post models.Post
	result := postDao.DB.First(&post, postId)
	helper.ErrorPanic(result.Error)
	return post
}

// Update implements PostDaoInterface.
func (postDao *PostDao) Update(post models.Post) {
	fmt.Print(post)
	result := postDao.DB.Updates(&post)
	helper.ErrorPanic(result.Error)
}

// FindAll implements PostDaoInterface.
func (postDao *PostDao) FindAll() []models.Post {
	var posts []models.Post
	result := postDao.DB.Find(&posts)
	helper.ErrorPanic(result.Error)
	fmt.Print(posts)
	return posts
}

// Create implements PostDaoInterface.
func (*PostDao) Create(post models.Post) {
	result := initializers.DB.Create(&post)
	helper.ErrorPanic(result.Error)
}

func NewPostDao(DB *gorm.DB) PostDaoInterface {
	return &PostDao{DB: DB}
}
