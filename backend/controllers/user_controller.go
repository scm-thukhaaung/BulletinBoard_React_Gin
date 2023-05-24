package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	userServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/response"
)

type UserController struct {
	UserServiceInterface userServices.UserServiceInterface
}

func NewUserController(UserServiceInterface userServices.UserServiceInterface) *UserController {
	return &UserController{
		UserServiceInterface: UserServiceInterface,
	}
}

// Get user list
// @Summary 		Get user list
// @Description 	Returns user list
// @Tags 			USER
// @Produce 		plain
// @Success 		200 {object} object "OK"
// @Router 			/api/users [get]
// @Security 		ApiKeyAuth
func (controller *UserController) FindAll(ctx *gin.Context) {
	data := controller.UserServiceInterface.FindAll(ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	}

	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)
}

// Find a user by id
// @Summary 		Find a user by id
// @Description 	Returns Found user
// @Tags 			USER
// @Produce 		json
// @Param 			id  path string  true  "Find user by id"
// @Success 		200 {object} response.Response{}
// @Router 			/api/users/{id} [get]
// @Security 		ApiKeyAuth
func (controller *UserController) FindOne(ctx *gin.Context) {
	userId := ctx.Param("userId")
	// id, err := strconv.Atoi(userId)
	// helper.ErrorPanic(err, ctx)

	data := controller.UserServiceInterface.FindOne(userId, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

// Create a user
// @Summary 		Create a new user
// @Description 	Creates a new user
// @Tags 			USER
// @Accept 			json
// @Produce 		json
// @Param 			CreateUserRequest body request.CreateUserRequest true "User Request Body"
// @Success 		200 {object} response.Response{}
// @Router 			/api/users [post]
// @Security 		ApiKeyAuth
func (controller *UserController) Create(ctx *gin.Context) {
	createUserRequest := request.CreateUserRequest{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	helper.ErrorPanic(err, ctx)

	controller.UserServiceInterface.Create(createUserRequest, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

// Update a user
// @Summary 		Update a user
// @Description 	Update a user
// @Tags 			USER
// @Accept 			json
// @Produce 		json
// @Param 			CreateUserRequest body request.CreateUserRequest true "User Request Body"
// @Param 			id  path string  true  "Update user by id"
// @Success 		200 {object} response.Response{}
// @Router 			/api/users/{id} [put]
// @Security 		ApiKeyAuth
func (controller *UserController) Update(ctx *gin.Context) {
	updateUserRequest := request.UpdateUserRequest{}
	err := ctx.ShouldBindJSON(&updateUserRequest)
	helper.ErrorPanic(err, ctx)

	userId := ctx.Param("userId")
	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err, ctx)

	updateUserRequest.Id = uint(id)

	controller.UserServiceInterface.Update(updateUserRequest, userId, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

// Delete a user
// @Summary 		Delete a user
// @Description 	Returns nil
// @Tags USER
// @Produce 		plain
// @Param 			id  path string true  "Delete user by id"
// @Success 		200 {object} response.Response{}
// @Router 			/api/users/{id} [delete]
// @Security 		ApiKeyAuth
func (controller *UserController) Delete(ctx *gin.Context) {
	userId := ctx.Param("userId")

	// id, err := strconv.Atoi(userId)
	// helper.ErrorPanic(err, ctx)
	controller.UserServiceInterface.Delete(userId, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   nil,
	}

	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)
}
