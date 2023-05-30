package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	constants "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/consts"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	resetPwdServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/pwd-reset"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/response"
)

type ResetPwdController struct {
	ResetPwdServiceInterface resetPwdServices.ResetPwdServiceInterface
}

// Send mail
// @Summary Send mail
// @Description Send mail
// @Tags FORGET PASSWORD
// @Accept json
// @Produce json
// @Param MailRequest body request.MailRequest true "Mail Request Body"
// @Success 200 {object} response.Response{}
// @Failure 400 {object} response.Response{}
// @Router /api/forget-password [post]
func (controller *ResetPwdController) RequestEmail(ctx *gin.Context) {
	mailRequest := request.MailRequest{}
	err := ctx.ShouldBindJSON(&mailRequest)
	helper.ErrorPanic(err, ctx)

	isMailSend := controller.ResetPwdServiceInterface.SendResetMail(mailRequest, ctx)
	if isMailSend {
		response := response.Response{
			Code:   http.StatusOK,
			Status: "OK",
			Data:   nil,
		}

		ctx.Header("Content-Type", "applicaton/json")
		ctx.JSON(http.StatusOK, response)
	} else {
		helper.ErrorPanic(constants.MailSendError, ctx)
	}
}

// Reset password
// @Summary Rest password
// @Description Rest Password
// @Tags FORGET PASSWORD
// @Accept json
// @Produce json
// @Param PasswordRequest body request.PasswordRequest  true "Password Request Body"
// @Success 200 {object} response.Response{}
// @Failure 400 {object} response.Response{}
// @Router /api/reset-password [post]
func (controller *ResetPwdController) HandleResetPwd(ctx *gin.Context) {
	passwordRequest := request.PasswordRequest{}
	err := ctx.ShouldBindJSON(&passwordRequest)
	helper.ErrorPanic(err, ctx)

	controller.ResetPwdServiceInterface.ResetPwd(passwordRequest.Password, ctx)
	response := response.Response{
		Code:   http.StatusOK,
		Status: "OK",
		Data:   nil,
	}

	ctx.Header("Content-Type", "applicaton/json")
	ctx.JSON(http.StatusOK, response)

}

func NewResetPwdController(ResetPwdServiceInterface resetPwdServices.ResetPwdServiceInterface) *ResetPwdController {
	return &ResetPwdController{
		ResetPwdServiceInterface: ResetPwdServiceInterface,
	}
}
