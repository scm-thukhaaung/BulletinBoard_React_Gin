package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	services "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/post"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/response"
)

type PostController struct {
	PostServiceInterface services.PostServiceInterface
}

func NewPostController(PostServiceInterface services.PostServiceInterface) *PostController{
	return &PostController{
		PostServiceInterface: PostServiceInterface,
	}
}

func (controller *PostController) Create(ctx *gin.Context) {
	createPostRequest := request.CreatePostRequest{}
	err := ctx.ShouldBindJSON(&createPostRequest)
	helper.ErrorPanic(err)

	controller.PostServiceInterface.Create(createPostRequest)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

func (controller *PostController) FindAll(ctx *gin.Context) {
	data := controller.PostServiceInterface.FindAll()
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	}
	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)
}

func (controller *PostController) FindOne(ctx *gin.Context) {
	postId := ctx.Param("postId")
	id, err := strconv.Atoi(postId)
	helper.ErrorPanic(err)

	data := controller.PostServiceInterface.FindOne(id)
	response := response.Response{
		Code: http.StatusOK,
		Status: "OK",
		Data: data,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

func (controller *PostController) Update(ctx *gin.Context) {
	updatePostRequest := request.UpdatePostRequest{}
	err := ctx.ShouldBindJSON(&updatePostRequest)
	helper.ErrorPanic(err)

	postId := ctx.Param("postId")
	id, err := strconv.Atoi(postId)
	helper.ErrorPanic(err)

	updatePostRequest.Id = id

	controller.PostServiceInterface.Update(updatePostRequest)
}

func (controller *PostController) Delete(ctx *gin.Context) {
	postId := ctx.Param("postId")

	id, err := strconv.Atoi(postId)
	helper.ErrorPanic(err)
	controller.PostServiceInterface.Delete(id)
}