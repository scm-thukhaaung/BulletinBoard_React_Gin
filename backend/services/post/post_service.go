package postServices

import (
	"fmt"
	"strconv"

	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/post"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type PostService struct {
	PostDaoInterface dao.PostDaoInterface
}

// FindAll implements PostServiceInterface.
func (service *PostService) FindAll() []models.Post {
	data := service.PostDaoInterface.FindAll()

	return data
}

// FindOne implements PostServiceInterface.
func (service *PostService) FindOne(postId int) models.Post {
	data := service.PostDaoInterface.FindOne(postId)

	return data
}

// Create implements PostServiceInterface.
func (service *PostService) Create(post request.CreatePostRequest) {

	postModel := models.Post{
		Title:           post.Title,
		Description:     post.Description,
		Status:          &post.Status,
		Created_User_ID: post.Created_User_ID,
	}

	service.PostDaoInterface.Create(postModel)
}

// Update implements PostServiceInterface.
func (service *PostService) Update(post request.UpdatePostRequest) {
	data := service.PostDaoInterface.FindOne(post.Id)
	update_user_id, _ := strconv.Atoi(post.Updated_User_ID)
	if post.Title != "" {
		data.Title = post.Title
	}

	fmt.Print(post.Status)
	data.Status = &post.Status

	if post.Description != "" {
		data.Description = post.Description
	}

	if post.Updated_User_ID != "" {
		data.Updated_User_ID = update_user_id
	}

	service.PostDaoInterface.Update(data)
}

// Delete implements PostServiceInterface.
func (service *PostService) Delete(postId int) {
	service.PostDaoInterface.Delete(postId)
}

func NewPostService(PostDaoInterface dao.PostDaoInterface) PostServiceInterface {
	return &PostService{
		PostDaoInterface: PostDaoInterface,
	}
}
