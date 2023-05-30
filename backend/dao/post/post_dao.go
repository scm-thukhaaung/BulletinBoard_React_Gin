package postDao

import (
	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"gorm.io/gorm"
)

type PostDao struct {
	DB *gorm.DB
}

// FindAll implements PostDaoInterface.
func (*PostDao) FindAll(ctx *gin.Context) []models.Post {
	var posts []models.Post
	result := initializers.DB.Find(&posts)
	helper.ErrorPanic(result.Error, ctx)

	return posts
}

// FindOne implements PostDaoInterface.
func (*PostDao) FindOne(postId string, ctx *gin.Context) models.Post {
	var post models.Post
	result := initializers.DB.First(&post, postId)
	helper.ErrorPanic(result.Error, ctx)
	return post
}

// Create implements PostDaoInterface.
func (PostDao *PostDao) Create(post models.Post, ctx *gin.Context) {

	result := initializers.DB.Create(&post)
	helper.ErrorPanic(result.Error, ctx)
}

// Create implements PostDaoInterface.
func (PostDao *PostDao) AddCsvPosts(posts []models.Post, ctx *gin.Context) []models.Post {
	var ErrPosts []models.Post

	for _, eachPost := range posts {
		result := initializers.DB.Create(&eachPost)
		if result.Error != nil {
			ErrPosts = append(ErrPosts, eachPost)
		}
	}
	return ErrPosts
}

// Update implements PostDaoInterface.
func (postDao *PostDao) Update(post models.Post, postId string, ctx *gin.Context) models.Post {

	result := initializers.DB.Model(&post).Where("id = ?", postId).Updates(post)
	helper.ErrorPanic(result.Error, ctx)
	result = initializers.DB.First(&post, postId)
	helper.ErrorPanic(result.Error, ctx)
	return post
}

// Delete implements PostDaoInterface.
func (postDao *PostDao) Delete(postId string, ctx *gin.Context) {
	var post models.Post
	result := initializers.DB.Delete(&post, postId)
	helper.ErrorPanic(result.Error, ctx)
}

func NewPostDao(DB *gorm.DB) PostDaoInterface {
	return &PostDao{DB: DB}
}
