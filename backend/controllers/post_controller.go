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
// @Param PostRequest body request.PostRequest true "Post Request Body"
// @Success 200 {object} response.Response{}
// @Router /api/posts [post]
// @Security ApiKeyAuth
func (controller *PostController) Create(ctx *gin.Context) {
	postRequest := request.PostRequest{}
	err := ctx.ShouldBindJSON(&postRequest)
	helper.ErrorPanic(err, ctx)

	controller.PostServiceInterface.Create(postRequest, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

// Create csv posts
// @Summary Create new csv posts
// @Description Create new csv posts
// @Tags POST
// @Accept json
// @Produce json
// @Param CsvPostRequest body request.CsvPostRequest true "Post List Request Body"
// @Success 200 {object} response.Response{}
// @Router /api/posts/csv-posts [post]
// @Security ApiKeyAuth
func (controller *PostController) HandleCsvPosts(ctx *gin.Context) {
	csvPostRequest := request.CsvPostRequest{}
	err := ctx.BindJSON(&csvPostRequest)
	helper.ErrorPanic(err, ctx)

	retData := controller.PostServiceInterface.CreateCsvPosts(csvPostRequest, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   retData,
	}
	if len(retData) != 0 {
		response.Code = http.StatusBadRequest
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
// @Param PostRequest body request.PostRequest true "Post Request Body"
// @Param id  path string  true  "Update post by id"
// @Success 200 {object} response.Response{}
// @Router /api/posts/{id} [put]
// @Security ApiKeyAuth
func (controller *PostController) Update(ctx *gin.Context) {
	PostRequest := request.PostRequest{}
	err := ctx.ShouldBindJSON(&PostRequest)
	helper.ErrorPanic(err, ctx)

	postId := ctx.Param("postId")
	// id, err := strconv.Atoi(postId)
	// helper.ErrorPanic(err, ctx)

	// PostRequest.Id = id

	retData := controller.PostServiceInterface.Update(PostRequest, postId, ctx)

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
