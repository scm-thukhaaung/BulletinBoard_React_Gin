package loginServices

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type LoginServiceInterface interface {
	Authenticate(user request.LoginRequest, ctx *gin.Context) interface{}
}