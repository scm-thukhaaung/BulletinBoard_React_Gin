package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	loginServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/login"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/response"
)

type LoginController struct {
	LoginServiceInterface loginServices.LoginServiceInterface
}

// Login ...
// @Summary User Login
// @Description Authenticates user login
// @Tags LOGIN
// @Accept json
// @Produce json
// @Param LoginRequest body request.LoginRequest true "Login Request Body"
// @Success 200 {object} response.Response{}
// @Failure 400 {object} response.Response{}
// @Router /api/login [post]
func (controller *LoginController) Login(ctx *gin.Context) {
	LoginRequest := request.LoginRequest{}
	err := ctx.ShouldBindJSON(&LoginRequest)
	helper.ErrorPanic(err, ctx)

	data := controller.LoginServiceInterface.Authenticate(LoginRequest, ctx)
	if data != struct{}{} {
		response := response.Response{
			Code:   http.StatusOK,
			Status: "OK",
			Data:   data,
		}

		ctx.Header("Content-Type", "applicaton/json")
		ctx.JSON(http.StatusOK, response)
	} else {

		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid login data"})
		return
	}
}

func NewLoginController(LoginServiceInterface loginServices.LoginServiceInterface) *LoginController {
	return &LoginController{
		LoginServiceInterface: LoginServiceInterface,
	}
}
