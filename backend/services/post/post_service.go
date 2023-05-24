package postServices

import (
	"github.com/gin-gonic/gin"
	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/post"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type PostService struct {
	PostDaoInterface dao.PostDaoInterface
}

// FindAll implements PostServiceInterface.
func (service *PostService) FindAll(ctx *gin.Context) []models.Post {
	data := service.PostDaoInterface.FindAll(ctx)

	return data
}

// FindOne implements PostServiceInterface.
func (service *PostService) FindOne(postId string, ctx *gin.Context) models.Post {
	data := service.PostDaoInterface.FindOne(postId, ctx)

	return data
}

// Create implements PostServiceInterface
func (service *PostService) Create(post request.CreatePostRequest, ctx *gin.Context) {

	postModel := models.Post{
		Title:           post.Title,
		Description:     post.Description,
		Status:          post.Status,
		Created_User_ID: post.Created_User_ID,
		Updated_User_ID: post.Updated_User_ID,
	}

	service.PostDaoInterface.Create(postModel, ctx)
}

// Update implements PostServiceInterface.
func (service *PostService) Update(post request.UpdatePostRequest, postId string, ctx *gin.Context) models.Post {
	postModel := models.Post{
		Title:           post.Title,
		Description:     post.Description,
		Status:          post.Status,
		Updated_User_ID: post.Updated_User_ID,
	}
	data := service.PostDaoInterface.Update(postModel, postId, ctx)

	return data
}

// Delete implements PostServiceInterface.
func (service *PostService) Delete(postId string, ctx *gin.Context) {
	service.PostDaoInterface.Delete(postId, ctx)
}

func NewPostService(PostDaoInterface dao.PostDaoInterface) PostServiceInterface {
	return &PostService{
		PostDaoInterface: PostDaoInterface,
	}
}
