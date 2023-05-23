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

// Find All of Users
// @Summary      Find All of Users
// @Description  Go to Service and then go to Dao and get data back to controller
// @Produce      appication/json
// @Success      200  {object} response.Response{}
// @Router       /findall [get]
func (controller *UserController) FindAll(ctx *gin.Context) {
	data := controller.UserServiceInterface.FindAll()
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	}

	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)
}

// Find Create Single User
// @Summary      Find Create Single User
// @Description  Go to Service and then go to Dao and get data back to controller
// @Produce      appication/json
// @Success      200  {object} response.Response{}
// @Router      /create [post]
func (controller *UserController) Create(ctx *gin.Context) {
	createUserRequest := request.CreateUserRequest{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	helper.ErrorPanic(err)

	controller.UserServiceInterface.Create(createUserRequest)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

func (controller *UserController) FindOne(ctx *gin.Context) {
	userId := ctx.Param("userId")
	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err)

	data := controller.UserServiceInterface.FindOne(id)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   data,
	}

	ctx.Header("Content-Type", "application/json")
	ctx.JSON(http.StatusOK, response)
}

func (controller *UserController) Update(ctx *gin.Context) {
	updateUserRequest := request.UpdateUserRequest{}
	err := ctx.ShouldBindJSON(&updateUserRequest)
	helper.ErrorPanic(err)

	userId := ctx.Param("userId")
	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err)

	updateUserRequest.Id = id

	controller.UserServiceInterface.Update(updateUserRequest)
}

func (controller *UserController) Delete(ctx *gin.Context) {
	userId := ctx.Param("userId")

	id, err := strconv.Atoi(userId)
	helper.ErrorPanic(err)
	controller.UserServiceInterface.Delete(id)
}