package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	services "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/response"
)

type UserController struct {
	UserServiceInterface services.UserServiceInterface
}

func NewUserController(UserServiceInterface services.UserServiceInterface) *UserController {
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
