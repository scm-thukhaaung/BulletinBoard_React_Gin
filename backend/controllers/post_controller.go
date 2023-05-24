package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	services "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/post"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/response"
)

type PostController struct {
	PostServiceInterface services.PostServiceInterface
}

func NewPostController(PostServiceInterface services.PostServiceInterface) *PostController {
	return &PostController{
		PostServiceInterface: PostServiceInterface,
	}
}

// Create a post
// @Summary Create a new post
// @Description Creates a new post
// @Tags POST
// @Accept json
// @Produce json
// @Param CreatePostRequest body request.CreatePostRequest true "Post Request Body"
// @Success 200 {object} response.Response{}
// @Router /api/posts [post]
// @Security ApiKeyAuth
func (controller *PostController) Create(ctx *gin.Context) {
	createPostRequest := request.CreatePostRequest{}
	err := ctx.ShouldBindJSON(&createPostRequest)
	helper.ErrorPanic(err, ctx)

	controller.PostServiceInterface.Create(createPostRequest, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

// Get post list
// @Summary Get post list
// @Description Returns post list
// @Tags POST
// @Produce plain
// @Success 200 {object} object "OK"
// @Router /api/posts [get]
// @Security ApiKeyAuth
func (controller *PostController) FindAll(ctx *gin.Context) {
	data := controller.PostServiceInterface.FindAll(ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	}
	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)
}

// Find a post by id
// @Summary Find a post by id
// @Description Returns Found post
// @Tags POST
// @Produce plain
// @Param id  path string  true  "Find post by id"
// @Success 200 {object} response.Response{}
// @Router /api/posts/{id} [get]
// @Security ApiKeyAuth
func (controller *PostController) FindOne(ctx *gin.Context) {
	postId := ctx.Param("postId")
	// id, err := strconv.Atoi(postId)
	// helper.ErrorPanic(err, ctx)

	data := controller.PostServiceInterface.FindOne(postId, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

// Update a post
// @Summary Update a post
// @Description Update a post
// @Tags POST
// @Accept json
// @Produce json
// @Param CreatePostRequest body request.CreatePostRequest true "Post Request Body"
// @Param id  path string  true  "Update post by id"
// @Success 200 {object} response.Response{}
// @Router /api/posts/{id} [put]
// @Security ApiKeyAuth
func (controller *PostController) Update(ctx *gin.Context) {
	updatePostRequest := request.UpdatePostRequest{}
	err := ctx.ShouldBindJSON(&updatePostRequest)
	helper.ErrorPanic(err, ctx)

	postId := ctx.Param("postId")
	// id, err := strconv.Atoi(postId)
	// helper.ErrorPanic(err, ctx)

	// updatePostRequest.Id = id

	retData := controller.PostServiceInterface.Update(updatePostRequest, postId, ctx)

	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   retData,
	}

	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)
}

// Delete a post
// @Summary Delete a post
// @Description Returns nil
// @Tags POST
// @Produce plain
// @Param id  path string  true  "Delete post by id"
// @Success 200 {object} response.Response{}
// @Router /api/posts/{id} [delete]
// @Security ApiKeyAuth
func (controller *PostController) Delete(ctx *gin.Context) {
	postId := ctx.Param("postId")

	// id, err := strconv.Atoi(postId)
	// helper.ErrorPanic(err, ctx)
	controller.PostServiceInterface.Delete(postId, ctx)

	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   nil,
	}

	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)
}
